import type { Metadata } from "next";
import { PageShell } from "../_components/site-chrome";
import { getSiteContent } from "../_content/site";
import CopyEmail from "../_components/copy-email";

export const metadata: Metadata = { title: "Contact | YOM.", description: "Get in touch with Yom." };

export default async function ContactPage() {
  const { contact, site } = await getSiteContent();
  return <PageShell site={site}><section className="page-intro wrap contact-page"><p className="eyebrow"><span /> {contact.eyebrow}</p><h1>{contact.headlineStart} <em>{contact.headlineEmphasis}</em> {contact.headlineEnd}</h1><p>{contact.intro}</p><CopyEmail email={contact.email} /></section></PageShell>;
}
