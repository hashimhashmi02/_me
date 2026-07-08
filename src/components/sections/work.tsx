import { Reveal } from "@/components/ui/reveal";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal kind="mask">
        <p className="eyebrow text-violet">02 · work</p>
      </Reveal>
      <Reveal kind="mask" delay={0.1}>
        <h2 className="display-section mt-4">Placeholder — project gallery lands here.</h2>
      </Reveal>
    </section>
  );
}
