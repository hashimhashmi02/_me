import { SystemCanvas } from "@/components/three/system-canvas";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SystemCanvas />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
