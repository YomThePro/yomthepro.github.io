import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../_components/site-chrome";
import { getSiteContent } from "../_content/site";

export const metadata: Metadata = { title: "Pictures | YOM.", description: "Photographs and sketches collected by Yom." };

export default async function PicturesPage() {
  const { pictures, site } = await getSiteContent();
  // A tone typed in Studio could be anything; fall back so the frame still reads.
  const tone = (value: string) => (["lime", "purple", "ink"].includes(value) ? value : "lime");
  return <PageShell site={site}><section className="page-intro wrap"><p className="eyebrow"><span /> {pictures.eyebrow}</p><h1>{pictures.headlineStart} <em>{pictures.headlineEmphasis}</em> {pictures.headlineEnd}</h1><p>{pictures.intro}</p></section>
    <section className="gallery wrap page-gallery">{pictures.items.map((picture, index) => <figure className="frame" key={picture.id || index}>
      <div className={`frame-image tone-${tone(picture.tone)}`}>
        {/* Plain <img> on purpose: this site is a static export, so there is no
            image optimizer to defer to, and paths come from user-entered content. */}
        {picture.image ? <img src={picture.image} alt={picture.title} loading="lazy" />
          : <div className="frame-placeholder"><span className="frame-mark">✦</span><p>Slot {String(index + 1).padStart(2, "0")}</p><small>Add an image path in Studio to fill this frame.</small></div>}
      </div>
      <figcaption className="frame-caption"><h2>{picture.title}</h2><p>{picture.caption}</p></figcaption>
      <div className="context-box"><p className="context-label">CONTEXT</p><p className="context-body">{picture.context}</p><div className="context-meta"><span>{picture.place}</span><b>{picture.date}</b></div></div>
    </figure>)}</section>
    <section className="gallery-foot wrap"><p>More frames are on their way.</p><Link className="text-link" href="/progress">See what I&rsquo;m working on <b>↗</b></Link></section>
  </PageShell>;
}
