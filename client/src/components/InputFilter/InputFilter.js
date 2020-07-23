import React from 'react';

import './style.css';
import Button from '../Button/Button';

export default function InputFilter({ onInputChange, currentValue }) {
  const handleChange = (event) => {
    const newValue = event.target.value.toLowerCase();

    onInputChange(newValue);
  };

  return (
    <div className="inputRow">
      <div className="input-field">
        <i className="material-icons prefix active">search</i>
        <label className="active" htmlFor="inputFilter">
          Buscar Lançamento
        </label>
        <input
          autoFocus
          id="inputFilter"
          placeholder="Compras em padaria"
          type="text"
          className="validate"
          value={currentValue}
          onChange={handleChange}
        />
      </div>

      <Button />
    </div>
  );
}
