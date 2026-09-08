"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { unlockStudio } from "./actions";

export default function StudioLogin() {
  const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [pending, startTransition] = useTransition(); const router = useRouter();
  return <main className="studio-login"><div><Link className="wordmark" href="/">YOM<span>.</span></Link><p>PRIVATE CONTENT STUDIO</p><h1>Welcome back.</h1><form onSubmit={(event) => { event.preventDefault(); startTransition(async () => { if (await unlockStudio(password)) router.refresh(); else setError("That password didn’t work."); }); }}><input aria-label="Studio password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Studio password" /><button disabled={pending}>{pending ? "Checking…" : "Unlock Studio"}</button></form>{error && <small>{error}</small>}<small className="studio-login-note">Set <code>STUDIO_PASSWORD</code> in your host’s environment settings to protect Studio online.</small></div></main>;
}
