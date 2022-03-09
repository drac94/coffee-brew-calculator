import React, { ChangeEvent, useReducer } from 'react';

import Slider from '../../components/Slider';

import './App.css';

type QuantitiesState = {
  cups: number;
  coffee: number;
  water: number;
};

type QuantitiesAction =
  | { type: 'increaseCups'; payload: number }
  | { type: 'increaseCoffee'; payload: number }
  | { type: 'increaseWater'; payload: number };

const actions: {
  [key: string]: 'increaseCups' | 'increaseCoffee' | 'increaseWater';
} = {
  cups: 'increaseCups',
  coffee: 'increaseCoffee',
  water: 'increaseWater',
};

const initialQuantities = {
  cups: 1,
  coffee: 16,
  water: 236,
};

const reducer = (state: QuantitiesState, action: QuantitiesAction) => {
  const { type, payload } = action;
  switch (type) {
    case actions.cups:
      return {
        cups: payload,
        coffee: Math.round(payload * initialQuantities.coffee),
        water: Math.round(payload * initialQuantities.water),
      };
    case actions.coffee:
      return {
        cups: Math.round(payload / initialQuantities.coffee),
        coffee: payload,
        water: Math.round(
          (payload * initialQuantities.water) / initialQuantities.coffee
        ),
      };
    case actions.water:
      return {
        cups: Math.round(
          (payload * initialQuantities.cups) / initialQuantities.water
        ),
        coffee: Math.round(
          (payload * initialQuantities.coffee) / initialQuantities.water
        ),
        water: payload,
      };
    default:
      return state;
  }
};

const App = (): JSX.Element => {
  const [quantities, dispatch] = useReducer(reducer, initialQuantities);
  const handleCupsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actions[e.target.name], payload: Number(e.target.value) });
  };
  return (
    <div className="App">
      <div className="quantities-container section">
        <h2>Quantities</h2>
        <div className="quantity-slider-container">
          <Slider
            min="1"
            max="10"
            defaultValue="1"
            id="cupsRange"
            title="Cups"
            name="cups"
            value={quantities.cups}
            onChange={handleCupsChange}
          />
        </div>
        <div className="quantity-slider-container">
          <Slider
            min="16"
            max="160"
            defaultValue="16"
            id="coffeeRange"
            title="Coffee"
            unit="gr"
            name="coffee"
            value={quantities.coffee}
            onChange={handleCupsChange}
          />
        </div>
        <div className="quantity-slider-container">
          <Slider
            min="236"
            max="2360"
            defaultValue="236"
            id="waterRange"
            title="Water"
            name="water"
            value={quantities.water}
            unit="ml"
            onChange={handleCupsChange}
          />
        </div>
      </div>
      <div className="quantities-container section">
        <h2>Preferences</h2>
      </div>
      <div className="quantities-container section">
        <h2>Pours</h2>
      </div>
    </div>
  );
};

export default App;
