import gsap from "gsap";

export function heroEntranceAnimation(hero) {
  if (!hero) return gsap.timeline();

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  const background = hero.querySelector(".hero-background");
  const overlay = hero.querySelector(".hero-overlay");
  const intro = hero.querySelector(".hero-intro");
  const heading = hero.querySelector("h2");
  const subheading = hero.querySelector("h3");
  const description = hero.querySelector(".hero-description");
  const buttons = hero.querySelector(".hero-buttons");

  timeline
    .fromTo(
      background,
      {
        scale: 1.08,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5
      }
    )
    .fromTo(
      overlay,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8
      },
      "-=1"
    )
    .fromTo(
      intro,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6
      },
      "-=0.4"
    )
    .fromTo(
      heading,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8
      },
      "-=0.35"
    )
    .fromTo(
      subheading,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7
      },
      "-=0.45"
    )
    .fromTo(
      description,
      {
        y: 25,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6
      },
      "-=0.4"
    )
    .fromTo(
      buttons,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6
      },
      "-=0.35"
    );

  gsap.to(background, {
    scale: 1.04,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  return timeline;
}


export function heroParallaxAnimation(hero) {
  if (!hero) return () => {};

  const background = hero.querySelector(".hero-background");
  const content = hero.querySelector(".hero-content");

  if (!background || !content) return () => {};

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) return () => {};

  const handleMouseMove = (event) => {
    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(background, {
      x: x * 18,
      y: y * 12,
      duration: 1.2,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to(content, {
      x: x * -8,
      y: y * -5,
      duration: 1.2,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(background, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.to(content, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  };

  hero.addEventListener("mousemove", handleMouseMove);
  hero.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    hero.removeEventListener("mousemove", handleMouseMove);
    hero.removeEventListener("mouseleave", handleMouseLeave);

    gsap.killTweensOf([background, content]);
  };
}

