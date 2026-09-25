import { useEffect, useRef } from "react";


import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.png";
import heroMobile from "../../assets/images/hero-mobile.png";
import { heroEntranceAnimation, 
    heroParallaxAnimation, 
   
} from "../../animations/heroAnimation";


function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;

        const entranceAnimation = heroEntranceAnimation(hero);
        const cleanupParallax = heroParallaxAnimation(hero);
       

        return () => {
            entranceAnimation.kill();
            cleanupParallax();
            
        };
    }, []);
  return (
    <section id="home" className="hero" ref={heroRef}>

      <picture className="hero-picture">
        <source
          media="(max-width: 600px)"
          srcSet={heroMobile}
        />

        <img
          src={heroBg}
          alt=""
          className="hero-background"
        />
      </picture>

      {/* <div className="hero-overlay"></div> */}
      <div className="hero-content">

     
        <p className="hero-intro">
          Hello, I'm
        </p>

        <h2>
          Vipin Gangwar
        </h2>

        <h3 className="hero-role">
            <span className="role-text">Full</span>
            <span className="role-fixed"> Stack Developer</span>
        </h3>

        <p className="hero-description">
          I build modern, responsive and scalable
          web applications with clean code and
          exceptional user experiences.
        </p>

        <div className="hero-buttons">
          <a
            href="#projects"
            className="primary-button"
          >
            Explore My Work
            <span>↗</span>
          </a>

          <a
            href="#contact"
            className="secondary-button"
          >
            Contact Me
          </a>
        </div>
      </div>

    </section>
  );
}

export default Hero;