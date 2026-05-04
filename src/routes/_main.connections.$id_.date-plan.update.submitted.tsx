import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute(
  "/_main/connections/$id_/date-plan/update/submitted",
)({
  head: () => ({
    meta: [{ title: "Update sent — COUPL" }],
  }),
  component: PlanUpdateSubmittedScreen,
});

function PlanUpdateSubmittedScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/date-plan/update/submitted",
  });
  const c = getConnection(id);
  const name = c?.name ?? "they";

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col items-start px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 4rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 text-plum-700">
          <Check className="h-6 w-6" />
        </div>

        <div className="mt-6">
          <PolarisHeader
            eyebrow="Plan · update sent"
            title="Update sent."
            eyebrowTone="plum-700"
          />
        </div>

        <p className="mt-5 font-body text-[14.5px] italic leading-relaxed text-slate">
          {name} will see your update. They can confirm or counter.
        </p>

        <div className="mt-auto w-full pt-12">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            className="block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to plan
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
