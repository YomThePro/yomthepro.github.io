import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../_components/site-chrome";
import { getSiteContent } from "../_content/site";
import ProgressBars from "./progress-bars";

export const metadata: Metadata = { title: "Progress | YOM.", description: "Goals and progress Yom is working towards." };

export default async function ProgressPage() {
  const { progress, site } = await getSiteContent();
  return <PageShell site={site}><section className="page-intro wrap"><p className="eyebrow"><span /> {progress.eyebrow}</p><h1>{progress.headlineStart} <em>{progress.headlineEmphasis}</em> {progress.headlineEnd}</h1><p>{progress.intro}</p></section>
    <section className="progress wrap page-progress"><ProgressBars groups={progress.groups} summaryLabel={progress.summaryLabel} /></section>
    <section className="gallery-foot wrap"><p>Numbers move. Check back later.</p><Link className="text-link" href="/pictures">Look at some pictures <b>↗</b></Link></section>
  </PageShell>;
}
