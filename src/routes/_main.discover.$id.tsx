import { useCallback, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { ProfileDetailHeader } from "@/components/discover/profile/ProfileDetailHeader";
import { ProfilePhoto } from "@/components/discover/profile/ProfilePhoto";
import { ActionRow } from "@/components/discover/profile/ActionRow";
import { AttuneDateCard } from "@/components/discover/AttuneDateCard";
import { IntentCard } from "@/components/discover/profile/cards/IntentCard";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";
import { discoverSessionState } from "@/lib/discover_session_state";
import { useInView } from "@/hooks/use-in-view";

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
  const inlineActionRef = useRef<HTMLDivElement>(null);
  const inlineInView = useInView(inlineActionRef, { rootMargin: "0px 0px -8px 0px" });
  const { sendAttune } = useAttuneState(id);
  const { excludeProfile } = useFeedExclusions();
  const [primaryDialogOpen, setPrimaryDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<
    { visible: boolean; targetType: "profile" | "module" | "photo" }
  >({ visible: false, targetType: "profile" });

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
    setConfirmation((c) => ({ ...c, visible: false }));
    excludeProfile(id);
    navigate({ to: "/discover" });
  }, [excludeProfile, id, navigate]);

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
      />

      <div className="flex flex-col gap-4 pt-4">
        {wrapModule(
          "introduction_card",
          "Introduction",
          `${profile.name}, ${profile.age} · ${profile.region}`,
          <IntentCard
            name={profile.name}
            age={profile.age}
            region={profile.region}
            verified={profile.verified}
            primary={profile.intent.primary}
            relationshipStyle={profile.intent.relationshipStyle}
            pacing={profile.pacing}
            attunedValue={profile.compatibility}
          />,
        )}

        {wrapPhoto(
          0,
          <ProfilePhoto
            hue={profile.photos[0].hue}
            alt={profile.photos[0].alt}
            src={profile.photos[0].src}
            caption={profile.photos[0].caption}
            trustScore={profile.trustScore}
          />,
        )}

        <div ref={inlineActionRef}>
          <ActionRow onNotToday={handleNotToday} onInvite={handleInvite} />
        </div>

        <AttuneDateCard dateIdeas={profile.dateIdeas} />

        {wrapPhoto(
          1,
          <ProfilePhoto
            hue={profile.photos[1].hue}
            alt={profile.photos[1].alt}
            src={profile.photos[1].src}
            caption={profile.photos[1].caption}
          />,
        )}
        {wrapModule(
          "about_me",
          "About Me",
          profile.bio,
          <AboutMeCard bio={profile.bio} seeking={profile.seeking} />,
        )}
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
        {wrapModule(
          "compatibility_overview",
          "Compatibility Overview",
          `How aligned you are with ${profile.name}.`,
          <CompatibilityOverviewCard
            values={profile.compatibilityOverview}
            profileName={profile.name}
          />,
        )}
        {wrapModule(
          "ai_insight",
          "AI Insight",
          profile.aiInsight,
          <AIInsightCard insight={profile.aiInsight} />,
        )}
        {wrapPhoto(
          2,
          <ProfilePhoto
            hue={profile.photos[2].hue}
            alt={profile.photos[2].alt}
            src={profile.photos[2].src}
            caption={profile.photos[2].caption}
          />,
        )}
        {wrapModule(
          "how_i_show_up",
          "How they show up in relationships",
          profile.howIShowUp,
          <HowIShowUpCard text={profile.howIShowUp} />,
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
        {wrapPhoto(
          3,
          <ProfilePhoto
            hue={profile.photos[3].hue}
            alt={profile.photos[3].alt}
            src={profile.photos[3].src}
            caption={profile.photos[3].caption}
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
              />,
            )
          : null}
      </div>

      {/*
       * Sticky action bar — appears once the inline action row leaves
       * the viewport. Sits above the bottom nav (BottomNav is fixed
       * with ~62px height + safe-area). Fade respects reduced motion
       * via the .motion-fade utility in styles.css.
       */}
      <div
        aria-hidden={inlineInView}
        className={`motion-fade fixed inset-x-0 z-30 ${
          inlineInView ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 62px)",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
          background: "var(--paper, #fff)",
        }}
      >
        <div className="mx-auto max-w-[640px] px-4">
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
