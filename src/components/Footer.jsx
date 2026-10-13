import { GAME } from "../config.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">{GAME.name}</span>
      <p>Made by {GAME.author} · © {new Date().getFullYear()}</p>
    </footer>
  );
}
