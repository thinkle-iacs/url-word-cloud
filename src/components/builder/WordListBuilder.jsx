// src/components/builder/WordListBuilder.jsx
import React, { useState, useEffect } from 'react';
import { getWordFrequenciesFromSourceText, getTitleFrequencies } from '../../utils/urlBuilder';
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

const WordListBuilder = ({ setWords, initialWords }) => {

  const [defaultText] = useState(() => loremIpsum({
    count: 8,
    format: 'plain',
    units: 'paragraphs',
    paragraphLowerBound: 5,
    paragraphUpperBound: 7,
  }));
  let initialManualInput = '';
  let initialMode = 'text';
  if (initialWords && initialWords.length > 0) {
    initialManualInput = initialWords.map((word) => `${word.text} ${word.weight}`).join('\n');
    initialMode = 'manual';
  }

  const [mode, setMode] = useState(initialMode);
  const [textInput, setTextInput] = useState(initialMode === 'manual' ? '' : defaultText);
  const [titleInput, setTitleInput] = useState('');
  const [manualInput, setManualInput] = useState(initialManualInput);

  useEffect(() => {
    if (mode === 'manual') {
      // A shared cloud already has parsed entries. Preserve titles containing
      // numbers or punctuation rather than parsing their display text again.
      setWords(initialWords?.length && manualInput === initialManualInput
        ? initialWords
        : parseWeightedWords(manualInput));
    } else if (mode === 'titles') {
      setWords(getTitleFrequencies(titleInput));
    } else {
      setWords(getWordFrequenciesFromSourceText(textInput));
    }
  }, [mode, textInput, titleInput, manualInput, setWords, initialWords, initialManualInput]);

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
        <label className="mr-4">
          <input
            type="radio"
            value="titles"
            checked={mode === 'titles'}
            onChange={() => setMode('titles')}
          />{' '}
          One title per line
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
      <p id="word-input-help" className="text-sm mb-2">
        {mode === 'titles'
          ? 'Paste one book title or phrase per line. Repeated titles count toward its size. Numbers and punctuation stay part of the title.'
          : mode === 'text'
            ? 'Paste text to count individual words. Use double quotes to keep a phrase together, e.g. "The Hunger Games" (straight or curly quotes).'
            : 'Enter words or phrases followed by a weight, e.g. The Hunger Games 3 Charlotte’s Web 2.'}
      </p>
      {mode === 'titles' ? (
        <textarea
          aria-label="Book titles or phrases"
          aria-describedby="word-input-help"
          className="w-full flex-grow p-2 border rounded bg-shaded text-shaded-text"
          placeholder={'The Hunger Games\nCharlotte’s Web\nThe Hunger Games'}
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        ></textarea>
      ) : mode === 'text' ? (
        <textarea
          className="w-full flex-grow p-2 border rounded bg-shaded text-shaded-text"
          aria-label="Source text"
          aria-describedby="word-input-help"
          placeholder="Paste your text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        ></textarea>
      ) : (
        <textarea
          className="w-full flex-grow p-2 border rounded bg-shaded text-shaded-text"
          aria-label="Words and weights"
          aria-describedby="word-input-help"
          placeholder="Enter words and weights, e.g., 'apple 3 banana 2 orange 5'"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default WordListBuilder;
