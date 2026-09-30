"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Music is opt-in and off by default: browsers block autoplay with sound, and
// unsolicited audio is hostile. The visitor turns it on, and the choice sticks.
const KEY = "yom-music";

function trackName(src: string) {
  const file = src.split("/").pop() ?? src;
  return file.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ");
}

export default function MusicPlayer({ tracks, label, volume }: { tracks: string[]; label: string; volume: number }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  // Records the visitor's intent, not the element's momentary state. Switching
  // tracks fires a spurious pause, so intent cannot be read back off the element
  // -- the next track would never start.
  const wantsPlay = useRef(false);
  // Stops onError for a track we have already stepped past from firing twice.
  const skipGuard = useRef(false);

  const count = tracks.length;
  const current = count ? tracks[Math.min(index, count - 1)] : "";

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  // Start the current track, ignoring a rejection caused by a lost race.
  const start = useCallback(async () => {
    const el = audio.current;
    if (!el) return;
    try {
      await el.play();
      if (wantsPlay.current) setPlaying(true);
    } catch { /* needs a gesture, or the track swapped out from under us */ }
  }, []);

  // The only place playback may begin without a fresh click.
  useEffect(() => {
    const el = audio.current;
    if (!el || !count) return;
    let wanted = "0";
    try { wanted = window.localStorage.getItem(KEY) ?? "0"; } catch { wanted = "0"; }
    if (wanted !== "1") return;
    wantsPlay.current = true;
    const id = window.setTimeout(() => { start(); }, 0);
    return () => window.clearTimeout(id);
  }, [count, start]);

  // Whenever the track changes, carry the listener across to the new file.
  useEffect(() => {
    const el = audio.current;
    if (!el || !count) return;
    if (!wantsPlay.current) { el.pause(); return; }
    // Give the new src a frame to be picked up before playing it.
    const id = window.requestAnimationFrame(() => { start(); });
    return () => window.cancelAnimationFrame(id);
  }, [current, count, start]);

  const step = useCallback((delta: number) => {
    if (!count) return;
    setIndex((i) => (i + delta + count) % count);
  }, [count]);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (wantsPlay.current) {
      wantsPlay.current = false;
      el.pause();
      setPlaying(false);
      try { window.localStorage.setItem(KEY, "0"); } catch { /* ignore */ }
      return;
    }
    setFailed(false);
    wantsPlay.current = true;
    start();
    try { window.localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
  };

  if (!count) return null;

  const name = trackName(current);

  return <div className="music-player">
    <audio
      ref={audio}
      src={encodeURI(current)}
      preload="metadata"
      loop={false}
      onEnded={() => { skipGuard.current = false; step(1); }}
      onError={() => {
        // A missing or unplayable file should not strand the playlist.
        if (skipGuard.current) return;
        if (count > 1) { skipGuard.current = true; step(1); }
        setFailed(true);
      }}
      onCanPlay={() => { setReady(true); skipGuard.current = false; }}
    />
    <div className="music-bar">
      <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
        <span className={`music-bars${playing ? " is-playing" : ""}`} aria-hidden="true"><i /><i /><i /></span>
        {failed && count === 1 ? "No audio" : playing ? "Pause" : "Play"}
      </button>
      <span className="music-meta">
        <span className="music-name" title={name}>{name}</span>
        {count > 1 && <span className="music-count">{index + 1}/{count}</span>}
      </span>
      {count > 1 && <>
        <button type="button" className="music-skip" onClick={() => step(-1)} aria-label="Previous track">‹</button>
        <button type="button" className="music-skip" onClick={() => step(1)} aria-label="Next track">›</button>
      </>}
    </div>
    <span className="sr-only" role="status">{ready ? `Now playing ${name}` : ""}</span>
  </div>;
}
