import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLocale } from '@/lib/use-locale';

export type ImageCropResult = {
  fit: 'cover' | 'contain';
  x: number;
  y: number;
};

export function ImageCropDialog({
  src,
  targetWidth,
  targetHeight,
  initialFit,
  initialPosition,
  onClose,
  onApply,
}: {
  src: string;
  targetWidth: number;
  targetHeight: number;
  initialFit: 'cover' | 'contain';
  initialPosition: { x: number; y: number };
  onClose: () => void;
  onApply: (result: ImageCropResult) => void;
}) {
  const t = useLocale();
  const [fit, setFit] = useState<'cover' | 'contain'>(initialFit);
  const [pos, setPos] = useState(initialPosition);
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const naturalW = naturalSize?.w ?? 0;
  const naturalH = naturalSize?.h ?? 0;
  const stageW = stageSize.w;
  const stageH = stageSize.h;
  const ready = naturalW > 0 && naturalH > 0 && stageW > 0 && stageH > 0;

  let displayedW = 0;
  let displayedH = 0;
  let displayedLeft = 0;
  let displayedTop = 0;
  if (ready) {
    const scale = Math.min(stageW / naturalW, stageH / naturalH);
    displayedW = naturalW * scale;
    displayedH = naturalH * scale;
    displayedLeft = (stageW - displayedW) / 2;
    displayedTop = (stageH - displayedH) / 2;
  }

  let frameW = 0;
  let frameH = 0;
  let frameLeft = displayedLeft;
  let frameTop = displayedTop;
  let slackX = 0;
  let slackY = 0;
  if (ready && targetWidth > 0 && targetHeight > 0) {
    const frameAspect = targetWidth / targetHeight;
    const imgAspect = displayedW / displayedH;
    if (frameAspect >= imgAspect) {
      frameW = displayedW;
      frameH = displayedW / frameAspect;
    } else {
      frameH = displayedH;
      frameW = displayedH * frameAspect;
    }
    slackX = displayedW - frameW;
    slackY = displayedH - frameH;
    frameLeft = displayedLeft + (pos.x / 100) * slackX;
    frameTop = displayedTop + (pos.y / 100) * slackY;
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (fit !== 'cover') return;
    if (slackX === 0 && slackY === 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { ox: pos.x, oy: pos.y, px: e.clientX, py: e.clientY };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.px;
    const dy = e.clientY - drag.py;
    const nextX = slackX === 0 ? 50 : clamp(drag.ox + (dx / slackX) * 100, 0, 100);
    const nextY = slackY === 0 ? 50 : clamp(drag.oy + (dy / slackY) * 100, 0, 100);
    setPos({ x: nextX, y: nextY });
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.inspector.cropDialogTitle}</DialogTitle>
          <DialogDescription>{t.inspector.cropDialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={fit}
            onValueChange={(v) => {
              if (v === 'cover' || v === 'contain') setFit(v);
            }}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="cover" className="text-xs">
              {t.inspector.cropFitCover}
            </ToggleGroupItem>
            <ToggleGroupItem value="contain" className="text-xs">
              {t.inspector.cropFitContain}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div
          ref={stageRef}
          className="relative h-[420px] w-full overflow-hidden rounded-md border bg-[repeating-conic-gradient(theme(colors.muted)_0_25%,transparent_0_50%)] bg-[length:12px_12px]"
        >
          <img
            src={src}
            alt=""
            className="pointer-events-none absolute inset-0 size-full object-contain"
            draggable={false}
            onLoad={(e) => {
              const im = e.currentTarget;
              setNaturalSize({ w: im.naturalWidth, h: im.naturalHeight });
            }}
          />
          {ready && fit === 'cover' && (
            <div
              className="absolute touch-none select-none"
              style={{
                left: frameLeft,
                top: frameTop,
                width: frameW,
                height: frameH,
                cursor: slackX === 0 && slackY === 0 ? 'default' : 'grab',
                outline: '2px solid #3b82f6',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t.common.cancel}
          </Button>
          <Button onClick={() => onApply({ fit, x: pos.x, y: pos.y })}>
            {t.inspector.cropApply}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}
