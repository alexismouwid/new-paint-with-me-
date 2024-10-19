import React, { useRef, useState, useEffect } from 'react';
import Herramientas from '../herramientas';
import Colores from '../colores';
import './dibujo.css';
import ScrollReveal from 'scrollreveal';

const Dibujo = () => {
  const [state, setState] = useState({
    modePaint: false,
    modeDelete: false,
    modeSquare: false,
    modeTriangle: false,
    modeCircle: false,
    currentWidth: 10,
    currentColor: '#000',
    currentTempo: null,
    cambios: true,
  });

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const initialXRef = useRef(null);
  const initialYRef = useRef(null);

 // Limpiar lienzo
  const Limpiar = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('Se borró el contenido del lienzo');
  };

  // Disminuir tamaño de trazo
  const Menos = () => {
    setState((prevState) => {
      if (prevState.currentWidth <= 0) {
        console.log('El valor no se puede disminuir más');
        return prevState; // No cambia el estado si no es posible disminuir
      }
      const newWidth = prevState.currentWidth - 10;
      console.log(`Tamaño de trazo actual: ${newWidth}`);
      return { ...prevState, currentWidth: newWidth };
    });
  };

  // Aumentar tamaño de trazo
  const Aumentar = () => {
    setState((prevState) => {
      const newWidth = prevState.currentWidth + 10;
      console.log(`Tamaño de trazo actual: ${newWidth}`);
      return { ...prevState, currentWidth: newWidth };
    });
  };
  useEffect(() => {
    const config = {
      origin: 'top',
      duration: 3000,
      delay: 150,
      distance: '-500px',
      scale: 0,
      easing: 'ease-out',
      reset: false,
    };

    ScrollReveal().reveal(canvasRef.current, config);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const handleMouseDown = (evt) => {
      initialXRef.current = evt.offsetX;
      initialYRef.current = evt.offsetY;

      if (state.modePaint) {
        dibujar(initialXRef.current, initialYRef.current);
        canvas.addEventListener('mousemove', handleMouseMove);
      } else if (state.modeDelete) {
        borrar(initialXRef.current, initialYRef.current);
        canvas.addEventListener('mousemove', handleMouseMoveDelete);
      } else if (state.modeSquare) {
        canvas.addEventListener('mousemove', drawSquarePreview);
        canvas.addEventListener('mouseup', drawSquare);
      } else if (state.modeTriangle) {
        canvas.addEventListener('mousemove', drawTrianglePreview);
        canvas.addEventListener('mouseup', drawTriangle);
      } else if (state.modeCircle) {
        canvas.addEventListener('mousemove', drawCirclePreview);
        canvas.addEventListener('mouseup', drawCircle);
      }
    };

    const handleMouseMove = (evt) => {
      if (state.modePaint) {
        dibujar(evt.offsetX, evt.offsetY);
      }
    };

    const handleMouseUp = () => {
      if (state.modePaint) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      } else if (state.modeDelete) {
        canvas.removeEventListener('mousemove', handleMouseMoveDelete);
      } else if (state.modeSquare) {
        canvas.removeEventListener('mousemove', drawSquarePreview);
        canvas.removeEventListener('mouseup', drawSquare);
      } else if (state.modeTriangle) {
        canvas.removeEventListener('mousemove', drawTrianglePreview);
        canvas.removeEventListener('mouseup', drawTriangle);
      } else if (state.modeCircle) {
        canvas.removeEventListener('mousemove', drawCirclePreview);
        canvas.removeEventListener('mouseup', drawCircle);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [state]);

  const ChooseAction = (selectedState) => {
    initialXRef.current = null;
    initialYRef.current = null;

    setState((prevState) => ({
      ...prevState,
      modePaint: selectedState === 'modePaint',
      modeDelete: selectedState === 'modeDelete',
      modeSquare: selectedState === 'modeSquare',
      modeCircle: selectedState === 'modeCircle',
      modeTriangle: selectedState === 'modeTriangle',
    }));
  };

  // useEffect para manejar los cambios de estado y color
  useEffect(() => {
    const trueState = findTrueState(); // función que obtiene el estado verdadero
    console.log(` -${trueState}-
    \nCOLOR: ${state.currentColor}`);

    if (['modePaint', 'modeSquare', 'modeCircle', 'modeTriangle'].includes(trueState)) {
      setState((prevState) => ({
        ...prevState,
        currentColor: prevState.cambios ? prevState.currentTempo : '#000',
      }));
    }
  }, [state.modePaint, state.modeSquare, state.modeCircle, state.modeTriangle]);

  const chooseColor = () => {
    if (state.modeDelete) {
      console.log('Modo borrado activado. No se puede cambiar el color.');
      return;
    } else {
      const colorButtons = document.querySelectorAll('.color-button');
      colorButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          setState((prevState) => ({
            ...prevState,
            currentTempo: button.dataset.color,
            currentColor: button.dataset.color,
            cambios: true,
          }));
        });
      });
    }
    const trueState = findTrueState();
    console.log(`-${trueState}-
        \n Cambios: ${state.cambios}
        \n Nuevo color establecido: ${state.currentTempo}`);
  };

  const findTrueState = () => {
    const trueState = Object.keys(state).find(key => state[key] === true);
    return trueState || "No hay estados con valor true";
  };

  const dibujar = (cursorX, cursorY) => {
    if (state.modePaint) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(initialXRef.current, initialYRef.current);
      ctxRef.current.strokeStyle = state.currentColor;
      ctxRef.current.lineWidth = state.currentWidth;
      ctxRef.current.lineCap = 'round';
      ctxRef.current.lineJoin = 'round';
      ctxRef.current.lineTo(cursorX, cursorY);
      ctxRef.current.stroke();
      initialXRef.current = cursorX;
      initialYRef.current = cursorY;
    }
  };

  const borrar = (cursorX, cursorY) => {
    if (state.modeDelete) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(initialXRef.current, initialYRef.current);
      ctxRef.current.strokeStyle = '#fff';
      ctxRef.current.lineWidth = state.currentWidth;
      ctxRef.current.lineCap = 'round';
      ctxRef.current.lineJoin = 'round';
      ctxRef.current.lineTo(cursorX, cursorY);
      ctxRef.current.stroke();
      initialXRef.current = cursorX;
      initialYRef.current = cursorY;
    }
  };

  const handleMouseMoveDelete = (evt) => {
    if (state.modeDelete) {
      borrar(evt.offsetX, evt.offsetY);
    }
  };

  const drawSquarePreview = (evt) => {
    if (state.modeSquare) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      const width = cursorX - initialXRef.current;
      const height = cursorY - initialYRef.current;

      ctxRef.current.fillStyle = state.cambios ? state.currentTempo : '#000';
      ctxRef.current.fillRect(initialXRef.current, initialYRef.current, width, height);
      console.log(`Color: ${ctxRef.current.fillStyle}`);
    }
  };

  const drawSquare = (evt) => {
    if (state.modeSquare) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      const width = cursorX - initialXRef.current;
      const height = cursorY - initialYRef.current;

      ctxRef.current.fillStyle = state.cambios ? state.currentTempo : '#000';
      ctxRef.current.fillRect(initialXRef.current, initialYRef.current, width, height);
      console.log(`Cuadrado creado con éxito.
      \n Dimensiones: ANCHO: ${width} X ALTO:${height} 
      \n Coordenadas iniciales: [${initialXRef.current}, ${initialYRef.current}]
      \n Coordenadas finales: [${cursorX}, ${cursorY}]`);

      canvasRef.current.removeEventListener('mousemove', drawSquarePreview);
      canvasRef.current.removeEventListener('mouseup', drawSquare);
    }
  };

  const Triangle = (cursorX, cursorY) => {
    if (state.modeTriangle) {
      ctxRef.current.fillStyle = state.cambios ? state.currentTempo : '#000';
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(initialXRef.current, initialYRef.current);
      const triHeight = cursorY - initialYRef.current; // Altura del triángulo
      const triWidth = cursorX - initialXRef.current; // Ancho de la base del triángulo
      ctxRef.current.lineTo(initialXRef.current + triWidth, initialYRef.current);
      ctxRef.current.lineTo(initialXRef.current + (triWidth / 2), initialYRef.current + triHeight);
      ctxRef.current.closePath();
      ctxRef.current.fill();
    }
  };

  const drawTrianglePreview = (evt) => {
    if (state.modeTriangle) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      Triangle(cursorX, cursorY);
    }
  };

  const drawTriangle = (evt) => {
    if (state.modeTriangle) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      Triangle(cursorX, cursorY);
      canvasRef.current.removeEventListener('mousemove', drawTrianglePreview);
      canvasRef.current.removeEventListener('mouseup', drawTriangle);
    }
  };

  const drawCirclePreview = (evt) => {
    if (state.modeCircle) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      const radius = Math.sqrt((cursorX - initialXRef.current) ** 2 + (cursorY - initialYRef.current) ** 2);

      ctxRef.current.fillStyle = state.cambios ? state.currentTempo : '#000';
      ctxRef.current.beginPath();
      ctxRef.current.arc(initialXRef.current, initialYRef.current, radius, 0, Math.PI * 2);
      ctxRef.current.fill();
    }
  };

  const drawCircle = (evt) => {
    if (state.modeCircle) {
      const cursorX = evt.offsetX;
      const cursorY = evt.offsetY;
      const radius = Math.sqrt((cursorX - initialXRef.current) ** 2 + (cursorY - initialYRef.current) ** 2);

      ctxRef.current.fillStyle = state.cambios ? state.currentTempo : '#000';
      ctxRef.current.beginPath();
      ctxRef.current.arc(initialXRef.current, initialYRef.current, radius, 0, Math.PI * 2);
      ctxRef.current.fill();
      canvasRef.current.removeEventListener('mousemove', drawCirclePreview);
      canvasRef.current.removeEventListener('mouseup', drawCircle);
    }
  };

return (
  <div className="dibujo">
<canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{ border: '1px solid black' }}
      />
    <div className="container-herramientas">
      <Herramientas 
        chooseAction={ChooseAction}
        Limpiar={Limpiar} // Pasa la función Limpiar
        Menos={Menos} // Pasa la función Menos
        Aumentar={Aumentar} // Pasa la función Aumentar
      />
      
      <Colores chooseColor={chooseColor} />
    </div>
    
    <div className="canvas-container">
      
    </div>
  </div>
);
};

export default Dibujo;

