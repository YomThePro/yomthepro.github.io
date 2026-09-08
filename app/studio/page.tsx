import { getSiteContent } from "../_content/site";
import StudioEditor from "./studio-editor";

export const metadata = { title: "Studio | YOM." };

export default async function StudioPage() {
  return <StudioEditor initialContent={await getSiteContent()} />;
}
