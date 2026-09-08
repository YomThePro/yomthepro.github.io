import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteContent } from "../_content/site";

export function SiteHeader({ site }: { site: SiteContent["site"] }) {
  return <nav className="nav wrap" aria-label="Main navigation"><Link className="wordmark" href="/" aria-label={`${site.name} home`}>{site.name}</Link><div className="nav-links"><Link href="/writing">{site.navWriting}</Link><Link href="/about">{site.navAbout}</Link><Link href="/contact">{site.navContact}</Link></div><Link className="signal" href="/writing"><i /> {site.signal}</Link></nav>;
}

export function SiteFooter({ site }: { site: SiteContent["site"] }) {
  return <footer className="footer wrap"><Link className="wordmark" href="/">{site.name}</Link><p>{site.footerTagline}</p><p>{site.footerCopyright}</p></footer>;
}

export function PageShell({ children, site }: { children: ReactNode; site: SiteContent["site"] }) {
  return <main className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><SiteHeader site={site} />{children}<SiteFooter site={site} /></main>;
}
