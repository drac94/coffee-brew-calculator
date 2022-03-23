import React, { ChangeEvent, useReducer } from 'react';

import SegmentedPicker from '../../components/SegmentedPicker';
import Slider from '../../components/Slider';

import {
  actions as quantitiesReducerActions,
  initialQuantities,
  quantitiesReducer,
} from './quantitiesReducer';

import './FrenchPress.css';

const concentrationOptions = [
  { label: 'light', value: '18' },
  { label: 'medium', value: '14' },
  { label: 'strong', value: '10' },
];

const FrenchPress = (): JSX.Element => {
  const [quantities, dispatch] = useReducer(
    quantitiesReducer,
    initialQuantities
  );
  const handleQuantitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: quantitiesReducerActions[e.currentTarget.name],
      payload: Number(e.currentTarget.value),
    });
  };

  const initialCoffee = Math.round(
    initialQuantities.water / quantities.concentration
  );

  return (
    <div className="french-press-container">
      <h1>French Press Calculator</h1>
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
            min={initialCoffee}
            max={initialCoffee * 10}
            defaultValue={initialCoffee}
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
          name="concentration"
          title="Concentration"
          options={concentrationOptions}
          selectedValue={String(quantities.concentration)}
          onChange={handleQuantitiesChange}
        />
      </div>
    </div>
  );
};

export default FrenchPress;
