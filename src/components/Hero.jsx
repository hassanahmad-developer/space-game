import { useEffect } from "react";
import { gsap } from "gsap";
import SpaceDemo from "./SpaceDemo.jsx";
import { GAME } from "../config.js";

export default function Hero() {
  const dl = GAME.downloads.windows;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7, from: { y: 20 } })
      .to(".hero h1",       { opacity: 1, y: 0, duration: 0.9, from: { y: 40 } }, "-=0.4")
      .to(".lede",          { opacity: 1, y: 0, duration: 0.7, from: { y: 20 } }, "-=0.5")
      .to(".hero-actions",  { opacity: 1, y: 0, duration: 0.6, from: { y: 20 } }, "-=0.4")
      .to(".hero-note",     { opacity: 1, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <section className="hero" id="top">
      <SpaceDemo />
      <div className="hero-copy">
        <p className="hero-eyebrow"><span />Space Solar System Battle<span /></p>
        <h1>
          <span className="word-fly">Fly.</span>
          <br />
          <span className="word-land">Land.</span>
          <br />
          <span className="word-conquer">Conquer.</span>
        </h1>
        <p className="lede">
          A pixel-art space shooter across the solar system. Pilot your ship,
          battle alien fleets, land on planets, and fight zombies and aliens
          on the surface — solo or with friends on the same WiFi.
        </p>
        <div className="hero-actions">
          <a className="btn" href={dl.url} download>
            ⬇ Download for Windows
          </a>
          <a className="btn btn-quiet" href="#features">What's inside</a>
        </div>
        <p className="hero-note">Version {GAME.version} · Free to play</p>
      </div>
      <p className="hint">Move your mouse to fly · Click to shoot</p>
    </section>
  );
}
