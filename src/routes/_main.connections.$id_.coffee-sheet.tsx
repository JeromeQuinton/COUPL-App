import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Coffee, Footprints, Sandwich, Wine } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/coffee-sheet")({
  head: () => ({ meta: [{ title: "A low-key plan — COUPL" }] }),
  component: CoffeeSheetScreen,
});

const TILES: { id: string; label: string; note: string; Icon: typeof Coffee }[] = [
  { id: "coffee", label: "Coffee", note: "Forty minutes, two questions in.", Icon: Coffee },
  { id: "walk", label: "A walk", note: "Side-by-side, no eye-contact pressure.", Icon: Footprints },
  { id: "lunch", label: "Lunch", note: "Bright, brief, no waiting for a check.", Icon: Sandwich },
  { id: "drinks", label: "Drinks (off-peak)", note: "Earlier on a quiet night.", Icon: Wine },
];

function CoffeeSheetScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/coffee-sheet" });

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id/plan-quiz"
          params={{ id: id }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">A low-key plan</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Plan · low-key</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          A coffee, then.
        </h1>

        <article className="mt-5 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            A short, low-pressure first meet often does more than a longer
            evening. There's an exit if it doesn't quite click; there's room to
            extend if it does. Polaris isn't prescribing — just noticing what's
            often worked for others.
          </p>
        </article>

        <section className="mt-6">
          <p className="text-label-mono">Quick picks</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {TILES.map(({ id, label, note, Icon }) => (
              <li key={id}>
                <article className="flex h-full flex-col gap-2 rounded-[14px] border border-line bg-paper px-3 py-3.5">
                  <Icon size={18} strokeWidth={1.75} className="text-plum-500" />
                  <p className="font-display text-[13.5px] font-medium text-ink">{label}</p>
                  <p className="font-body text-[11.5px] text-stone">{note}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <Link
          to="/connections/$id/date-plan/details"
          params={{ id: id }}
          className="mt-7 block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Use this as a starting point
        </Link>
      </div>
    </div>
  );
}
