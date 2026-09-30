"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "yom-intro-seen";
const HOLD_MS = 1750;
const FADE_MS = 600;

// A blocking script in the document head sets this before first paint, so
// reading it in an effect gives the correct answer on the very first frame
// instead of a frame late (which made the intro flash in over the page).
function introEnabled() {
  if (typeof document === "undefined") return false;
  if (document.documentElement.getAttribute("data-intro") === "off") return false;
  if (window.location.pathname.startsWith("/studio")) return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    // Storage blocked: play the intro rather than skipping it.
    return true;
  }
}

export default function FirstVisitLoader({ wordmark }: { wordmark: string }) {
  const [phase, setPhase] = useState<"idle" | "showing" | "leaving">("idle");

  useEffect(() => {
    if (!introEnabled()) return;

    document.body.style.overflow = "hidden";
    // Visibility is already handled by the head script + CSS, so mounting on
    // the next tick is imperceptible and keeps the state update off the
    // synchronous effect path.
    const start = window.setTimeout(() => setPhase("showing"), 0);
    const leaving = window.setTimeout(() => setPhase("leaving"), HOLD_MS);
    const done = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Private browsing can block storage; the intro plays again next visit.
      }
      setPhase("idle");
    }, HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(leaving);
      window.clearTimeout(done);
    };
  }, []);

  // Release the scroll lock whenever the intro is off screen, including on unmount.
  useEffect(() => {
    if (phase !== "idle") return;
    document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "idle") return null;

  return <div
    className={`loader${phase === "leaving" ? " loader-leaving" : ""}`}
    role="status"
    aria-live="polite"
    aria-label={`Loading ${wordmark}`}
  >
    <div className="loader-inner">
      <div className="loader-orbit" aria-hidden="true">
        <div className="loader-ring loader-ring-a" />
        <div className="loader-ring loader-ring-b" />
        <div className="loader-ring loader-ring-c" />
        <div className="loader-core"><span>Y</span></div>
      </div>
      <p className="loader-wordmark">{wordmark}</p>
      <div className="loader-bar" aria-hidden="true"><div className="loader-bar-fill" /></div>
      <p className="loader-label">Tuning the signal</p>
    </div>
  </div>;
}
