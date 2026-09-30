import Link from "next/link";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { getSiteContent } from "./_content/site";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <main className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <SiteHeader site={content.site} />

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {content.home.eyebrow}</p>
          <h1>{content.home.headlineStart} <em>{content.home.headlineEmphasis}</em> {content.home.headlineEnd}</h1>
          <p className="intro">{content.home.intro}</p>
          <div className="hero-actions"><Link className="button button-solid" href="/writing">Read the latest <b>↘</b></Link><Link className="button button-quiet" href="/about">A little about me <b>→</b></Link></div>
        </div>
        <div className="orbit" aria-hidden="true">
          <div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" /><div className="orbit-ring ring-c" />
          <div className="orbit-arm arm-a"><i className="orbit-dot dot-a" /></div>
          <div className="orbit-arm arm-b"><i className="orbit-dot dot-b" /></div>
          <div className="orbit-arm arm-c"><i className="orbit-dot dot-c" /></div>
          <div className="orbit-core"><span>Y</span></div><p className="orbit-label label-a">thinking<br />out loud</p><p className="orbit-label label-b">est. 2026</p>
        </div>
      </section>

      <section className="ticker" aria-label="Topics"><div className="ticker-track">{[...content.home.topics, ...content.home.topics, ...content.home.topics].map((tag, index) => <span key={index}>{tag} <b>✦</b></span>)}</div></section>

      <section className="writing wrap" id="writing">
        <div className="section-head"><div><p className="eyebrow"><span /> {content.home.writingLabel}</p><h2>{content.home.writingStart} <em>{content.home.writingEmphasis}</em></h2></div><Link className="text-link" href="/writing">{content.home.archiveLabel} <b>↗</b></Link></div>
        <div className="entry-list">{content.entries.map((entry) => (
          <article className="entry" key={entry.number}>
            <div className="entry-number">{entry.number}</div>
            <div className="entry-main"><div className="entry-meta"><span>{entry.date}</span><b>{entry.category}</b></div><h3>{entry.title}</h3><p>{entry.excerpt}</p></div>
            <Link className="entry-arrow" href="/writing" aria-label={"Read " + entry.title}>↗</Link>
          </article>
        ))}</div>
      </section>

      <section className="about wrap"><div className="about-card">
        <div className="about-aside"><p className="eyebrow"><span /> {content.about.eyebrow}</p><div className="portrait"><div className="portrait-sun" /><span>Y</span></div></div>
        <div className="about-copy"><h2>{content.about.headlineStart} <em>{content.about.headlineEmphasis}</em> {content.about.headlineEnd}</h2><p>{content.about.intro}</p><Link className="text-link" href="/contact">Say hello <b>↗</b></Link></div>
      </div></section>
      <SiteFooter site={content.site} />
    </main>
  );
}
