import { useState, type ReactNode } from "react";
import { AttuneInfinityButton } from "./AttuneInfinityButton";
import { AttuneDialog, type AttuneDialogTarget } from "./AttuneDialog";
import { AttunePaywallSheet } from "./AttunePaywallSheet";
import { useAttuneState, type AttuneTarget as AttuneStateTarget } from "@/hooks/use-attune-state";

/**
 * AttuneTarget — wraps a module card or a photo, anchoring an
 * <AttuneInfinityButton/> in the appropriate corner. Tap → AttuneDialog
 * for paid users; AttunePaywallSheet for free users. Once any attune
 * has been sent for the profile, all wrappers render dimmed.
 *
 * The wrapper does NOT modify the wrapped child's layout — it only
 * sets `position: relative` on its own container.
 */

export type AttuneTargetProps = {
  targetType: "module" | "photo";
  /** module key (from ATTUNE_MODULES) or photo index as a string. */
  targetKey: string;
  targetPreview?: {
    title?: string;
    previewText?: string;
    thumbnailUrl?: string;
  };
  profileId: string;
  profileName: string;
  isPaidUser: boolean;
  onAttuneSent: (target: AttuneStateTarget, comment: string | undefined) => void;
  children: ReactNode;
};

export function AttuneTarget({
  targetType,
  targetKey,
  targetPreview,
  profileId,
  profileName,
  isPaidUser,
  onAttuneSent,
  children,
}: AttuneTargetProps) {
  const { attune } = useAttuneState(profileId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const dimmed = attune !== null;

  const handleTap = () => {
    if (dimmed) return;
    if (isPaidUser) setDialogOpen(true);
    else setPaywallOpen(true);
  };

  const dialogTarget: AttuneDialogTarget =
    targetType === "photo"
      ? {
          type: "photo",
          title: targetPreview?.title ?? "this photo",
          thumbnailUrl: targetPreview?.thumbnailUrl,
        }
      : {
          type: "module",
          title: targetPreview?.title ?? targetKey,
          previewText: targetPreview?.previewText,
        };

  const stateTarget: AttuneStateTarget =
    targetType === "photo"
      ? { type: "photo", index: Number.parseInt(targetKey, 10) || 0 }
      : { type: "module", key: targetKey };

  const ariaLabel = dimmed
    ? "Already attuned to this profile"
    : targetType === "module"
      ? `Attune to ${profileName}'s ${targetPreview?.title ?? "this section"}`
      : `Attune to this photo of ${profileName}`;

  // DR-050: ∞ button anchored top-right on every surface (modules + photos).
  const buttonPosition = "absolute right-4 top-4 z-10";

  return (
    <div className="relative">
      {children}
      <div className={buttonPosition}>
        <AttuneInfinityButton
          dimmed={dimmed}
          variant={targetType}
          onTap={handleTap}
          ariaLabel={ariaLabel}
        />
      </div>

      <AttuneDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSend={(comment) => {
          setDialogOpen(false);
          onAttuneSent(stateTarget, comment);
        }}
        target={dialogTarget}
        profileName={profileName}
      />

      <AttunePaywallSheet
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onUpgrade={() => setPaywallOpen(false)}
      />
    </div>
  );
}