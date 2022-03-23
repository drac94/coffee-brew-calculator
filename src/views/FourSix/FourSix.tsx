import React, { ChangeEvent, useReducer, useState } from 'react';

import SegmentedPicker from '../../components/SegmentedPicker';
import Slider from '../../components/Slider';

import {
  concentrationOptions,
  flavorOptions,
  roastOptions,
  temperatures,
} from './constants';
import {
  actions as quantitiesReducerActions,
  initialQuantities,
  quantitiesReducer,
} from './quantitiesReducer';
import { calculatePourGridColumns, calculatePours } from './utils';

import './FourSix.css';

const FourSix = (): JSX.Element => {
  const [quantities, dispatch] = useReducer(
    quantitiesReducer,
    initialQuantities
  );
  // TODO type this better
  const [roast, setRoast] = useState('light');
  const [preferences, setPreferences] = useState({
    flavor: 'standard',
    concentration: 'medium',
  });
  const handleQuantitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: quantitiesReducerActions[e.currentTarget.name],
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

  const pours = calculatePours({
    water: quantities.water,
    flavor: preferences.flavor,
    concentration: preferences.concentration,
  });

  const pourGridColumns = calculatePourGridColumns(pours, quantities.water);

  return (
    <div className="four-six-container">
      <h1>4:6 Brewing Method Calculator</h1>
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
            unit="gr"
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
        <div
          className="pour-container"
          style={{ gridTemplateColumns: pourGridColumns }}
        >
          {pours.flavor.map((p, i) => (
            <span className="pour" key={`flavorPour${i}`}>
              {Math.round(p)}gr
            </span>
          ))}
          {pours.concentration.map((p, i) => (
            <span className="pour" key={`concentrationPour${i}`}>
              {Math.round(p)}gr
            </span>
          ))}
        </div>
        <span className="hint">
          Each pour should be timed so that the hot water has almost completely
          passed through the filter before pouring again. 1ml = 1gr
        </span>
      </div>
    </div>
  );
};

export default FourSix;
