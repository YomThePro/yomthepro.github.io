import { getSiteContent } from "../_content/site";
import StudioEditor from "./studio-editor";
import StudioGate from "./studio-gate";

export const metadata = { title: "Studio | YOM." };

export default async function StudioPage() {
  const content = await getSiteContent();
  return <StudioGate wordmark={content.site.name}><StudioEditor initialContent={content} /></StudioGate>;
}
