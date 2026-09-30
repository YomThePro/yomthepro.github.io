"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ProgressGroup } from "../_content/site";

function clamp(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

export default function ProgressBars({ groups, summaryLabel }: { groups: ProgressGroup[]; summaryLabel: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Bars animate when they scroll into view. Without IntersectionObserver
    // (very old browsers) we simply show them already filled.
    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setStarted(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const overall = groups.length ? Math.round(groups.reduce((total, group) => total + clamp(group.value), 0) / groups.length) : 0;

  return <div className="progress-board" ref={ref}>
    <div className={`progress-overall${started ? " is-started" : ""}`}>
      <div className="progress-overall-head"><span>{summaryLabel}</span><b>{overall}%</b></div>
      <div className="bar-track"><div className={`bar-fill bar-fill-overall${started ? " is-started" : ""}`} style={{ "--bar-target": `${overall}%` } as CSSProperties} /></div>
    </div>
    <div className="progress-list">{groups.map((group, index) => {
      const value = clamp(group.value);
      return <article className="progress-row" key={group.id || index}>
        <div className="progress-head"><h2>{group.label}</h2><b>{value}%</b></div>
        <div className="bar-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${group.label}: ${value}%`}>
          <div className={`bar-fill${started ? " is-started" : ""}`} style={{ "--bar-target": `${value}%`, transitionDelay: `${index * 110}ms` } as CSSProperties} />
        </div>
        <p className="progress-goal">{group.goal}</p>
        <p className="progress-note">{group.note}</p>
      </article>;
    })}</div>
  </div>;
}
