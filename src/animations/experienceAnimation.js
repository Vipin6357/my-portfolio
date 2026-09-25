import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function experienceScrollAnimation(section) {
  if (!section) return () => {};

  const heading = section.querySelector(".experience-heading");
  const line = section.querySelector(".experience-line");
  const cards = section.querySelectorAll(".experience-card");
  const dots = section.querySelectorAll(".experience-dot");

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  timeline.fromTo(
    heading,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  timeline.fromTo(
    line,
    {
      scaleY: 0,
      transformOrigin: "top",
    },
    {
      scaleY: 1,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.35"
  );

  timeline.fromTo(
    cards,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "power3.out",
    },
    "-=0.55"
  );

  timeline.fromTo(
    dots,
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.45,
      stagger: 0.2,
      ease: "back.out(1.7)",
    },
    "-=0.9"
  );

  return () => {
    timeline.kill();

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });
  };
}