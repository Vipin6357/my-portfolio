import "./Footer.css";

const footerLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Education",
    href: "#education",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Main Footer */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              V<span>I</span>P<span>I</span>N <span>G</span>A<span>N</span>G<span>W</span>A<span>R</span>
            </a>

            <p>
              Full Stack Developer building modern,
              scalable and user-focused web experiences.
            </p>
          </div>

         
          <div className="footer-navigation">
            <h3>Navigation</h3>

            <div className="footer-links">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          
          <div className="footer-social">
            <h3>Connect</h3>

            <div className="footer-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      
        <div className="footer-bottom">

          <p>
            © {currentYear} Vipin Gangwar. All rights reserved.
          </p>

          <a href="#home" className="footer-back-top">
            Back to top
            <span>↑</span>
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;