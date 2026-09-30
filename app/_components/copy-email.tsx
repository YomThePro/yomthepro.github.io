"use client";

import { useEffect, useRef, useState } from "react";

async function copyText(value: string) {
  // The async clipboard API needs a secure context, which GitHub Pages has,
  // but plain http://localhost does not. Fall back to a hidden textarea.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // fall through to the legacy path
    }
  }
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const onCopy = async () => {
    const ok = await copyText(email);
    setState(ok ? "copied" : "failed");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  const label = state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C" : "Copy";

  return <div className="email-row">
    <a className="button button-solid contact-button" href={`mailto:${email}`}>{email} <b>↗</b></a>
    <button type="button" className={`copy-button${state === "copied" ? " is-copied" : ""}`} onClick={onCopy} aria-live="polite">
      {label}
    </button>
    <span className="sr-only" role="status">{state === "copied" ? `Copied ${email} to clipboard` : state === "failed" ? "Copy failed. Select the address and copy manually." : ""}</span>
  </div>;
}
