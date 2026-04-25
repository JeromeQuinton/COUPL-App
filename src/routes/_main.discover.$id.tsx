import { useState } from "react";
import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { ProfileDetailHeader } from "@/components/discover/profile/ProfileDetailHeader";
import { ProfilePhoto } from "@/components/discover/profile/ProfilePhoto";
import { ActionRow } from "@/components/discover/profile/ActionRow";
import { IntentCard } from "@/components/discover/profile/cards/IntentCard";
import { RelationalSnapshotCard } from "@/components/discover/profile/cards/RelationalSnapshotCard";
import { AboutMeCard } from "@/components/discover/profile/cards/AboutMeCard";
import { CompatibilityOverviewCard } from "@/components/discover/profile/cards/CompatibilityOverviewCard";
import { AIInsightCard } from "@/components/discover/profile/cards/AIInsightCard";
import { HowIShowUpCard } from "@/components/discover/profile/cards/HowIShowUpCard";
import { RelationalInsightsCard } from "@/components/discover/profile/cards/RelationalInsightsCard";
import { BigFiveSnapshotCard } from "@/components/discover/profile/cards/BigFiveSnapshotCard";
import { WhatLightsThemUpCard } from "@/components/discover/profile/cards/WhatLightsThemUpCard";
import { LifestyleDetailsCard } from "@/components/discover/profile/cards/LifestyleDetailsCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";
import { discoverSessionState } from "@/lib/discover_session_state";

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

  const goBack = () => {
    if (window.history.length > 1) router.history.back();
    else navigate({ to: "/discover" });
  };

  const handleNotToday = () => {
    discoverSessionState.markDismissed(id);
    navigate({ to: "/discover" });
  };

  const handleInvite = () => {
    discoverSessionState.markInvited(id);
    navigate({ to: "/discover" });
  };

  const openInfo = (label: string, body: string) => setInfo({ label, body });

  if (!profile) return <ProfileNotFound />;

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
        name={profile.name}
        age={profile.age}
        region={profile.region}
        verified={profile.verified}
        onBack={goBack}
      />

      <div className="flex flex-col gap-4 pt-4">
        <IntentCard
          primary={profile.intent.primary}
          relationshipStyle={profile.intent.relationshipStyle}
          attunedValue={profile.compatibility}
          onInfo={() =>
            openInfo(
              "Attuned",
              "How aligned your styles feel today across values, pacing, and psychology.",
            )
          }
        />

        <ProfilePhoto
          hue={profile.photos[0].hue}
          alt={profile.photos[0].alt}
          src={profile.photos[0].src}
          trustScore={profile.trustScore}
        />

        <ActionRow onNotToday={handleNotToday} onInvite={handleInvite} />

        <ProfilePhoto hue={profile.photos[1].hue} alt={profile.photos[1].alt} src={profile.photos[1].src} />
        <RelationalSnapshotCard
          empathy={profile.empathy}
          communication={profile.communication}
          onInfo={openInfo}
        />
        <AboutMeCard bio={profile.bio} seeking={profile.seeking} />
        <CompatibilityOverviewCard values={profile.compatibilityOverview} />
        <AIInsightCard insight={profile.aiInsight} />
        <ProfilePhoto hue={profile.photos[2].hue} alt={profile.photos[2].alt} src={profile.photos[2].src} />
        <HowIShowUpCard text={profile.howIShowUp} />
        <RelationalInsightsCard
          connectionLanguage={profile.connectionLanguage}
          attachmentStyle={profile.attachmentStyle}
        />
        <ProfilePhoto hue={profile.photos[3].hue} alt={profile.photos[3].alt} src={profile.photos[3].src} />
        <BigFiveSnapshotCard values={profile.bigFive} />
        <WhatLightsThemUpCard
          interests={profile.interests}
          starters={profile.conversationStarters}
        />
        <LifestyleDetailsCard data={profile.lifestyle} />
        {profile.photos[4] ? (
          <ProfilePhoto
            hue={profile.photos[4].hue}
            alt={profile.photos[4].alt}
            src={profile.photos[4].src}
          />
        ) : null}
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
    </div>
  );
}
