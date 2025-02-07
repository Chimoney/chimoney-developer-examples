'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    setBMI(weight / (height * height));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight]);

  const onWeightChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  }, [setWeight]);

  const onHeightChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
    setBMI(weight / (height * height));
  }, [setHeight, height, weight]);

  return useMemo(() => (
    <div>
      <h2>BMI Calculator</h2>
      <div>
        <label htmlFor="weightInput">Weight (kg): </label>
        <input id="weightInput" type="number" value={weight} onChange={onWeightChange} />
      </div>
      <div>
        <label htmlFor="heightInput">Height (m): </label>
        <input id="heightInput" type="number" value={height} onChange={onHeightChange} />
      </div>
      <div>
        <strong>BMI:</strong> {bmi}
      </div>
      <div>
        <button
          onClick={() => setBMI(weight / (height * height))}
          style="color: blue; font-size: 1.25rem"
        >
          Recalculate
        </button>
      </div>
    </div>),
    [weight, height, bmi, onHeightChange, onWeightChange]
  );
};

export default BMICalculator;
