import React, { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';
import Logo from './icono.png';
import './presentacion.css';

const Presentacion = () => {
  const presRef = useRef(null);

  useEffect(() => {
    const config = {
      origin: 'bottom',
      duration: 3000,
      delay: 150,
      distance: '-500px',
      scale: 3,
      easing: 'ease',
      reset: false,
    };

    ScrollReveal().reveal(presRef.current, config);
  }, []); // Dependencias vacías para que se ejecute solo al montar

  return (
    <div ref={presRef}>
      <a href="index.html">
        <img src={Logo} className="logo" alt="logo" />
      </a>
      <h1 className="titulo">PAINT WITH ME</h1>
    </div>
  );
};

export default Presentacion;

