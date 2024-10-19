import React, { useEffect, useRef } from 'react';
import Logo from './icono.png';
import './footer.css';
import ScrollReveal from 'scrollreveal';

const Footer = () => {
  const footerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const config = {
      origin: 'top',
      duration: 3000,
      delay: 150,
      distance: '-250px',
      scale: 0,
      easing: 'ease',
      reset: false,
    };

    const configCanvas = {
      origin: 'top',
      duration: 3000,
      delay: 150,
      distance: '-500px',
      scale: 0,
      easing: 'ease',
      reset: false,
    };

    ScrollReveal().reveal(footerRef.current, config);
    ScrollReveal().reveal(canvasRef.current, configCanvas);
  }, []); // Se ejecuta solo una vez al montar

  return (
    <>
      <footer className="footer" ref={footerRef}>
        <ul className="ul">
          <li className="autor">Autor: Alexis Vega</li>
          <li className="li">
            <a href="./index.html">
              <img className="logo-footer" src={Logo} width="50" height="50" alt="Logo" />
            </a>
          </li>
          <li className="li">
            <p className="COPYRIGHT">COPYRIGHT 2024@ Alexis Vega</p>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;

