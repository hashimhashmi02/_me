import SmoothScroll from "@/components/providers/smooth-scroll";
import Cursor from "@/components/ui/cursor";
import Nav from "@/components/sections/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Work from "@/components/sections/work";
import Stack from "@/components/sections/stack";
import BuildLog from "@/components/sections/build-log";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Stack />
        <BuildLog />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
