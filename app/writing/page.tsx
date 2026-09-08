import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "../_content/site";
import { PageShell } from "../_components/site-chrome";

export const metadata: Metadata = { title: "Writing | YOM.", description: "Notes, ideas, and moments from Yom." };

export default async function WritingPage() {
  const { entries, writing, site } = await getSiteContent();
  return <PageShell site={site}><section className="page-intro wrap"><p className="eyebrow"><span /> {writing.eyebrow}</p><h1>{writing.headlineStart} <em>{writing.headlineEmphasis}</em> {writing.headlineEnd}</h1><p>{writing.intro}</p></section><section className="writing wrap page-writing"><div className="entry-list">{entries.map((entry) => <article className="entry" key={entry.number}><div className="entry-number">{entry.number}</div><div className="entry-main"><div className="entry-meta"><span>{entry.date}</span><b>{entry.category}</b></div><h2>{entry.title}</h2><p>{entry.excerpt}</p></div><Link className="entry-arrow" href="/contact" aria-label={`Ask about ${entry.title}`}>↗</Link></article>)}</div></section></PageShell>;
}
