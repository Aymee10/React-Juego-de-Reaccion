import React, { useState, useEffect, useRef } from 'react';
import Boton from '../boton/Boton';
import './Juego.css';

const Juego = () => {
  const [color, setColor] = useState('red');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [haComenzado, setHaComenzado] = useState(false);
  const timeoutRef = useRef(null);
  const clickable = useRef(false);

  const comenzar = () => {
    if (haComenzado && color !== 'red') return;

    setColor('red');
    setReactionTime(null);
    clickable.current = false;
    setHaComenzado(true);

    const delay = Math.floor(Math.random() * 4000) + 3000;

    timeoutRef.current = setTimeout(() => {
      setColor('green');
      setStartTime(Date.now());
      clickable.current = true;
    }, delay);
  };

  const manejarClick = () => {
    if (!clickable.current) return;

    const tiempo = Date.now() - startTime;
    setReactionTime(tiempo);
    if (bestTime === null || tiempo < bestTime) {
      setBestTime(tiempo);
    }
    setColor('red');
    clickable.current = false;
    setHaComenzado(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="juegoReaccion">
      <h2>Juego de Reacción ⏳</h2>
      <p>Cuando el cuadro se ponga verde, haz clic lo más rápido posible</p>
      <div className="cuadro" onClick={manejarClick} style={{ backgroundColor: color }}></div>
      <Boton
        textB={haComenzado ? "Esperando..." : "Iniciar Juego"}
        onClick={comenzar}
        color="blue"
        disabled={haComenzado && color !== 'red'}
      />
      <div className="resultados">
        <p>⏰ Tiempo de reacción: {reactionTime !== null ? `${reactionTime} ms` : '--'}</p>
        <p>🏆 Mejor tiempo: {bestTime !== null ? `${bestTime} ms` : '--'}</p>
      </div>
    </div>
  );
};

export default Juego;