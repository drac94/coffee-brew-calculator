import React, { ChangeEvent, useReducer, useState } from 'react';

import SegmentedPicker from '../../components/SegmentedPicker';
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

const flavorOptions = ['standard', 'sweet', 'bright'];
const concentrationOptions = ['light', 'medium', 'strong'];
const roastOptions = ['light', 'medium', 'dark'];

const temperatures: {
  [key: string]: number;
} = {
  light: 93,
  medium: 88,
  dark: 83,
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
  // TODO type this better
  const [roast, setRoast] = useState('light');
  const [preferences, setPreferences] = useState({
    flavor: 'standard',
    concentration: 'medium',
  });
  const handleQuantitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actions[e.currentTarget.name],
      payload: Number(e.currentTarget.value),
    });
  };
  const handlePreferencesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [currentTarget.name]: currentTarget.value,
    }));
  };
  const handleRoastChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoast(e.currentTarget.value);
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
            onChange={handleQuantitiesChange}
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
            onChange={handleQuantitiesChange}
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
            onChange={handleQuantitiesChange}
          />
        </div>
      </div>
      <div className="quantities-container section">
        <h2>Preferences</h2>
        <SegmentedPicker
          selectedValue={preferences.flavor}
          name="flavor"
          title="Flavor"
          options={flavorOptions}
          onChange={handlePreferencesChange}
        />
        <SegmentedPicker
          name="concentration"
          title="Concentration"
          options={concentrationOptions}
          selectedValue={preferences.concentration}
          onChange={handlePreferencesChange}
        />
        <SegmentedPicker
          selectedValue={roast}
          name="roast"
          title="Roast"
          options={roastOptions}
          onChange={handleRoastChange}
        />
        <span className="hint">
          Recommended temperature for the water: around {temperatures[roast]}
          ºC
        </span>
      </div>
      <div className="quantities-container section">
        <h2>Pours</h2>
      </div>
    </div>
  );
};

export default App;
