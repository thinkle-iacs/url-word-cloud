// src/components/builder/SettingsBuilder.jsx

import React from 'react';
import ColorSettingsBuilder from './ColorSettingsBuilder';

const SettingsBuilder = ({ settings, setSettings }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const updateColorSettings = (colorSettings) => {
    setSettings((prev) => ({ ...prev, ...colorSettings }));
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Settings</h2>
      <div className="mb-4">
        <label className="block mb-1">Font Family:</label>
        <input
          type="text"
          name="fontFamily"
          className="w-full p-2 border rounded"
          value={settings.fontFamily || ''}
          onChange={handleInputChange}
          placeholder="e.g., 'Futura, sans-serif'"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Weight Factor:</label>
        <input
          type="number"
          name="weightFactor"
          className="w-full p-2 border rounded"
          value={settings.weightFactor || ''}
          onChange={handleNumberInputChange}
          placeholder="e.g., 8"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Rotate Ratio:</label>
        <input
          type="number"
          name="rotateRatio"
          className="w-full p-2 border rounded"
          value={settings.rotateRatio || ''}
          onChange={handleNumberInputChange}
          placeholder="e.g., 0.4"
          step="0.1"
          min="0"
          max="1"
        />
      </div>
      <ColorSettingsBuilder settings={settings} updateColorSettings={updateColorSettings} />
    </div>
  );
};

export default SettingsBuilder;