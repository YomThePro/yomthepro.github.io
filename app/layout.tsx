import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "./_content/site";
import FirstVisitLoader from "./_components/first-visit-loader";
import CursorStyle from "./_components/cursor-style";
import MusicPlayer from "./_components/music-player";

// Runs before the browser paints, so a first-time visitor never sees the page
// flash up and then get covered by the intro. Returning visitors get the flag
// set immediately and never see the intro at all.
const introGate = `(function(){try{
var k="yom-intro-seen";
var seen=localStorage.getItem(k)==="1";
var reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
document.documentElement.setAttribute("data-intro",(seen||reduced)?"off":"on");
if(seen){localStorage.setItem(k,"1");}
}catch(e){document.documentElement.setAttribute("data-intro","off");}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent();
  return { title: site.homeTitle, description: site.homeDescription };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { site, extras } = await getSiteContent();
  const volume = Math.min(100, Math.max(0, Number(extras.musicVolume) || 0)) / 100;
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CursorStyle style={extras.cursor} color={extras.cursorColor} />
        <FirstVisitLoader wordmark={site.name} />
        {children}
        {extras.musicTracks.length ? <MusicPlayer tracks={extras.musicTracks} label={extras.musicLabel} volume={volume} /> : null}
      </body>
    </html>
  );
}
