import { Reveal } from "@/components/ui/reveal";

export default function BuildLog() {
  return (
    <section id="log" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal kind="mask">
        <p className="eyebrow text-lime">04 · build log</p>
      </Reveal>
      <Reveal kind="mask" delay={0.1}>
        <h2 className="display-section mt-4">Placeholder — shipping feed lands here.</h2>
      </Reveal>
    </section>
  );
}
