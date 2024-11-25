// src/components/builder/WordListBuilder.jsx
import React, { useState, useEffect } from 'react';
import { getWordFrequenciesFromSourceText } from '../../utils/urlBuilder';
import { loremIpsum } from 'lorem-ipsum';

function parseWeightedWords(value) {
  const wordsArray = [];

  // Helper function to process a word and its weight
  const processEntry = (entry) => {
    const trimmedEntry = entry.trim();
    const weightMatch = trimmedEntry.match(/\s(\d+)$/); // Match trailing number preceded by a space
    const weight = weightMatch ? parseFloat(weightMatch[1]) : 1; // Default weight is 1
    const word = weightMatch ? trimmedEntry.replace(/\s\d+$/, '').trim() : trimmedEntry; // Remove weight from word
    if (word) {
      wordsArray.push({ text: word, weight });
    }
  };

  if (/\s\d+/.test(value)) {
    // Rule (1): If there are numbers preceded by whitespace, treat those as weights
    const wordEntries = value.match(/(?:[^\s\d]+(?:\s[^\s\d]+)*)(?:\s\d+)?/g); // Match words followed by optional weights
    wordEntries.forEach((entry) => processEntry(entry));
  } else if (/[,;]/.test(value)) {
    // Rule (2): If there are commas or semicolons, separate on those
    const wordEntries = value.split(/[,;]/);
    wordEntries.forEach((entry) => processEntry(entry));
  } else {
    // Rule (3): If no numbers, commas, or semicolons, split on whitespace
    const wordEntries = value.split(/\s+/);
    wordEntries.forEach((entry) => processEntry(entry));
  }

  return wordsArray;
}

const WordListBuilder = ({ words, setWords, initialWords }) => {

  let defaultText = loremIpsum({
    count: 8,
    format: 'plain',
    units: 'paragraphs',
    paragraphLowerBound: 5,
    paragraphUpperBound: 7,
  });
  let initialManualInput = '';
  let initialMode = 'text';
  if (initialWords && initialWords.length > 0) {
    defaultText = "";
    initialManualInput = initialWords.map((word) => `${word.text} ${word.weight}`).join(' ');
    initialMode = 'manual';
  }

  const [mode, setMode] = useState(initialMode);
  const [textInput, setTextInput] = useState(defaultText);
  const [manualInput, setManualInput] = useState(initialManualInput);

  useEffect(() => {
    if (mode === 'text' && (!words || words.length === 0)) {
      // Initialize with default lorem ipsum text
      const frequencies = getWordFrequenciesFromSourceText(defaultText);
      setWords(frequencies);
    }
  }, [mode, words, setWords, defaultText]);

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    const frequencies = getWordFrequenciesFromSourceText(value);
    setWords(frequencies);
  };

  const handleManualInputChange = (e) => {
    const value = e.target.value;
    setManualInput(value);
    const wordsArray = parseWeightedWords(value);
    setWords(wordsArray);
  };

  return (
    <div className="p-4 border rounded h-full flex flex-col">
      <div className="mb-2">
        <label className="mr-4">
          <input
            type="radio"
            value="text"
            checked={mode === 'text'}
            onChange={() => setMode('text')}            
          />{' '}
          Paste Text
        </label>
        <label>
          <input
            type="radio"
            value="manual"
            checked={mode === 'manual'}
            onChange={() => setMode('manual')}
          />{' '}
          Enter Words and Weights
        </label>
      </div>
      {mode === 'text' ? (
        <textarea
          className="w-full flex-grow p-2 border rounded bg-shaded text-shaded-text"
          placeholder="Paste your text here..."
          value={textInput}
          onChange={handleTextInputChange}
        ></textarea>
      ) : (
        <textarea
          className="w-full flex-grow p-2 border rounded bg-shaded text-shaded-text"
          placeholder="Enter words and weights, e.g., 'apple 3 banana 2 orange 5'"
          value={manualInput}
          onChange={handleManualInputChange}
        ></textarea>
      )}
    </div>
  );
};

export default WordListBuilder;