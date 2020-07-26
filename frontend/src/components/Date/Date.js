import React, { useEffect } from 'react';

import M from 'materialize-css';
import './style.css';

export default function Date({ periods, onPeriodChange, currentPeriod }) {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (event) => {
    onPeriodChange(event.target.value);
  };

  return (
    <div className="container dateContent">
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
