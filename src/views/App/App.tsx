import React, { ChangeEvent, useReducer } from 'react';

import Slider from '../../components/Slider';

import './App.css';

type PortionsState = {
  cups: number;
  coffee: number;
  water: number;
};

type PortionsAction =
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

const initialPortions = {
  cups: 1,
  coffee: 16,
  water: 236,
};

const reducer = (state: PortionsState, action: PortionsAction) => {
  const { type, payload } = action;
  switch (type) {
    case actions.cups:
      return {
        cups: payload,
        coffee: Math.round(payload * initialPortions.coffee),
        water: Math.round(payload * initialPortions.water),
      };
    case actions.coffee:
      return {
        cups: Math.round(payload / initialPortions.coffee),
        coffee: payload,
        water: Math.round(
          (payload * initialPortions.water) / initialPortions.coffee
        ),
      };
    case actions.water:
      return {
        cups: Math.round(
          (payload * initialPortions.cups) / initialPortions.water
        ),
        coffee: Math.round(
          (payload * initialPortions.coffee) / initialPortions.water
        ),
        water: payload,
      };
    default:
      return state;
  }
};

const App = (): JSX.Element => {
  const [portions, dispatch] = useReducer(reducer, initialPortions);
  const handleCupsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actions[e.target.name], payload: Number(e.target.value) });
  };
  return (
    <div className="App">
      <Slider
        min="1"
        max="10"
        defaultValue="1"
        id="cupsRange"
        title="Cups"
        name="cups"
        value={portions.cups}
        onChange={handleCupsChange}
      />
      <Slider
        min="16"
        max="160"
        defaultValue="16"
        id="coffeeRange"
        title="Coffee"
        unit="gr"
        name="coffee"
        value={portions.coffee}
        onChange={handleCupsChange}
      />
      <Slider
        min="236"
        max="2360"
        defaultValue="236"
        id="waterRange"
        title="Water"
        name="water"
        value={portions.water}
        unit="ml"
        onChange={handleCupsChange}
      />
    </div>
  );
};

export default App;
