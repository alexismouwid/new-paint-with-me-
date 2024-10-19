import React, { useEffect, useRef } from 'react';
import './canvas.css';
import ScrollReveal from 'scrollreveal';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const config = {
      origin: 'top',
      duration: 3000,
      delay: 150,
      distance: '-500px',
      scale: 0,
      easing: 'ease',
      reset: false,
    };

    ScrollReveal().reveal(canvasRef.current, config);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Aquí puedes agregar el código para dibujar en el canvas
    ctx.fillStyle = 'lightblue'; // Ejemplo de color de fondo
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja un rectángulo que llena el canvas

    // Puedes añadir más lógica de dibujo aquí...

  }, []); // Se ejecuta solo una vez al montar

  return (
    <div>
      <main className="container-canvas">
        <canvas
          id="canvas"
          width="720"
          height="600"
          ref={canvasRef}
        ></canvas>
      </main>
    </div>
  );
};

export default Canvas;

