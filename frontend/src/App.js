import { useEffect, useState } from "react";
import "@/index.css";
import { useLenis } from "./hooks/useLenis";
import Nav from "./components/site/Nav";
import ProgressBar from "./components/site/ProgressBar";
import SearchOverlay from "./components/site/SearchOverlay";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Team from "./components/sections/Team";
import Careers from "./components/sections/Careers";
import Contact from "./components/sections/Contact";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  useLenis();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="App" data-testid="site-root">
      <ProgressBar />
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Team />
        <Careers />
        <Contact />
      </main>
    </div>
  );
}

export default App;
