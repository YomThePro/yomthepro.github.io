"use client";

import { useState } from "react";

// NOTE: This site is a static export, so this password ships inside the public
// JavaScript bundle. It keeps casual visitors out of the editor; it is not real
// security. Anyone who reads the source can recover the password. See
// SITE_MANAGEMENT_GUIDE.md for why a static host cannot do better.
const STUDIO_PASSWORD = "yomyom@2013";

export default function StudioGate({ wordmark, children }: { wordmark: string; children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  if (unlocked) return <>{children}</>;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value === STUDIO_PASSWORD) {
      setUnlocked(true);
      setError("");
      return;
    }
    setError("That password doesn’t match. Try again.");
    setValue("");
  };

  return <main className="studio-login">
    <div>
      <span className="wordmark">{wordmark}</span>
      <p>PRIVATE SPACE</p>
      <h1>Studio is <em>locked.</em></h1>
      <form onSubmit={submit}>
        <input
          type="password"
          value={value}
          onChange={(event) => { setValue(event.target.value); setError(""); }}
          placeholder="Enter the studio password"
          aria-label="Studio password"
          autoFocus
        />
        <button type="submit">Unlock Studio</button>
      </form>
      {error && <small>{error}</small>}
      <p className="studio-login-note">Content edits here are published by committing the downloaded file to GitHub. This lock only hides the editor from casual visitors — it cannot protect anything on a static host.</p>
    </div>
  </main>;
}
