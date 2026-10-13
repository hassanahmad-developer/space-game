import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GAME } from "../config.js";

gsap.registerPlugin(ScrollTrigger);

export default function Screenshots() {
  const [failed, setFailed] = useState([]);
  const shots = GAME.screenshots;

  useEffect(() => {
    gsap.to(".shots img", {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: "#screenshots", start: "top 75%" },
    });
  }, []);

  if (failed.length >= shots.length) return null;

  return (
    <section className="section" id="screenshots">
      <p className="section-label"><span />Gallery</p>
      <h2>Screenshots</h2>
      <div className="shots">
        {shots.map((src, i) =>
          failed.includes(src) ? null : (
            <img
              key={src}
              src={src}
              alt={`${GAME.name} gameplay screenshot ${i + 1}`}
              loading="lazy"
              style={{ transform: "scale(0.95)" }}
              onError={() => setFailed((f) => [...f, src])}
            />
          )
        )}
      </div>
    </section>
  );
}
