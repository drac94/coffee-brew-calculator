import React, { ChangeEvent } from 'react';

import './SegmentedPicker.css';

type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  options: Option[];
  name: string;
  selectedValue: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

// TODO add border and animation

const SegmentedPicker = ({
  name,
  onChange,
  options,
  selectedValue,
  title,
}: Props): JSX.Element => {
  return (
    <div className="segmented-picker-container">
      {title && <h3 className="segmented-picker-title">{title}</h3>}
      <div
        className="segmented-picker-options"
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        }}
      >
        {options.map((option, i) => (
          <label className="segmented-picker-option-wrapper" key={i}>
            <input
              name={name}
              type="radio"
              className="segmented-picker-input"
              defaultChecked={option.value === selectedValue}
              onChange={onChange}
              value={option.value}
            />
            <span className="segmented-picker-custom">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SegmentedPicker;
