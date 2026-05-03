type Props = {
  label: string;
  helper?: string;
  pushValue: boolean;
  pushOnChange: (v: boolean) => void;
  emailValue?: boolean;
  emailOnChange?: (v: boolean) => void;
  pushOnly?: boolean;
};

function Switch({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? "bg-plum-700" : "bg-line"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-paper transition-transform ${
          value ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function PreferenceToggle({ label, helper, pushValue, pushOnChange, emailValue, emailOnChange, pushOnly }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="font-display text-[14.5px] text-ink">{label}</p>
        {helper && <p className="mt-0.5 font-body text-[12px] text-slate">{helper}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="text-label-mono">PUSH</span>
          <Switch value={pushValue} onChange={pushOnChange} label={`Push for ${label}`} />
        </div>
        {!pushOnly && emailValue !== undefined && emailOnChange && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-label-mono">EMAIL</span>
            <Switch value={emailValue} onChange={emailOnChange} label={`Email for ${label}`} />
          </div>
        )}
      </div>
    </li>
  );
}
