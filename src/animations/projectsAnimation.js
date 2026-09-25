import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const projectsScrollAnimation = () => {
  const section = document.querySelector(".projects-section");

  if (!section) return;

  const heading = section.querySelector(".projects-heading");
  const cards = section.querySelectorAll(".project-card");

  gsap.fromTo(
    heading,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    }
  );

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 80,
      scale: 0.97,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        once: true,
      },
    }
  );
};