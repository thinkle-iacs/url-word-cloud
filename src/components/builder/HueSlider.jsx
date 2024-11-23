// src/components/builder/HueSlider.jsx

import React from 'react';
import './hueSlider.css'; // Import the CSS for styling

const HueSlider = ({ hue, onChange, darkMode }) => {
  // Generate the gradient background for the preview
  const gradientBackground = () => {
    const saturation = 70; // Average saturation
    const lightnessStart = darkMode ? 90 : 10; // Start lightness
    const lightnessEnd = darkMode ? 50 : 50; // End lightness

    return `linear-gradient(
      to right,
      hsl(${hue}, ${saturation}%, ${lightnessStart}%),
      hsl(${hue}, ${saturation}%, ${lightnessEnd}%)
    )`;
  };

  return (
    <div className="flex flex-grow items-center mb-2">
      {/* Hue Slider */}
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={onChange}
        className="hue-slider flex-grow"
      />
      {/* Hue Value Display */}
      <span className="ml-2 w-12 text-right">{hue}°</span>
      {/* Gradient Preview */}
      <div
        className="w-12 h-6 ml-2 border border-gray-400 rounded"
        style={{
          background: gradientBackground(),
        }}
      ></div>
    </div>
  );
};

export default HueSlider;