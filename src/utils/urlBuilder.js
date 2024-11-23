const BASE = "http://localhost:3000"; // Base URL for the tool
import pako from 'pako';

/**
 * Generates word frequencies from an array of words.
 * @param {string[]} wordList - List of words.
 * @returns {Array<{ text: string, weight: number }>} - Array of words with their frequencies.
 */
export function getWordFrequencies(wordList) {
  const frequencies = {};
  wordList.forEach((word) => {
    word = word.toLowerCase();
    frequencies[word] = (frequencies[word] || 0) + 1;
  });

  return Object.entries(frequencies).map(([text, weight]) => ({
    text,
    weight,
  }));
}

/**
 * Generates word frequencies from a block of source text.
 * @param {string} text - Source text.
 * @returns {Array<{ text: string, weight: number }>} - Array of words with their frequencies.
 */
export function getWordFrequenciesFromSourceText(text) {
  const wordList = text.split(/\W+/g).filter(Boolean); // Split by non-word characters, filter empty strings
  return getWordFrequencies(wordList);
}

/**
 * Constructs a verbose URL from word cloud parameters.
 * @param {Array<{ text: string, weight: number }>} words - Array of word objects.
 * @param {object} params - Additional word cloud parameters.
 * @returns {string} - Constructed URL.
 */
export function getUrl(words, params = {}) {
  params = validateParams(params);
  const {
    foregroundColor,
    backgroundColor,
    hues,
    singleHue,
    schemeOffsets,
    minWidth,
    backgroundHue,
    darkMode,
    monochromeHue,
    fontFamily,
    weightFactor,
    rotateRatio,
  } = params;

  const queryParams = [];

  if (foregroundColor)
    queryParams.push(`fg=${encodeURIComponent(foregroundColor)}`);
  if (backgroundColor)
    queryParams.push(`bg=${encodeURIComponent(backgroundColor)}`);
  if (hues) queryParams.push(`h=${encodeURIComponent(hues.join(","))}`);
  if (singleHue) queryParams.push(`sh=${encodeURIComponent(singleHue)}`);
  if (schemeOffsets)
    queryParams.push(`so=${encodeURIComponent(schemeOffsets.join(","))}`);
  if (minWidth) queryParams.push(`mw=${encodeURIComponent(minWidth)}`);
  if (backgroundHue)
    queryParams.push(`bh=${encodeURIComponent(backgroundHue)}`);
  if (darkMode) queryParams.push(`dm=1`);
  if (monochromeHue)
    queryParams.push(`mh=${encodeURIComponent(monochromeHue)}`);
  if (fontFamily) queryParams.push(`ff=${encodeURIComponent(fontFamily)}`);
  if (weightFactor) queryParams.push(`wf=${encodeURIComponent(weightFactor)}`);
  if (rotateRatio) queryParams.push(`r=${encodeURIComponent(rotateRatio)}`);

  const wordParam = words
    .map(
      ({ text, weight }) =>
        `${encodeURIComponent(text)},${encodeURIComponent(weight)}`
    )
    .join(";");
  queryParams.push(`w=${wordParam}`);

  return `${BASE}/r?${queryParams.join("&")}`;
}

/**
 * Constructs a condensed URL by compressing the verbose parameters.
 * @param {Array<{ text: string, weight: number }>} words - Array of word objects.
 * @param {object} params - Additional word cloud parameters.
 * @returns {string} - Constructed compressed URL.
 */
export function getCondensedUrl(words, params = {}) {
  const verboseUrl = getUrl(words, params);
  const queryString = verboseUrl.split("?")[1];

  // Compress the query string using gzip
  const compressed = pako.deflate(queryString, { to: "string" });
  
  // Convert the compressed data to Base64
  const base64Encoded = btoa(
    compressed.split("").map((char) => String.fromCharCode(char)).join("")
  );

  return `${BASE}/r?c=${base64Encoded}`;
}
/**
 * Validates and simplifies conflicting parameters for the word cloud.
 * @param {object} params - Word cloud parameters.
 * @returns {object} - Simplified and validated parameters.
 */
export function validateParams(params = {}) {
  const {
    foregroundColor,
    backgroundColor,
    hues,
    singleHue,
    schemeOffsets,
    backgroundHue,
    monochromeHue,
  } = params;

  const warnings = [];
  const validatedParams = { ...params };

  // Conflict: foregroundColor and hues/singleHue/schemeOffsets
  if (foregroundColor && (hues || singleHue || schemeOffsets)) {
    warnings.push(
      "Conflicting parameters: `foregroundColor` overrides `hues`, `singleHue`, and `schemeOffsets`. Ignoring hues-related parameters."
    );
    delete validatedParams.hues;
    delete validatedParams.singleHue;
    delete validatedParams.schemeOffsets;
  }

  // Conflict: backgroundHue and backgroundColor
  if (backgroundHue && backgroundColor) {
    warnings.push(
      "Conflicting parameters: `backgroundHue` overrides `backgroundColor`. Using `backgroundHue`."
    );
    delete validatedParams.backgroundColor;
  }

  // Conflict: monochromeHue and hues/singleHue
  if (monochromeHue && (hues || singleHue)) {
    warnings.push(
      "Conflicting parameters: `monochromeHue` overrides `hues` and `singleHue`. Using `monochromeHue`."
    );
    delete validatedParams.hues;
    delete validatedParams.singleHue;
  }

  // Display warnings in console
  warnings.forEach((warning) => console.warn(warning));

  return validatedParams;
}
