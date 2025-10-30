import { useRef, useEffect, useState, type ReactNode } from "react";

type AutoScrollListProps<T> = {
  items: T[];
  height?: number;        // altura visível (px)
  speed?: number;         // pixels por segundo
  pauseOnHover?: boolean; // pausa ao passar o mouse
  className?: string;
  renderItem: (item: T, idx: number) => ReactNode;
};

export function AutoScrollList<T>({
  items,
  height = 540,
  speed = 30,
  pauseOnHover = true,
  className = "",
  renderItem,
}: AutoScrollListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Duplicamos os itens para permitir o loop infinito
  const loopItems = items.length > 0 ? [...items, ...items] : [];

  useEffect(() => {
    if (!containerRef.current) return;
    if (items.length <= 4) return; // com poucos itens, não rolar automaticamente

    const el = containerRef.current;
    let rafId = 0;
    let lastTs = 0;

    const half = el.scrollHeight / 2; // metade da altura total (por termos itens duplicados)

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = (ts - lastTs) / 1000; // segundos
      lastTs = ts;

      if (!paused) {
        el.scrollTop += speed * delta;

        // Quando passar da metade, volta para o início (diferença)
        if (el.scrollTop >= half) {
          el.scrollTop = el.scrollTop - half;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // inicia no topo sempre que itens mudarem
    el.scrollTop = 0;
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [items, paused, speed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="flex flex-col gap-4">
        {loopItems.map((item, idx) => (
          <div key={idx}>{renderItem(item, idx)}</div>
        ))}
      </div>
    </div>
  );
}

