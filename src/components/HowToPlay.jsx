import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowToPlay() {
  useEffect(() => {
    gsap.to(".steps li", {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: { trigger: "#how-to-play", start: "top 75%" },
    });
    gsap.from("#how-to-play h2", {
      opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: "#how-to-play", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section" id="how-to-play">
      <p className="section-label"><span />Getting started</p>
      <h2>Start playing in three steps</h2>
      <ol className="steps">
        <li style={{ transform: "translateX(-30px)" }}>
          <strong>Download and install.</strong> Run the installer and open
          Space Solar System Battle from your desktop.
        </li>
        <li style={{ transform: "translateX(-30px)" }}>
          <strong>Pick a mode.</strong> Choose Play Offline to jump in solo,
          Create Server to host a game, or Find Server List to join a friend.
        </li>
        <li style={{ transform: "translateX(-30px)" }}>
          <strong>Fly, land, survive.</strong> Explore the solar system, land
          on planets to fight on the surface, and take down the alien
          mothership boss.
        </li>
      </ol>
    </section>
  );
}
