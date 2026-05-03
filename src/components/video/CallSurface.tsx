import type { ReactNode } from "react";

type Props = {
  remote: ReactNode;
  selfTile: ReactNode;
  controls: ReactNode;
  topBar?: ReactNode;
};

export function CallSurface({ remote, selfTile, controls, topBar }: Props) {
  return (
    <div className="fixed inset-0 bg-ink text-paper">
      <div className="absolute inset-0">{remote}</div>

      {topBar && (
        <div
          className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
        >
          {topBar}
        </div>
      )}

      <div className="absolute right-4 top-20 z-10 sm:right-6 sm:top-24">
        {selfTile}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-2">
        {controls}
      </div>
    </div>
  );
}
