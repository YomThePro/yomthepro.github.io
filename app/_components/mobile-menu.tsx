"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "./site-chrome";

const noopSubscribe = () => () => {};
const getClient = () => true;
const getServer = () => false;

/**
 * The desktop nav is hidden on narrow screens, so phones need their own way to
 * reach every page.
 *
 * The panel renders into <body> on purpose: the nav sits inside .wrap, which
 * creates its own stacking context, so a fixed panel rendered in place would
 * be painted underneath the hero content instead of over it.
 */
export default function MobileMenu({ items, name }: { items: NavLink[]; name: string }) {
  const [open, setOpen] = useState(false);
  // Portals need `document`, which only exists on the client.
  const mounted = useSyncExternalStore(noopSubscribe, getClient, getServer);

  // Close on Escape; hold scrolling while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return <div className="mobile-menu">
    <button
      type="button"
      className="menu-toggle"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      aria-controls="mobile-menu-panel"
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <span className={`menu-bars${open ? " is-open" : ""}`} aria-hidden="true"><i /><i /><i /></span>
    </button>
    {open && mounted && createPortal(
      <div className="menu-panel" id="mobile-menu-panel">
        <div className="menu-head">
          <span className="wordmark">{name}</span>
          <button type="button" className="menu-toggle" onClick={() => setOpen(false)} aria-label="Close menu">
            <span className="menu-bars is-open" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
        <p className="menu-label">Menu</p>
        <ul>{items.map((item) => <li key={item.href}>
          <Link href={item.href} onClick={() => setOpen(false)}>{item.label} <b>↗</b></Link>
        </li>)}</ul>
        <p className="menu-foot">{name}</p>
      </div>,
      document.body
    )}
  </div>;
}
