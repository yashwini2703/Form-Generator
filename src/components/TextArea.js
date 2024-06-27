import React from 'react';

const TextArea = ({ label, name, value, onChange }) => (
  <div>
    <label>{label}</label>
    <textarea name={name} value={value} onChange={onChange}></textarea>
  </div>
);

export default TextArea;
