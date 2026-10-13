import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GAME } from "../config.js";

gsap.registerPlugin(ScrollTrigger);

const FAQ = [
  {
    q: "Windows shows a SmartScreen warning. Is it safe?",
    a: "The installer is not code-signed yet, so Windows warns about it. Click More info, then Run anyway. Download only from this page.",
  },
  {
    q: "Do I need internet to play?",
    a: "Only for online servers. Offline mode and games over your own WiFi work without internet.",
  },
  {
    q: "How do I play with a friend on the same WiFi?",
    a: "One person picks Create Server. The other picks Find Server List and chooses the server by its name.",
  },
];

export default function Download() {
  const d = GAME.downloads.windows;

  useEffect(() => {
    gsap.to(".platform", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: "#download", start: "top 75%" },
    });
    gsap.from("#download h2", {
      opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: "#download", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section" id="download">
      <p className="section-label"><span />Get the game</p>
      <h2>Download {GAME.name}</h2>
      <p className="section-lede">Version {GAME.version} · Free to play</p>

      <ul className="platforms">
        <li className="platform" style={{ transform: "translateY(30px)" }}>
          <div>
            <strong>{d.label}</strong>
            <p>{d.detail}{d.size ? ` · ${d.size}` : ""}</p>
          </div>
          <a className="btn" href={d.url} download>
            ⬇ Download
          </a>
        </li>
      </ul>

      <div className="faq">
        <h3>Questions</h3>
        {FAQ.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
