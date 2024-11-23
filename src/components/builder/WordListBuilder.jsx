// src/components/builder/WordListBuilder.jsx
import React, { useState, useEffect } from 'react';
import { getWordFrequenciesFromSourceText } from '../../utils/urlBuilder';
import { loremIpsum } from 'lorem-ipsum';

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
    const wordEntries = value.split(/\s+/);
    const wordsArray = [];
    for (let i = 0; i < wordEntries.length; i++) {
      const word = wordEntries[i];
      const weight = parseFloat(wordEntries[i + 1]);
      if (!isNaN(weight)) {
        wordsArray.push({ text: word, weight });
        i++;
      } else {
        wordsArray.push({ text: word, weight: 1 });
      }
    }
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
          className="w-full flex-grow p-2 border rounded"
          placeholder="Paste your text here..."
          value={textInput}
          onChange={handleTextInputChange}
        ></textarea>
      ) : (
        <textarea
          className="w-full flex-grow p-2 border rounded"
          placeholder="Enter words and weights, e.g., 'apple 3 banana 2 orange 5'"
          value={manualInput}
          onChange={handleManualInputChange}
        ></textarea>
      )}
    </div>
  );
};

export default WordListBuilder;