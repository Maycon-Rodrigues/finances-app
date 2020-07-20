import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

import PERIODS from '../../helpers/periods';

export default function Date({ periods, onPeriodChange, currentPeriod }) {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (event) => {
    onPeriodChange(event.target.value);
  };

  return (
    <div className="container">
      {/* https://reactjs.org/docs/forms.html#the-select-tag */}
      <select value={currentPeriod} onChange={handlePeriodChange}>
        {periods.map((period) => {
          return (
            <option key={period} value={period}>
              {period}
            </option>
          );
        })}
      </select>
    </div>
  );
}
