import { getSiteContent } from "../_content/site";
import { hasStudioAccess } from "./actions";
import StudioEditor from "./studio-editor";
import StudioLogin from "./studio-login";

export const metadata = { title: "Studio | YOM." };

export default async function StudioPage() {
  if (!(await hasStudioAccess())) return <StudioLogin />;
  return <StudioEditor initialContent={await getSiteContent()} />;
}
