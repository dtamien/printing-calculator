import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [unitsAvailable, setUnitsAvailable] = useState(0);
  const [a4Bw, setA4Bw] = useState(0);
  const [a4Color, setA4Color] = useState(0);
  const [a3Bw, setA3Bw] = useState(0);
  const [a3Color, setA3Color] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [unitsNeeded, setUnitsNeeded] = useState(0);
  const [minimalOffer, setMinimalOffer] = useState(0);
  const [minimalPrice, setMinimalPrice] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    calculate();
    console.log('unitsAvailable:', unitsAvailable);
  }, [unitsAvailable, a4Bw, a4Color, a3Bw, a3Color]);

  const calculate = () => {
    const units = (a4Bw * 1) + (a4Color * 5) + (a3Bw * 2) + (a3Color * 10);
    setTotalUnits(units);
    const needed = Math.max(0, units - unitsAvailable);
    setUnitsNeeded(needed);
    const offer = needed > 0 ? Math.ceil(needed / 10) * 10 : 0;
    setMinimalOffer(offer);
    const price = needed > 0 ? Math.ceil(needed / 10) * 1.5 : 0;
    setMinimalPrice(price);
    const availableCards = [50, 30, 10];
    const cards = [];
    let remaining = offer;
    for (const card of availableCards) {
      const count = Math.floor(remaining / card);
      if (count > 0) {
        cards.push(`${count} x ${card}`);
        remaining -= count * card;
      }
    }
    setCards(cards);
  };

  const reset = () => {
    setUnitsAvailable(0);
    setA4Bw(0);
    setA4Color(0);
    setA3Bw(0);
    setA3Color(0);
  }

  const handleInputBlur = (setStateFunction, value) => {
    if (value === '') {
      setStateFunction(0);
    }
  };

  return (
    <>
      <div id='header'>
        {/* <img src="calculator.png" alt="printer" /> */}
        Calculatrice de l'offre minimale d'impression
        {/* <img src="printer.png" alt="printer" /> */}
      </div>
      <div id='main-content'>
        <div id='inputs'>
          <div className='input'>
            Pages A4 N&B
            <div className='units'>
              <input type="number" required value={a4Bw} min="0" onChange={(e) => setA4Bw(parseInt(e.target.value))} onBlur={(e) => handleInputBlur(setA4Bw, e.target.value)} />
              <button onClick={() => setA4Bw(Math.max(0, a4Bw + 1))}>+</button>
              <button onClick={() => setA4Bw(Math.max(0, a4Bw - 1))}>−</button>
            </div>
          </div>
          <div className='input'>
            Pages A4 Couleurs
            <div className='units'>
              <input type="number" required value={a4Color} min="0" onChange={(e) => setA4Color(parseInt(e.target.value))} onBlur={(e) => handleInputBlur(setA4Color, e.target.value)} />
              <button onClick={() => setA4Color(Math.max(0, a4Color + 1))}>+</button>
              <button onClick={() => setA4Color(Math.max(0, a4Color - 1))}>−</button>
            </div>
          </div>
          <div className='input'>
            Pages A3 N&B
            <div className='units'>
              <input type="number" required value={a3Bw} min="0" onChange={(e) => setA3Bw(parseInt(e.target.value))} onBlur={(e) => handleInputBlur(setA3Bw, e.target.value)} />
              <button onClick={() => setA3Bw(Math.max(0, a3Bw + 1))}>+</button>
              <button onClick={() => setA3Bw(Math.max(0, a3Bw - 1))}>−</button>
            </div>
          </div>
          <div className='input'>
            Pages A3 Couleurs
            <div className='units'>
              <input type="number" required value={a3Color} min="0" onChange={(e) => setA3Color(parseInt(e.target.value))} onBlur={(e) => handleInputBlur(setA3Color, e.target.value)} />
              <button onClick={() => setA3Color(Math.max(0, a3Color + 1))}>+</button>
              <button onClick={() => setA3Color(Math.max(0, a3Color - 1))}>−</button>
            </div>
          </div>
          <div className='input'>
            Unités déjà disponibles
            <div className='units'>
              <input type="number" required value={unitsAvailable} min="0" onChange={(e) => setUnitsAvailable(parseInt(e.target.value))} onBlur={(e) => handleInputBlur(setUnitsAvailable, e.target.value)} />
              <button onClick={() => setUnitsAvailable(Math.max(0, unitsAvailable + 1))}>+</button>
              <button onClick={() => setUnitsAvailable(Math.max(0, unitsAvailable - 1))}>−</button>
            </div>
          </div>
          <button onClick={reset}>Réinitialiser</button>
        </div>
        <div id='outputs'>
          <div className='output'>
            Total d'unités nécessaires : {totalUnits}
          </div>
          <div className='output'>
            Unités restantes à obtenir : {unitsNeeded}
          </div>
          <div className='output'>
            Offre minimale associée : {minimalOffer} unités
          </div>
          <div className='output'>
            Prix minimum associé : {minimalPrice.toFixed(2)} €
          </div>
          <div className='output'>
            Décomposition en cartes d'unités : {cards.join(', ')}
          </div>
        </div>    
      </div>
    </>
  );
}

export default App;
