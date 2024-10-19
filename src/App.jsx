import React from 'react';
import Presentacion from './componentes/presentacion';
import Dibujo from './componentes/dibujo';
import Footer from './componentes/footer';
import './App.css';

const App = () => {
  return (
    <div className="div-body">
      <Presentacion />
      <Dibujo />
      <Footer />
    </div>
  );
};

export default App;

