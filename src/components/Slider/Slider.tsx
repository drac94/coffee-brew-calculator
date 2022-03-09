import React, { ChangeEvent, InputHTMLAttributes } from 'react';

import './Slider.css';

type Props = { unit?: string } & InputHTMLAttributes<HTMLInputElement>;

const calculateBackgroundSize = (
  min?: string | number,
  max?: string | number,
  value?: string | number | readonly string[]
) => {
  const numericValue = Number(value);
  const numericMin = Number(min);
  const NumericMax = Number(max);

  return (
    ((numericValue - numericMin) * 100) / (NumericMax - numericMin) + '% 100%'
  );
};

const Slider = ({
  defaultValue,
  onChange,
  max,
  min,
  title,
  unit,
  value,
  ...props
}: Props): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    target.style.backgroundSize = calculateBackgroundSize(
      target.min,
      target.max,
      target.value
    );
    onChange && onChange(e);
  };

  const backgroundSize = calculateBackgroundSize(min, max, value);

  return (
    <div className="slider-container">
      <div className="slider-header">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <div className="slider-input-container">
        <input
          {...props}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          type="range"
          className="slider"
          style={{ backgroundSize }}
        />
      </div>
      <div className="slider-footer">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default Slider;
