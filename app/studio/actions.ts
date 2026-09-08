"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { contentPath, type SiteContent } from "../_content/site";

const sessionName = "yom-studio-session";

function sessionValue(password: string) { return createHmac("sha256", password).update("yom-studio").digest("hex"); }
function isLocalHost(host: string) { return host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]"); }

export async function hasStudioAccess() {
  const host = (await headers()).get("host") ?? "";
  const password = process.env.STUDIO_PASSWORD;
  if (!password) return isLocalHost(host);
  const saved = (await cookies()).get(sessionName)?.value;
  const expected = sessionValue(password);
  return Boolean(saved && saved.length === expected.length && timingSafeEqual(Buffer.from(saved), Buffer.from(expected)));
}

export async function unlockStudio(password: string) {
  const configuredPassword = process.env.STUDIO_PASSWORD;
  if (!configuredPassword || password !== configuredPassword) return false;
  (await cookies()).set(sessionName, sessionValue(configuredPassword), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" });
  return true;
}

function clean(value: unknown, limit = 600) { return typeof value === "string" ? value.trim().slice(0, limit) : ""; }

function validateContent(value: SiteContent): SiteContent {
  return {
    site: { name: clean(value.site?.name, 30), navWriting: clean(value.site?.navWriting, 30), navAbout: clean(value.site?.navAbout, 30), navContact: clean(value.site?.navContact, 30), signal: clean(value.site?.signal, 40), footerTagline: clean(value.site?.footerTagline, 100), footerCopyright: clean(value.site?.footerCopyright, 30), homeTitle: clean(value.site?.homeTitle, 80), homeDescription: clean(value.site?.homeDescription, 180) },
    home: { eyebrow: clean(value.home?.eyebrow, 80), headlineStart: clean(value.home?.headlineStart, 120), headlineEmphasis: clean(value.home?.headlineEmphasis, 120), headlineEnd: clean(value.home?.headlineEnd, 180), intro: clean(value.home?.intro), topics: Array.isArray(value.home?.topics) ? value.home.topics.slice(0, 6).map((topic) => clean(topic, 50)).filter(Boolean) : [], writingLabel: clean(value.home?.writingLabel, 80), writingStart: clean(value.home?.writingStart, 100), writingEmphasis: clean(value.home?.writingEmphasis, 100), archiveLabel: clean(value.home?.archiveLabel, 80) },
    writing: { eyebrow: clean(value.writing?.eyebrow, 80), headlineStart: clean(value.writing?.headlineStart, 120), headlineEmphasis: clean(value.writing?.headlineEmphasis, 120), headlineEnd: clean(value.writing?.headlineEnd, 180), intro: clean(value.writing?.intro) },
    about: { eyebrow: clean(value.about?.eyebrow, 80), headlineStart: clean(value.about?.headlineStart, 120), headlineEmphasis: clean(value.about?.headlineEmphasis, 120), headlineEnd: clean(value.about?.headlineEnd, 180), intro: clean(value.about?.intro), cardTitle: clean(value.about?.cardTitle, 180), body: clean(value.about?.body), contactLabel: clean(value.about?.contactLabel, 50) },
    contact: { eyebrow: clean(value.contact?.eyebrow, 80), email: clean(value.contact?.email, 160), headlineStart: clean(value.contact?.headlineStart, 120), headlineEmphasis: clean(value.contact?.headlineEmphasis, 120), headlineEnd: clean(value.contact?.headlineEnd, 180), intro: clean(value.contact?.intro) },
    entries: Array.isArray(value.entries) ? value.entries.slice(0, 30).map((entry, index) => ({ number: String(index + 1).padStart(2, "0"), date: clean(entry.date, 60), title: clean(entry.title, 180), excerpt: clean(entry.excerpt), category: clean(entry.category, 50) })).filter((entry) => entry.title) : [],
  };
}

export async function saveContent(value: SiteContent) {
  if (!(await hasStudioAccess())) throw new Error("You are not allowed to edit this site.");
  const content = validateContent(value);
  await writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  ["/", "/writing", "/about", "/contact"].forEach((page) => revalidatePath(page));
}
