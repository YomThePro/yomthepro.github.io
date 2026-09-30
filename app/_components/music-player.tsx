"use client";

import { useEffect, useRef, useState } from "react";

// Music is opt-in and off by default: browsers block autoplay with sound, and
// unsolicited audio is hostile. The visitor turns it on, and the choice sticks.
const KEY = "yom-music";

export default function MusicPlayer({ src, label, volume }: { src: string; label: string; volume: number }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Keep the element volume in step with the Studio setting.
  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  // Restore the visitor's earlier choice once the element exists.
  useEffect(() => {
    if (!src) return;
    let wanted = "0";
    try { wanted = window.localStorage.getItem(KEY) ?? "0"; } catch { wanted = "0"; }
    if (wanted !== "1" || !audio.current) return;
    const attempt = audio.current.play();
    if (attempt) attempt.then(() => setPlaying(true)).catch(() => { /* needs a gesture */ });
  }, [src]);

  if (!src) return null;

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      try { window.localStorage.setItem(KEY, "0"); } catch { /* ignore */ }
      return;
    }
    try {
      await el.play();
      setPlaying(true);
      setFailed(false);
      try { window.localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    } catch {
      setFailed(true);
    }
  };

  return <div className="music-player">
    <audio ref={audio} src={src} loop preload="none" onError={() => setFailed(true)} />
    <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
      <span className={`music-bars${playing ? " is-playing" : ""}`} aria-hidden="true"><i /><i /><i /></span>
      {failed ? "No audio" : playing ? "Pause" : "Music"}
    </button>
  </div>;
}
