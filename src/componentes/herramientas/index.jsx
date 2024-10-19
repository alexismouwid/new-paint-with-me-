import React, { useEffect, useRef } from 'react';
import Lapiz from './images/lapiz.png';
import Borrador from './images/borrador.png';
import Disminucion from './images/menos.png';
import Mas from './images/mas.png';
import Triangulo from './images/triangulo.png';
import Cuadrado from './images/cuadrado.png';
import Circulo from './images/circulo.png'; 
import Limpiador from './images/icono.png';
import BubbleAlert from '../BubbleAlert';
import './herramientas.css';
import ScrollReveal from 'scrollreveal';

const Herramientas = ({canvas,
    ctx,
    chooseAction,
    handleMouseDown,
    handleMouseMove,
    handleMouseMoveDelete,
    handleMouseUp,
    Limpiar,
    Menos,
    Aumentar,
    currentWidth,
    cambios,
}) => {
  const herramientasRef = useRef(null);


  useEffect(() => {
    const config = {
      origin: 'right', // Corrige 'rigth' a 'right'
      duration: 4000,
      delay: 150,
      distance: '-700px',
      scale: 0,
      easing: 'ease',
      reset: false,
    };

    ScrollReveal().reveal(herramientasRef.current, config);
  }, []); // Se ejecuta solo una vez al montar

   return (
    <nav className="opciones-herramientas" ref={herramientasRef}>
      <button className="cleaner" onClick={Limpiar}>
        <img src={Limpiador} width="40" height="40" alt="Limpiar" />
      </button>
      <button className="borrar" onClick={() => chooseAction('modeDelete')}>
        <img src={Borrador} width="40" height="40" alt="Borrador" />
      </button>
      <button className="pintar" onClick={() => chooseAction('modePaint')}>
        <img src={Lapiz} width="40" height="40" alt="Pintar" />
      </button>
      <button className="btn-trazo">
        <span className="bubble">
          <BubbleAlert value={currentWidth} />
        </span>
      </button>
      <button className="menos" onClick={Menos}>
        <img src={Disminucion} width="40" height="40" alt="Disminuir" />
      </button>
      <button className="mas" onClick={Aumentar}>
        <img src={Mas} width="40" height="40" alt="Aumentar" />
      </button>
      <button className="triangulo" onClick={() => chooseAction('modeTriangle')}>
        <img src={Triangulo} width="40" height="40" alt="Triángulo" />
      </button>
      <button className="circulo" onClick={() => chooseAction('modeCircle')}>
        <img src={Circulo} width="40" height="40" alt="Círculo" />
      </button>
      <button className="cuadrado" onClick={() => chooseAction('modeSquare')}>
        <img src={Cuadrado} width="40" height="40" alt="Cuadrado" />
      </button>
    </nav>
  );
};

export default Herramientas;

