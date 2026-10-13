import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🪐",
    title: "Solar system to explore",
    text: "Fly across Mercury, Venus, Earth, Mars, Jupiter and beyond. Each planet has its own orbit, gravity, and secrets.",
  },
  {
    icon: "🌍",
    title: "Land and fight on the surface",
    text: "Touch down on Earth, Moon, Mars, Europa and more. Each biome has unique enemies — zombies, grey aliens, ice aliens, and purple aliens.",
  },
  {
    icon: "🚀",
    title: "18 ships, 3 classes",
    text: "Choose from Fighter, Scout, or Heavy class in 6 colors. Collect powerups: shield, laser, missile, speed, cloak, and repair.",
  },
  {
    icon: "🌐",
    title: "Multiplayer over WiFi or online",
    text: "Create a server and friends on the same WiFi find it by name. Or enter a server address to play online from anywhere.",
  },
];

export default function Features() {
  useEffect(() => {
    gsap.to(".feature", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#features",
        start: "top 75%",
      },
    });
    gsap.from("#features h2", {
      opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: "#features", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section" id="features">
      <p className="section-label"><span />Features</p>
      <h2>What's inside</h2>
      <div className="features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature" style={{ transform: "translateY(30px)" }}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
