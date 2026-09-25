import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function aboutScrollAnimation(section) {
  if (!section) return () => {};

  const heading = section.querySelector(".about-heading");
  const visual = section.querySelector(".about-visual");
  const info = section.querySelector(".about-info");
  const stats = section.querySelectorAll(".about-stat");

  const avatar = section.querySelector(".about-image-wrapper");
  const glow = section.querySelector(".about-glow");

  

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  timeline
    .fromTo(
      heading,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    )
    .fromTo(
      visual,
      {
        x: -80,
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.45"
    )
    .fromTo(
      info,
      {
        x: 80,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.75"
    )
    .fromTo(
      stats,
      {
        y: 35,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.4)"
      },
      "-=0.45"
    )
   
const floatingAnimation = gsap.to(avatar, {
  y: -12,
  duration: 2.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
const glowAnimation = gsap.to(glow, {
  scale: 1.25,
  opacity: 0.5,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

  return () => {
    timeline.kill();
    floatingAnimation.kill();
    glowAnimation.kill();

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });
  };
}