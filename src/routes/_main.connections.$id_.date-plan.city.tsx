import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, MapPin } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";
import { CITIES, findCity, type CitySample } from "@/data/cities_sample";

export const Route = createFileRoute("/_main/connections/$id_/date-plan/city")({
  head: () => ({ meta: [{ title: "Where are you both? — COUPL" }] }),
  component: CityPickerScreen,
});

function CityPickerScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan/city" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const otherName = c?.name ?? "they";

  const [yourCity, setYourCity] = useState<CitySample | null>(CITIES[0]);
  const [theirCity, setTheirCity] = useState<CitySample | null>(CITIES[1]);
  const [meetCity, setMeetCity] = useState<CitySample | null>(null);
  const [query, setQuery] = useState("");

  const matches = findCity(query);
  const differ = yourCity && theirCity && yourCity.id !== theirCity.id;
  const ready = differ ? meetCity != null : yourCity != null;

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center py-2">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Plan · city
          </p>
          <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
            Where are you both?
          </h1>
        </div>

        {differ && (
          <p className="mt-4 font-body text-[13.5px] italic leading-relaxed text-slate">
            You're in {yourCity?.name}, {otherName}'s in {theirCity?.name}.
            Pick where you'll meet.
          </p>
        )}

        <label className="mt-6 block">
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
            Search
          </span>
          <div className="mt-2 flex items-center gap-2 rounded-[12px] border border-line bg-paper px-3 py-2.5">
            <MapPin className="h-4 w-4 text-plum-500" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a city"
              className="flex-1 bg-transparent font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
            />
          </div>
        </label>

        <ul className="mt-3 space-y-1.5">
          {matches.slice(0, 6).map((city) => {
            const active = (differ ? meetCity : yourCity)?.id === city.id;
            return (
              <li key={city.id}>
                <button
                  type="button"
                  onClick={() =>
                    differ ? setMeetCity(city) : setYourCity(city)
                  }
                  className={`w-full rounded-[12px] border px-3 py-2.5 text-left font-body text-[14px] transition-colors ${
                    active
                      ? "border-plum-700 bg-lavender-100 text-ink"
                      : "border-line bg-paper text-ink hover:bg-lavender-50"
                  }`}
                >
                  <span className="font-medium">{city.name}</span>
                  <span className="ml-2 text-[12px] text-stone">{city.region}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-10">
          <button
            type="button"
            disabled={!ready}
            onClick={() =>
              navigate({
                to: "/connections/$id/date-plan/quiz",
                params: { id },
              })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-40 hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
