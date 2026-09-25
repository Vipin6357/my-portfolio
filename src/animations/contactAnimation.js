import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function contactScrollAnimation(section) {
  if (!section) return () => {};

  const heading = section.querySelector(".contact-heading");
  const info = section.querySelector(".contact-info");
  const form = section.querySelector(".contact-form");
  const footer = section.querySelector(".contact-footer");

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
    info,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
    },
    "-=0.35"
  );

  timeline.fromTo(
    form,
    {
      x: 50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
    },
    "-=0.6"
  );

  timeline.fromTo(
    footer,
    {
      y: 25,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.25"
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