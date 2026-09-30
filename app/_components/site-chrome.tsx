import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteContent } from "../_content/site";
import MobileMenu from "./mobile-menu";

export type NavLink = { href: string; label: string };

export function navLinks(site: SiteContent["site"]): NavLink[] {
  return [
    { href: "/", label: site.navHome },
    { href: "/writing", label: site.navWriting },
    { href: "/pictures", label: site.navPictures },
    { href: "/progress", label: site.navProgress },
    { href: "/about", label: site.navAbout },
    { href: "/contact", label: site.navContact },
  ];
}

export function SiteHeader({ site }: { site: SiteContent["site"] }) {
  return <nav className="nav wrap" aria-label="Main navigation">
    <Link className="wordmark" href="/" aria-label={`${site.name} home`}>{site.name}</Link>
    <div className="nav-links">{navLinks(site).map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
    <Link className="signal nav-signal" href="/writing"><i /> {site.signal}</Link>
    <MobileMenu items={navLinks(site)} name={site.name} />
  </nav>;
}

export function SiteFooter({ site }: { site: SiteContent["site"] }) {
  return <footer className="footer wrap"><Link className="wordmark" href="/">{site.name}</Link><p>{site.footerTagline}</p><p>{site.footerCopyright}</p></footer>;
}

export function PageShell({ children, site }: { children: ReactNode; site: SiteContent["site"] }) {
  return <main className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><SiteHeader site={site} />{children}<SiteFooter site={site} /></main>;
}
