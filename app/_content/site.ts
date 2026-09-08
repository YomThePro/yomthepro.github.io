import { readFile } from "node:fs/promises";
import path from "node:path";

export type Entry = { number: string; date: string; title: string; excerpt: string; category: string };
export type SiteContent = {
  site: { name: string; navWriting: string; navAbout: string; navContact: string; signal: string; footerTagline: string; footerCopyright: string; homeTitle: string; homeDescription: string };
  home: { eyebrow: string; headlineStart: string; headlineEmphasis: string; headlineEnd: string; intro: string; topics: string[]; writingLabel: string; writingStart: string; writingEmphasis: string; archiveLabel: string };
  writing: { eyebrow: string; headlineStart: string; headlineEmphasis: string; headlineEnd: string; intro: string };
  about: { eyebrow: string; headlineStart: string; headlineEmphasis: string; headlineEnd: string; intro: string; cardTitle: string; body: string; contactLabel: string };
  contact: { eyebrow: string; email: string; headlineStart: string; headlineEmphasis: string; headlineEnd: string; intro: string };
  entries: Entry[];
};

export const contentPath = path.join(process.cwd(), "app", "_content", "site.json");

export async function getSiteContent(): Promise<SiteContent> {
  return JSON.parse(await readFile(contentPath, "utf8")) as SiteContent;
}
