import { Sparkles } from "lucide-react";

type Props = {
  name: string;
  age: number;
  city: string;
  prompt: string;
  answer: string;
  imageHue: string;
};

export function SwipeCard({ name, age, city, prompt, answer, imageHue }: Props) {
  return (
    <article className="relative overflow-hidden rounded-[24px] bg-paper shadow-elev-2">
      {/* Photo placeholder — Phase 1 has no real images yet */}
      <div
        className="aspect-[4/5] w-full"
        style={{
          background: `linear-gradient(160deg, ${imageHue}, var(--lavender-100))`,
        }}
        aria-hidden
      />

      <div className="space-y-4 p-5">
        <header className="flex items-baseline justify-between">
          <div>
            <h2 className="text-h1 text-ink">
              {name}
              <span className="ml-2 text-body-lg font-normal text-slate">{age}</span>
            </h2>
            <p className="mt-0.5 text-body-sm text-stone">{city}</p>
          </div>
        </header>

        <section className="rounded-2xl bg-lavender-50 p-4">
          <p className="flex items-center gap-2 text-body-sm uppercase tracking-[0.12em] text-plum-500">
            <Sparkles aria-hidden width={14} height={14} strokeWidth={1.5} />
            Prompt
          </p>
          <p className="mt-2 text-h2 text-ink">{prompt}</p>
          <p className="mt-3 text-body-md text-slate">{answer}</p>
        </section>
      </div>
    </article>
  );
}