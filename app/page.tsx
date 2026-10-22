import { Hero } from "@/components/Hero";
import {
  Categories, Footer, Latest, MostRead, Newsletter, Opinion, Shorts, Ticker, WatchListen,
} from "@/components/Sections";

export default function Home() {
  return (
    <div className="pg">
      <div className="wrap">
        <Hero />
        <Ticker />
        <Latest />
        <WatchListen />
        <Shorts />
        <Categories />
        <Opinion />
        <MostRead />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
