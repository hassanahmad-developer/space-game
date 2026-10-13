import { useEffect } from "react";
import { GAME } from "../config.js";

export default function Header() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#top">{GAME.name}</a>
      <nav aria-label="Main">
        <a href="#features">Features</a>
        <a href="#how-to-play">How to play</a>
        <a href="#download">Download</a>
      </nav>
    </header>
  );
}
