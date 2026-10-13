import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import HowToPlay from "./components/HowToPlay.jsx";
import Screenshots from "./components/Screenshots.jsx";
import Download from "./components/Download.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <HowToPlay />
        <div className="section-divider" />
        <Screenshots />
        <div className="section-divider" />
        <Download />
      </main>
      <Footer />
    </>
    
  );
}
