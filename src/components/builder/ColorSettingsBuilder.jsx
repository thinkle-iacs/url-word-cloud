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
  // Shadow state -- used to store setting we toggled away from so that
  // if we toggle between modes, we get our old settings back.
  const [cachedSettings, setCachedSettings] = useState({...settings});
  const colorProps = [
    'foregroundColor',
    'backgroundColor',
    'monochromeHue',
    'singleHue',
    'backgroundHue',
    'hues',
    'schemeOffsets',
    'darkMode',
    'colorScheme'
  ]
  useEffect(() => {
    const newCachedSettings = {...cachedSettings};
    let changed = false;
    for (let p of colorProps) {
      if (settings[p] !== undefined) {
        if (settings[p] !== newCachedSettings[p]) {
          changed = true;        
          newCachedSettings[p] = settings[p];
        }
      }
    }
    if (cachedSettings.colorScheme != colorScheme) {
      changed = true;
      newCachedSettings.colorScheme = colorScheme;
    }
    if (changed) {
      console.log('Updating cached settings',newCachedSettings);
      setCachedSettings(newCachedSettings);
    }
  }, [settings, colorScheme]);

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
          newSettings.foregroundColor = cachedSettings.hasOwnProperty('foregroundColor')
  ? cachedSettings.foregroundColor
  : '#FFFFFF';
          newSettings.backgroundColor = cachedSettings.hasOwnProperty('backgroundColor') ? cachedSettings.backgroundColor : '#000000';
          break;
        case 'monochrome':
          newSettings.monochromeHue = cachedSettings.hasOwnProperty('monochromeHue') ? cachedSettings.monochromeHue : 0;                    
          newSettings.schemeOffsets = cachedSettings.hasOwnProperty('schemeOffsets') ? cachedSettings.schemeOffsets : colorSchemes['Monochromatic'];
          newSettings.darkMode = cachedSettings.hasOwnProperty('darkMode') ? cachedSettings.darkMode : false;
          break;
        case 'hues':
          newSettings.hues = cachedSettings.hasOwnProperty('hues') ? cachedSettings.hues : [0]; // Start with one hue slider
          newSettings.backgroundHue = cachedSettings.hasOwnProperty('backgroundHue') ? cachedSettings.backgroundHue : 0;
          break;
        case 'singleHue':
          newSettings.singleHue = cachedSettings.hasOwnProperty('singleHue') ? cachedSettings.singleHue : 0;          
          newSettings.schemeOffsets = cachedSettings.hasOwnProperty('schemeOffsets') ? cachedSettings.schemeOffsets : colorSchemes['Monochromatic'];
          newSettings.backgroundHue = cachedSettings.hasOwnProperty('backgroundHue') ? cachedSettings.backgroundHue : 0;
          newSettings.darkMode = cachedSettings.hasOwnProperty('darkMode') ? cachedSettings.darkMode : false;
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
      {colorMode === 'foregroundBackground' ? (
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
      ) : (    <div className="mb-4">
            <label>
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode ?? false}
                onChange={handleCheckboxChange}
              />{' '}
              Dark Mode
            </label>
          </div>)}
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
      
        </>
      )}
      {colorMode === 'hues' && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Hues:</label>
            {settings.hues && settings.hues.length > 0 ? (
              settings.hues.map((hue, index) => (
                <div key={index} className="flex flex-grow items-center mb-2">
                  <HueSlider
                    name={`hues[${index}]`}
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
                    className="flex-grow mr-2" // Allows the slider to grow and adds right margin
                  />
                  <button
                    type="button"
                    className="text-red-500 text-xl leading-none focus:outline-none"
                    onClick={() => {
                      const newHues = settings.hues.filter((_, i) => i !== index);
                      setSettings((prevSettings) => ({
                        ...prevSettings,
                        hues: newHues,
                      }));
                    }}
                    aria-label="Remove hue"
                  >
                    &times;
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