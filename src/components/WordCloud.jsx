import React, { useEffect, useState, useRef } from "react";
import WordCloud from "wordcloud";
import { FiExternalLink, FiHome, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

/**
 * WordCloudComponent - A React component to render a customizable word cloud with flexible color schemes and background options.
 *
 * @param {Object[]} words - Array of words to display in the word cloud, with text and weight properties.
 * @param {string} words[].text - The word to display.
 * @param {number} words[].weight - The weight of the word, influencing its size in the cloud.
 * @param {number[]} [hues=[]] - Array of hue values (0-360) to generate text colors. Ignored if `monochromeHue` or `foregroundHue` is provided.
 * @param {number|null} [foregroundHue=null] - A single hue (0-360) used to generate a text color scheme based on `schemeOffsets`.
 * @param {number[]} [schemeOffsets=[0, -20, 20, 180]] - Offsets (in degrees) applied to `foregroundHue` or `monochromeHue` to generate a color scheme.
 * @param {string} [minWidth="500px"] - Minimum width of the component's container.
 * @param {string|null} [backgroundColor=null] - Explicit background color (e.g., "hsl(200, 30%, 85%)"). Overrides `backgroundHue` and `monochromeHue` if provided.
 * @param {number|null} [backgroundHue=null] - Hue (0-360) to generate the background color. Used only if `backgroundColor` is not provided.
 * @param {boolean} [darkMode=true] - Whether to use a dark or light background when `backgroundHue` or `monochromeHue` is used.
 * @param {number|null} [monochromeHue=null] - A single hue (0-360) used for both the text and background color schemes.
 * @param {string} [fontFamily="Futura, sans-serif"] - Font family to use for the words in the word cloud.
 * @param {number} [weightFactor=8] - A scaling factor that determines the size of the words based on their weight.
 * @param {number} [rotateRatio=0.4] - The ratio of words that should be rotated in the cloud. Value between 0 (no rotation) and 1 (all rotated).
 *
 * @example
 * // Basic usage with words array
 * <WordCloudComponent
 *   words={[
 *     { text: "React", weight: 10 },
 *     { text: "JavaScript", weight: 8 },
 *     { text: "CSS", weight: 5 }
 *   ]}
 * />
 *
 * @example
 * // Using a monochrome color scheme
 * <WordCloudComponent
 *   words={words}
 *   monochromeHue={200} // Blue theme
 *   darkMode={false} // Light background
 * />
 *
 * @example
 * // Custom hues for text
 * <WordCloudComponent
 *   words={words}
 *   hues={[0, 30, 60]} // Red, Orange, Yellow
 *   backgroundHue={50} // Light Yellow background
 * />
 *
 * @example
 * // Fully custom background and text
 * <WordCloudComponent
 *   words={words}
 *   backgroundColor="rgb(34, 34, 34)" // Dark gray background
 *   hues={[0, 120, 240]} // Red, Green, Blue text
 * />
 *
 * @returns {JSX.Element} - The word cloud component.
 */
const WordCloudComponent = ({
  words,
  hues = [],
  foregroundHue = null,
  schemeOffsets = [0,-5,5],
  minWidth = "500px",
  backgroundColor = null,
  foregroundColor = null,
  backgroundHue = null,
  darkMode = false,
  monochromeHue = null,
  fontFamily = "Futura, sans-serif",
  weightFactor = 8,
  rotateRatio = 0.4,
  backgroundSaturation = 30,
  foregroundSaturation = 70
}) => {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  const canvasRef = useRef(null);

  // Determine the effective background color
  const resolvedBackgroundColor = (() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    const hue = monochromeHue ?? backgroundHue ?? 220; // Default hue if none provided
    const lightness = darkMode ? 15 : 85; // Dark or light background
    return `hsl(${hue}, ${backgroundSaturation}%, ${lightness}%)`;
  })();

  // Determine text hues
  const resolvedHues = (() => {
    if (monochromeHue !== null) {
      // Use a monochrome scheme with offsets
      return schemeOffsets.map((offset) => (monochromeHue + offset) % 360);
    }
    if (foregroundHue !== null) {
      // Use a foregroundHue scheme with offsets
      return schemeOffsets.map((offset) => (foregroundHue + offset) % 360);
    }
    // Use provided hues
    if (!hues.length) {
      hues = [220]
    }
    return hues;
  })();

  // Dynamically set `--background-color` in :root
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", resolvedBackgroundColor);
    document.documentElement.style.setProperty("--color", generateColors()[0]);
    return () => {
      document.documentElement.style.removeProperty("--background-color");
      document.documentElement.style.removeProperty("--color");
      
    };
  }, [resolvedBackgroundColor, foregroundColor, darkMode, resolvedHues]);

  const generateColors = () => {
    return words.map((w,i) => {
      const hue = resolvedHues[i % resolvedHues.length];
      const lightness = darkMode ? 70 + Math.random() * 20 : 20 + Math.random() * 20;
      return `hsl(${hue}, ${Math.round(foregroundSaturation - 10 + Math.random()*20)}%, ${lightness}%)`;
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const wordList = words.map(({ text, weight }) => [text, weight]);
      let colors = generateColors();
      if (foregroundColor) {
        colors = [foregroundColor];
      }

      WordCloud(canvasRef.current, {
        list: wordList,
        gridSize: Math.round(16 * window.devicePixelRatio),
        weightFactor,
        fontFamily,
        color: (word, weight, fontSize, distance, theta) => colors[Math.floor(Math.random() * colors.length)],
        backgroundColor: resolvedBackgroundColor,
        rotateRatio,
      });
    }
  }, [words, resolvedBackgroundColor, resolvedHues, darkMode, fontFamily, weightFactor, rotateRatio, foregroundColor]);

  return (
    <div className="wordcloud-container">      
      <Link to="/" className="home-link"><FiHome/></Link>
      {isInIframe && (<a href="" target="_blank" rel="noopener noreferrer"
      className="corner-link"
      ><FiExternalLink/></a>) || (
        <a className="corner-link" href={`/build/${location.search}`}><FiEdit/></a>
      )}
      <canvas ref={canvasRef} width={1600} height={1600}></canvas>
    </div>
  );
};

export default WordCloudComponent;