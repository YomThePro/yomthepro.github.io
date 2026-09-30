"use client";

import { useEffect } from "react";

/**
 * Draws the pointer as a small themed dot using an inline SVG data URI.
 * Only runs on devices with a fine pointer (mouse/trackpad) — touch devices
 * keep the system behaviour, and the "none" setting leaves everything alone.
 */
export default function CursorStyle({ style, color }: { style: string; color: string }) {
  useEffect(() => {
    if (style !== "dot") return;
    // Respect the OS-level "reduce motion" and coarse-pointer settings.
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const safeColor = /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : "#7654ff";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">`
      + `<circle cx="13" cy="13" r="5.5" fill="${safeColor}" stroke="#f5f3ee" stroke-width="2"/></svg>`;
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 13 13, auto`;

    const root = document.documentElement;
    root.style.setProperty("--cursor-dot", url);
    root.setAttribute("data-cursor", "dot");

    return () => {
      root.removeAttribute("data-cursor");
      root.style.removeProperty("--cursor-dot");
    };
  }, [style, color]);

  return null;
}
