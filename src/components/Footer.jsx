import logoWhite from "../assets/images/logo-white.svg";
import logoBlack from "../assets/images/logo-black.svg";
import { useEffect, useState } from "react";

export default function Footer({ isWhiteTheme }) {
  const logo = isWhiteTheme ? logoBlack : logoWhite;
  return (
    <footer className="footer main-padding">
      <div className="footer-top">
        <img src={logo} alt="logo" className="footer-logo" />
        <div className="footer-nav">
          <h3>Discover jobs</h3>
          <a href="#">remote</a>
          <a href="#">onsite</a>
          <a href="#">hybrid</a>
          <a href="#">tracker</a>
        </div>
        <div className="footer-socials">
          <h3>Socials</h3>
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} jobHive. All rights reserverd.
        </p>

      </div>
    </footer>
  )
}
