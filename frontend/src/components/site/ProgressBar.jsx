import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.width = `${(self.progress * 100).toFixed(2)}%`;
      },
    });
    return () => trigger.kill();
  }, []);
  return null;
}
