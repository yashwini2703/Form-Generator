import React from 'react';

const RadioButton = ({ label, name, value, options, onChange }) => (
  <div>
    <label>{label}</label>
    {options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={onChange}
        />
        {option}
      </div>
    ))}
  </div>
);

export default RadioButton;
