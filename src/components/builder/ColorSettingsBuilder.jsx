// src/components/builder/ColorSettingsBuilder.jsx

import React, { useEffect, useState } from 'react';
import './hueSlider.css'; // Import CSS for the hue slider
import HueSlider from './HueSlider'; // Import the HueSlider component

const colorSchemes = {
  Monochromatic: [0],
  Complementary: [0, 180],
  Analogous: [-30, 0, 30],
  Triadic: [0, 120, 240],
  Tetradic: [0, 90, 180, 270],
};

const ColorSchemeSelector = ({ hue, selectedScheme, onChange, darkMode }) => {
  const schemes = Object.keys(colorSchemes);

  return (
    <div className="flex flex-wrap">
      {schemes.map((schemeName) => {
        const offsets = colorSchemes[schemeName];
        const colors = offsets.map((offset) => {
          const adjustedHue = (hue + offset + 360) % 360;
          // Generate colors similar to WordCloudComponent
          const saturation = 70; // Average of 60% to 80%
          const lightness = darkMode ? 80 : 30; // Average of respective ranges
          return `hsl(${adjustedHue}, ${saturation}%, ${lightness}%)`;
        });

        return (
          <button
            key={schemeName}
            type="button"
            className={`flex items-center p-1 border rounded m-1 ${
              selectedScheme === schemeName ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => onChange(schemeName)}
          >
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6"
                style={{ backgroundColor: color }}
              ></div>
            ))}
            <span className="ml-2">{schemeName}</span>
          </button>
        );
      })}
    </div>
  );
};

const ColorSettingsBuilder = ({ settings, setSettings }) => {
  const [colorMode, setColorMode] = useState('monochrome'); // Default to "Monochrome"
  const [colorScheme, setColorScheme] = useState('Monochromatic'); // Local state for colorScheme

  useEffect(() => {
    const rootElement = document.documentElement;
    if (settings.darkMode) {
      rootElement.classList.add('dark-mode');
    } else {
      rootElement.classList.remove('dark-mode');
    }
    // Cleanup function
    return () => {
      rootElement.classList.remove('dark-mode');
    };
  }, [settings.darkMode]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]:
        type === 'number' || name.includes('Hue') ? parseInt(value, 10) : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
  };

  const handleColorModeChange = (newColorMode) => {
    setColorMode(newColorMode);
    // Clear conflicting settings
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      // Remove all color-related settings
      delete newSettings.foregroundColor;
      delete newSettings.backgroundColor;
      delete newSettings.monochromeHue;
      delete newSettings.singleHue;
      delete newSettings.hues;
      delete newSettings.schemeOffsets;
      delete newSettings.darkMode;
      delete newSettings.backgroundHue; // Reset background hue

      // Set defaults based on the new color mode
      switch (newColorMode) {
        case 'foregroundBackground':
          newSettings.foregroundColor = '#000000';
          newSettings.backgroundColor = '#FFFFFF';
          break;
        case 'monochrome':
          newSettings.monochromeHue = 0;
          setColorScheme('Monochromatic'); // Set local colorScheme
          newSettings.schemeOffsets = colorSchemes['Monochromatic'];
          newSettings.darkMode = false;
          break;
        case 'hues':
          newSettings.hues = [0]; // Start with one hue slider
          newSettings.backgroundHue = 0;
          break;
        case 'singleHue':
          newSettings.singleHue = 0;
          setColorScheme('Monochromatic'); // Set local colorScheme
          newSettings.schemeOffsets = colorSchemes['Monochromatic'];
          newSettings.backgroundHue = 0;
          newSettings.darkMode = false;
          break;
        default:
          break;
      }
      return newSettings;
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Color Settings</h3>
      <div className="mb-4">
        {[
          { value: 'monochrome', label: 'Monochrome' },
          { value: 'singleHue', label: 'Foreground/Background Hue' },
          { value: 'hues', label: 'Custom Hues' },
          { value: 'foregroundBackground', label: 'Foreground/Background Color' },
        ].map(({ value, label }) => (
          <label key={value} className="mr-4">
            <input
              type="radio"
              value={value}
              checked={colorMode === value}
              onChange={() => handleColorModeChange(value)}
            />{' '}
            {label}
          </label>
        ))}
      </div>
      {colorMode === 'foregroundBackground' && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Foreground Color:</label>
            <input
              type="color"
              name="foregroundColor"
              value={settings.foregroundColor ?? '#000000'}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Background Color:</label>
            <input
              type="color"
              name="backgroundColor"
              value={settings.backgroundColor ?? '#FFFFFF'}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      {(colorMode === 'monochrome' || colorMode === 'singleHue') && (
        <>
          <div className="mb-4">
            <label className="block mb-1">
              {colorMode === 'monochrome' ? 'Monochrome Hue:' : 'Foreground Hue:'}
            </label>
            <HueSlider
              hue={
                colorMode === 'monochrome'
                  ? settings.monochromeHue ?? 0
                  : settings.singleHue ?? 0
              }
              darkMode={settings.darkMode ?? false}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  [colorMode === 'monochrome' ? 'monochromeHue' : 'singleHue']: value,
                }));
              }}
            />
          </div>
          {colorMode === 'singleHue' && (
            <div className="mb-4">
              <label className="block mb-1">Background Hue:</label>
              <HueSlider
                hue={settings.backgroundHue ?? 0}
                darkMode={settings.darkMode ?? false}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    backgroundHue: value,
                  }));
                }}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1">Color Scheme:</label>
            <ColorSchemeSelector
              hue={
                colorMode === 'monochrome'
                  ? settings.monochromeHue ?? 0
                  : settings.singleHue ?? 0
              }
              selectedScheme={colorScheme} // Use local colorScheme state
              onChange={(selectedScheme) => {
                setColorScheme(selectedScheme); // Update local colorScheme
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  schemeOffsets: colorSchemes[selectedScheme],
                }));
              }}
              darkMode={settings.darkMode ?? false}
            />
          </div>
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode ?? false}
                onChange={handleCheckboxChange}
              />{' '}
              Dark Mode
            </label>
          </div>
        </>
      )}
      {colorMode === 'hues' && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Hues:</label>
            {settings.hues && settings.hues.length > 0 ? (
              settings.hues.map((hue, index) => (
                <div key={index} className="flex items-center mb-2">
                  <HueSlider
                    hue={hue ?? 0}
                    darkMode={settings.darkMode ?? false}
                    onChange={(e) => {
                      const newHues = [...settings.hues];
                      newHues[index] = parseInt(e.target.value, 10);
                      setSettings((prevSettings) => ({
                        ...prevSettings,
                        hues: newHues,
                      }));
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => {
                      const newHues = settings.hues.filter((_, i) => i !== index);
                      setSettings((prevSettings) => ({
                        ...prevSettings,
                        hues: newHues,
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No hues selected.</p>
            )}
            <button
              type="button"
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
              onClick={() => {
                const newHues = settings.hues ? [...settings.hues, 0] : [0];
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  hues: newHues,
                }));
              }}
            >
              + Add Hue
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Background Hue:</label>
            <HueSlider
              hue={settings.backgroundHue ?? 0}
              darkMode={settings.darkMode ?? false}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  backgroundHue: value,
                }));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ColorSettingsBuilder;