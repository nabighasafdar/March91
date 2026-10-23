import { refresh } from "@/lib/data";
import { Hero } from "@/components/Hero";
import {
  Categories, Footer, Latest, MostRead, Newsletter, Spotlight, Shorts, Ticker, WatchListen,
} from "@/components/Sections";

export const dynamic = "force-dynamic";

export default function Home() {
  refresh();
  return (
    <div className="pg">
      <div className="wrap">
        <Hero />
        <Ticker />
        <Latest />
        <WatchListen />
        <Shorts />
        <Categories />
        <Spotlight />
        <MostRead />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
