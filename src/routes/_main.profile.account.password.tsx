import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/account/password")({
  head: () => ({ meta: [{ title: "Change password — COUPL" }] }),
  component: ChangePassword,
});

// Phase 4: replace with auth metadata lookup.
const isMagicLinkUser = false;

function ChangePassword() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [done, setDone] = useState(false);

  const newValid = next.length >= 12;
  const confirmValid = confirm.length > 0 && confirm === next;
  const currentValid = isMagicLinkUser ? true : current.length > 0;
  const canSubmit = newValid && confirmValid && currentValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setDone(true);
  };

  if (done) {
    return (
      <YouBackdrop>
        <StatusBar
          leading={
            <Link
              to="/profile/account"
              aria-label="Back to Account"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <ScreenHeader
            eyebrow="Account · password"
            title={isMagicLinkUser ? "Password set." : "Password updated."}
          />
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            You can use it next time you sign in.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/profile/account" })}
            className="mt-7 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 self-start"
          >
            Done
          </button>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/account"
            aria-label="Back to Account"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <ScreenHeader
          eyebrow="Account · password"
          title={isMagicLinkUser ? "Set a password." : "Change your password."}
        />
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Use at least 12 characters. The rest is up to you.
        </p>
      </header>

      {isMagicLinkUser && (
        <div className="px-5 pb-3">
          <div className="rounded-[14px] bg-lavender-50/60 border border-plum-300/40 p-4">
            <p className="font-body text-[13.5px] leading-relaxed text-ink">
              You signed in with a magic link. Set a password if you want one
              — it's optional.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="px-5 flex flex-col gap-4 pb-12">
        {!isMagicLinkUser && (
          <PasswordField
            label="Current password"
            value={current}
            onChange={setCurrent}
            visible={showCurrent}
            onToggle={() => setShowCurrent((v) => !v)}
          />
        )}
        <PasswordField
          label="New password"
          value={next}
          onChange={setNext}
          visible={showNext}
          onToggle={() => setShowNext((v) => !v)}
          help={
            next.length === 0
              ? null
              : newValid
              ? null
              : "Use at least 12 characters."
          }
        />
        <PasswordField
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          visible={showNext}
          onToggle={() => setShowNext((v) => !v)}
          help={
            confirm.length === 0 || confirmValid ? null : "Passwords don't match."
          }
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 disabled:bg-plum-300"
        >
          {isMagicLinkUser ? "Set password" : "Update password"}
        </button>
      </form>
    </YouBackdrop>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  onToggle: () => void;
  help?: string | null;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-label-mono">{label}</span>
      <div className="flex items-center gap-2 rounded-[12px] border border-line bg-paper pr-2.5 focus-within:border-plum-500">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-l-[12px] bg-transparent px-3.5 py-2.5 font-body text-[14.5px] text-ink outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="grid h-8 w-8 place-items-center rounded-full text-stone hover:bg-lavender-50"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {help && <span className="font-body text-[12px] text-caution">{help}</span>}
    </label>
  );
}
