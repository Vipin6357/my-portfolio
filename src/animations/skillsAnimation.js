import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function skillsScrollAnimation(section) {
  if (!section) return () => {};

  const heading = section.querySelector(".skills-heading");
  const categories = section.querySelectorAll(".skill-category");
  const cards = section.querySelectorAll(".skill-card");

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  timeline
    .fromTo(
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
    )
    .fromTo(
      categories,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.35"
    )
    .fromTo(
      cards,
      {
        y: 20,
        opacity: 0,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: "back.out(1.5)",
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