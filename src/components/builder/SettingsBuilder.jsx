// src/components/builder/SettingsBuilder.jsx
import React from 'react';
import ColorSettingsBuilder from './ColorSettingsBuilder';

const SettingsBuilder = ({ settings, setSettings, initialSettings }) => {
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="p-4 border rounded h-full overflow-auto">
      <details open>
        <summary className="text-x2 text-accent font-bold mb-2">Layout Settings</summary>
        <div className="mb-4">
          <label className="block mb-1">Font Family:</label>
          <input
            type="text"
            name="fontFamily"
            className="w-full p-2 border rounded bg-shaded text-shaded-text"
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
            className="w-full p-2 border rounded bg-shaded text-shaded-text"
            value={settings.weightFactor || ''}
            onChange={handleInputChange}
            placeholder="e.g., 8"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Rotate Ratio:</label>
          <input
            type="number"
            name="rotateRatio"
            className="w-full p-2 border rounded bg-shaded text-shaded-text"
            value={settings.rotateRatio || ''}
            onChange={handleInputChange}
            placeholder="e.g., 0.4"
            step="0.1"
            min="0"
            max="1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Min Width:</label>
          <input
            type="string"
            name="minWidth"
            className="w-full p-2 border rounded bg-shaded text-shaded-text"
            value={settings.minWidth || ''}
            onChange={handleInputChange}
            placeholder="400px"            
          />
        </div>
      </details>
      <ColorSettingsBuilder 
        initialSettings={initialSettings}
        settings={settings} setSettings={setSettings} />
    </div>
  );
};

export default SettingsBuilder;