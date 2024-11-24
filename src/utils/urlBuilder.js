// src/utils/urlBuilder.js

const BASE =
  process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Dynamically set BASE URL
import pako from "pako";
import sw from "stopwords";
import {Filter} from "bad-words";
import { bytes2url } from "./bytes2url";

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
 * Generates word frequencies from a block of source text with options for stopword and profanity filtering.
 * @param {string} text - Source text.
 * @param {object} [options={}] - Options for processing text.
 * @param {string} [options.language='en'] - Language code for stopwords.
 * @param {boolean} [options.removeStopwords=true] - Whether to remove stopwords.
 * @param {boolean} [options.removeBadWords=true] - Whether to remove profane words.
 * @returns {Array<{ text: string, weight: number }>} - Array of words with their frequencies.
 */
export function getWordFrequenciesFromSourceText(text, options = {}) {
  const {
    language = "en",
    removeStopwords = true,
    removeBadWords = true,
  } = options;

  // Tokenize the text into words
  let wordList = text.toLowerCase().split(/\W+/g).filter(Boolean); // Split by non-word characters, filter empty strings

  // Remove stopwords
  if (removeStopwords) {
    const stopwords = sw[language] || sw.english; // Default to English if the specified language is not available
    wordList = wordList.filter((word) => !stopwords.includes(word));
  }

  // Remove profane words
  if (removeBadWords) {
    const filter = new Filter();
    wordList = wordList.filter((word) => !filter.isProfane(word));
  }

  return getWordFrequencies(wordList);
}

/**
 * Normalizes word weights to ensure all words display.
 * @param {Array<{ text: string, weight: number }>} words - Word frequencies.
 * @param {number} [desiredMin=1] - Desired minimum weight.
 * @param {number} [desiredMax=10] - Desired maximum weight.
 * @returns {Array<{ text: string, weight: number }>}
 */
export function normalizeWeights(words, desiredMin = 1, desiredMax = 10) {
  const weights = words.map((word) => word.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);

  if (maxWeight === minWeight) {
    // All weights are the same
    return words.map((word) => ({
      ...word,
      weight: desiredMin,
    }));
  }

  return words.map((word) => ({
    ...word,
    weight:
      ((word.weight - minWeight) / (maxWeight - minWeight)) *
        (desiredMax - desiredMin) +
      desiredMin,
  }));
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
  if (singleHue !== undefined)
    queryParams.push(`sh=${encodeURIComponent(singleHue)}`);
  if (schemeOffsets)
    queryParams.push(`so=${encodeURIComponent(schemeOffsets.join(","))}`);
  if (minWidth) queryParams.push(`mw=${encodeURIComponent(minWidth)}`);
  if (backgroundHue !== undefined)
    queryParams.push(`bh=${encodeURIComponent(backgroundHue)}`);
  if (darkMode) queryParams.push(`dm=1`);
  if (monochromeHue !== undefined)
    queryParams.push(`mh=${encodeURIComponent(monochromeHue)}`);
  if (fontFamily) queryParams.push(`ff=${encodeURIComponent(fontFamily)}`);
  if (weightFactor) queryParams.push(`wf=${encodeURIComponent(weightFactor)}`);
  if (rotateRatio !== undefined)
    queryParams.push(`r=${encodeURIComponent(rotateRatio)}`);

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
  if (!queryString) {
    console.warn("No query string found in the verbose URL.");
    return verboseUrl; // Return the original URL if no query string exists
  }  
  // Compress the query string using gzip
  const compressed = pako.deflateRaw(queryString, { to: "binary" });  
  // Convert the compressed data to Base64    
  const urlSafeBytes = bytes2url(compressed);  
  
  if (urlSafeBytes.length > queryString.length) {
    return verboseUrl; // Return the original URL if the compressed version is larger
  } else {
    console.log('Saved ', queryString.length - urlSafeBytes.length, ' characters by compressing the URL.')
    return `${BASE}/r?c=${urlSafeBytes}`;
  }
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
  if (backgroundHue !== undefined && backgroundColor) {
    warnings.push(
      "Conflicting parameters: `backgroundHue` overrides `backgroundColor`. Using `backgroundHue`."
    );
    delete validatedParams.backgroundColor;
  }

  // Conflict: monochromeHue and hues/singleHue
  if (monochromeHue !== undefined && (hues || singleHue)) {
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

/**
 * Constructs a URL from text input with optional settings.
 * Applies stopword removal and profanity filtering by default.
 * @param {string} text - Input text to generate word cloud.
 * @param {object} settings - Additional word cloud parameters.
 * @param {object} [options={}] - Options to control processing.
 * @param {boolean} [options.removeStopwords=true] - Whether to remove stopwords.
 * @param {boolean} [options.removeBadWords=true] - Whether to remove profane words.
 * @param {string} [options.language='en'] - Language code for stopword removal.
 * @returns {string} - Generated word cloud URL.
 */
export function buildUrlFromText(text, settings = {}, options = {}) {
  // Process text to get word frequencies with filtering
  const wordFrequencies = getWordFrequenciesFromSourceText(text, options);

  // Normalize word weights to ensure visibility
  const normalizedWords = normalizeWeights(wordFrequencies);

  // Generate the URL
  const url = getUrl(normalizedWords, settings);

  return url;
}

const UrlBuilder = {
  getUrl,
  getCondensedUrl,
  validateParams,
  buildUrlFromText,
}
export default UrlBuilder;