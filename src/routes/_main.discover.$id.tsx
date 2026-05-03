import { useCallback, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { ProfileDetailHeader } from "@/components/discover/profile/ProfileDetailHeader";
import { ProfilePhoto } from "@/components/discover/profile/ProfilePhoto";
import { ActionRow } from "@/components/discover/profile/ActionRow";
import { AttuneDateCard } from "@/components/discover/AttuneDateCard";
import { RelationalSnapshotCard } from "@/components/discover/profile/cards/RelationalSnapshotCard";
import { AboutMeCard } from "@/components/discover/profile/cards/AboutMeCard";
import { CompatibilityOverviewCard } from "@/components/discover/profile/cards/CompatibilityOverviewCard";
import { AIInsightCard } from "@/components/discover/profile/cards/AIInsightCard";
import { HowIShowUpCard } from "@/components/discover/profile/cards/HowIShowUpCard";
import { RelationalInsightsCard } from "@/components/discover/profile/cards/RelationalInsightsCard";
import { DifferencesCard } from "@/components/discover/profile/cards/DifferencesCard";
import { WhatLightsThemUpCard } from "@/components/discover/profile/cards/WhatLightsThemUpCard";
import { ConversationStartersCard } from "@/components/discover/profile/cards/ConversationStartersCard";
import { LifestyleDetailsCard } from "@/components/discover/profile/cards/LifestyleDetailsCard";
import { AttuneTarget } from "@/components/discover/attune/AttuneTarget";
import { AttuneDialog } from "@/components/discover/attune/AttuneDialog";
import { AttuneSentConfirmation } from "@/components/discover/attune/AttuneSentConfirmation";
import { useAttuneState, type AttuneTarget as AttuneStateTarget } from "@/hooks/use-attune-state";
import { useFeedExclusions } from "@/hooks/use-feed-exclusions";
import { useInView } from "@/hooks/use-in-view";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";
import { discoverSessionState } from "@/lib/discover_session_state";

// V0 — replace with subscription check in Phase 4. Flip to false to QA paywall.
const IS_PAID_USER_V0 = true;

export const Route = createFileRoute("/_main/discover/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Profile · ${params.id} — COUPL` },
      {
        name: "description",
        content: "A closer look at how your styles align.",
      },
    ],
  }),
  component: ProfileDetailScreen,
  notFoundComponent: ProfileNotFound,
});

function ProfileNotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-[20px] font-semibold text-plum-700">Profile not found</h1>
      <p className="font-body text-[14px] text-slate">
        This recommendation isn't available right now.
      </p>
      <Link
        to="/discover"
        className="rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper"
      >
        Back to Discover
      </Link>
    </div>
  );
}

type InfoSheet = { label: string; body: string } | null;

function ProfileDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const profile = getProfileDetail(id);
  const [info, setInfo] = useState<InfoSheet>(null);
  const { sendAttune } = useAttuneState(id);
  const { excludeProfile } = useFeedExclusions();
  const [primaryDialogOpen, setPrimaryDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<
    { visible: boolean; targetType: "profile" | "module" | "photo" }
  >({ visible: false, targetType: "profile" });

  // Prompt 5.1 (fix v2): observe Photo 1 against a viewport whose top is
  // shrunk by the sticky header height (~56px). While ANY part of Photo 1
  // overlaps the band [56px, viewportBottom], it's "in view" and the
  // header stays empty. The instant Photo 1's bottom edge passes above
  // the 56px line, isIntersecting flips false and the name+age reveal
  // fires. (The previous "-100%" bottom margin collapsed the root to a
  // negative-area band so the observer never reported intersection
  // state changes — bug.)
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo1InView = useInView(photo1Ref, {
    rootMargin: "-56px 0px 0px 0px",
  });
  const headerReveal = !photo1InView;

  const goBack = () => {
    if (window.history.length > 1) router.history.back();
    else navigate({ to: "/discover" });
  };

  const handleNotToday = () => {
    discoverSessionState.markDismissed(id);
    excludeProfile(id);
    navigate({ to: "/discover" });
  };

  const handleInvite = () => {
    setPrimaryDialogOpen(true);
  };

  const completeAttune = useCallback(
    (target: AttuneStateTarget, comment: string | undefined) => {
      sendAttune(target, comment);
      discoverSessionState.markInvited(id);
      setConfirmation({ visible: true, targetType: target.type });
    },
    [id, sendAttune],
  );

  const handleConfirmationDismissed = useCallback(() => {
    const wasProfileAttune = confirmation.targetType === "profile";
    setConfirmation((c) => ({ ...c, visible: false }));
    excludeProfile(id);
    // Phase 1: simulate mutual reciprocation on profile-level Attune so
    // the Mutual Attunement Toast is reachable. Phase 4 will check
    // `connections.state === 'mutual'` server-side before routing here.
    if (wasProfileAttune) {
      navigate({ to: "/discover/$id/attuned", params: { id } });
    } else {
      navigate({ to: "/discover" });
    }
  }, [confirmation.targetType, excludeProfile, id, navigate]);

  const openInfo = (label: string, body: string) => setInfo({ label, body });

  if (!profile) return <ProfileNotFound />;

  const wrapModule = (
    key: string,
    title: string,
    previewText: string | undefined,
    node: React.ReactNode,
  ) => (
    <AttuneTarget
      targetType="module"
      targetKey={key}
      targetPreview={{ title, previewText }}
      profileId={id}
      profileName={profile.name}
      isPaidUser={IS_PAID_USER_V0}
      onAttuneSent={completeAttune}
    >
      {node}
    </AttuneTarget>
  );

  const wrapPhoto = (index: number, node: React.ReactNode) => (
    <AttuneTarget
      targetType="photo"
      targetKey={String(index)}
      targetPreview={{ thumbnailUrl: profile.photos[index]?.src }}
      profileId={id}
      profileName={profile.name}
      isPaidUser={IS_PAID_USER_V0}
      onAttuneSent={completeAttune}
    >
      {node}
    </AttuneTarget>
  );

  return (
    <div
      className="flex flex-col px-4"
      style={{
        minHeight: "100dvh",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background:
          "linear-gradient(180deg, #FCEEF0 0%, #F6E7F2 35%, #EFE2F4 100%)",
      }}
    >
      <ProfileDetailHeader
        onBack={goBack}
        revealName={headerReveal}
        name={profile.name}
        age={profile.age}
        profileId={profile.id}
      />

      <div className="flex flex-col gap-4 pt-4">
        {/* DR-046: Photo 1 is NOT a Module Attune surface. Rendered directly
         * (no AttuneTarget wrapper) with the four-corner hero overlay
         * replacing the deleted IntroductionCard. */}
        <div ref={photo1Ref}>
          <ProfilePhoto
            hue={profile.photos[0].hue}
            alt={profile.photos[0].alt}
            src={profile.photos[0].src}
            hero={{
              name: profile.name,
              age: profile.age,
              region: profile.region,
              verified: profile.verified,
              attunedValue: profile.compatibility,
              trustScore: profile.trustScore,
            }}
          />
        </div>

        {/* DR-057: About me is not an attune-able surface — no AttuneTarget wrapper. */}
        <AboutMeCard
          bio={profile.bio}
          seeking={profile.seeking}
          intent={profile.intent.primary}
          pacing={profile.pacing}
        />
        {wrapModule(
          "relational_snapshot",
          "Relational Snapshot",
          `Empathy ${profile.empathy}% · Communication ${profile.communication}%`,
          <RelationalSnapshotCard
            empathy={profile.empathy}
            communication={profile.communication}
            onInfo={openInfo}
          />,
        )}
        {wrapPhoto(
          1,
          <ProfilePhoto
            hue={profile.photos[1].hue}
            alt={profile.photos[1].alt}
            src={profile.photos[1].src}
            caption={profile.photos[1].caption}
            variant="inset"
          />,
        )}
        {wrapModule(
          "compatibility_overview",
          "Compatibility Overview",
          `How aligned you are with ${profile.name}.`,
          <div>
            <CompatibilityOverviewCard
              values={profile.compatibilityOverview}
              profileName={profile.name}
            />
            <Link
              to="/discover/$id/compatibility"
              params={{ id }}
              className="mt-2 inline-flex font-body text-[12.5px] text-plum-700 hover:underline"
            >
              See all five lenses →
            </Link>
          </div>,
        )}
        {wrapModule(
          "ai_insight",
          "Reading the signal",
          profile.aiInsight,
          <AIInsightCard insight={profile.aiInsight} />,
        )}
        {wrapModule(
          "how_i_show_up",
          "How they show up in relationships",
          profile.howIShowUp,
          <HowIShowUpCard text={profile.howIShowUp} />,
        )}
        {wrapPhoto(
          2,
          <ProfilePhoto
            hue={profile.photos[2].hue}
            alt={profile.photos[2].alt}
            src={profile.photos[2].src}
            caption={profile.photos[2].caption}
            variant="inset"
          />,
        )}
        {wrapModule(
          "relational_insights",
          "Relational Insights",
          `Connection Language: ${profile.connectionLanguage.primary}`,
          <RelationalInsightsCard
            connectionLanguage={profile.connectionLanguage}
            attachmentStyle={profile.attachmentStyle}
          />,
        )}
        {wrapModule(
          "differences_card",
          "Worth being curious about",
          "Where your styles are most different.",
          <DifferencesCard
            values={profile.compatibilityOverview}
            profileName={profile.name}
          />,
        )}
        {wrapPhoto(
          3,
          <ProfilePhoto
            hue={profile.photos[3].hue}
            alt={profile.photos[3].alt}
            src={profile.photos[3].src}
            caption={profile.photos[3].caption}
            variant="inset"
          />,
        )}
        <AttuneDateCard
          dateIdeas={profile.dateIdeas}
          dateSummary={profile.dateSummary}
          datePreferences={profile.datePreferences}
          profileName={profile.name}
          onAttune={(proposal) => {
            const bits: string[] = [];
            if (proposal.timeWindow) {
              bits.push(proposal.timeWindow.replace(/_/g, " "));
            }
            if (proposal.dateType) {
              bits.push(`for ${proposal.dateType.replace(/_/g, " ")}`);
            }
            const summary = bits.join(" ");
            const composed =
              proposal.comment && summary
                ? `${summary} — ${proposal.comment}`
                : (proposal.comment ?? summary);
            completeAttune(
              { type: "module", key: "attune_date" },
              composed || undefined,
            );
          }}
        />
        {wrapModule(
          "what_lights_them_up",
          "What lights them up",
          profile.interests.map((i) => i.label).join(", "),
          <WhatLightsThemUpCard interests={profile.interests} />,
        )}
        {wrapModule(
          "conversation_starters",
          "Conversation Starters",
          profile.conversationStarters[0],
          <ConversationStartersCard starters={profile.conversationStarters} />,
        )}
        {profile.photos[5]
          ? wrapPhoto(
              5,
              <ProfilePhoto
                hue={profile.photos[5].hue}
                alt={profile.photos[5].alt}
                src={profile.photos[5].src}
                caption={profile.photos[5].caption}
                variant="inset"
              />,
            )
          : null}
        {wrapModule(
          "lifestyle_details",
          "Lifestyle & Details",
          profile.lifestyle.work,
          <LifestyleDetailsCard data={profile.lifestyle} />,
        )}
        {profile.photos[4]
          ? wrapPhoto(
              4,
              <ProfilePhoto
                hue={profile.photos[4].hue}
                alt={profile.photos[4].alt}
                src={profile.photos[4].src}
                caption={profile.photos[4].caption}
                variant="inset"
              />,
            )
          : null}
      </div>

      {/*
       * Sticky action bar (DR-054) — always visible from first paint.
       * Sits above the bottom nav (BottomNav is fixed with ~62px height
       * + safe-area). No scroll-triggered reveal.
       */}
      <div
        className="fixed left-1/2 z-30 w-full max-w-[640px] -translate-x-1/2 opacity-100"
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 62px)",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
          background: "var(--paper, #fff)",
        }}
      >
        <div className="px-4">
          <ActionRow
            variant="compact"
            onNotToday={handleNotToday}
            onInvite={handleInvite}
          />
        </div>
      </div>

      <Sheet open={info !== null} onOpenChange={(o) => !o && setInfo(null)}>
        <SheetContent
          side="bottom"
          className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-[18px] font-semibold text-ink">
              {info?.label ?? ""}
            </SheetTitle>
            <SheetDescription className="font-body text-[13px] text-slate">
              {info?.body ?? ""}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* Primary Attune button → profile-target dialog. Free for all tiers. */}
      <AttuneDialog
        open={primaryDialogOpen}
        onClose={() => setPrimaryDialogOpen(false)}
        onSend={(comment) => {
          setPrimaryDialogOpen(false);
          completeAttune({ type: "profile" }, comment);
        }}
        target={{ type: "profile", title: profile.name }}
        profileName={profile.name}
      />

      <AttuneSentConfirmation
        visible={confirmation.visible}
        profileName={profile.name}
        targetType={confirmation.targetType}
        onDismissed={handleConfirmationDismissed}
      />
    </div>
  );
}
