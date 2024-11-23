// src/components/builder/WordCloudPreview.jsx

import React from 'react';
import WordCloudComponent from '../WordCloud';
import { getUrl } from '../../utils/urlBuilder';

const WordCloudPreview = ({ words, settings }) => {
  const url = getUrl(words, settings);
  const { words: _, ...displaySettings } = { ...settings };
  console.log('Preview building with ',words, settings)
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Preview</h2>
      {words.length > 0 ? (
        <div className="mb-4">
          <div className="w-full aspect-square">
            <iframe src={url} className="w-full h-full"></iframe>
          </div>
        </div>
      ) : (
        <p className="mb-4">No words to display. Please add some words.</p>
      )}
      <div className="mb-4">
        <label className="block font-bold mb-1">Shareable URL:</label>
        <input
          type="text"
          readOnly
          className="w-full p-2 border rounded"
          value={url}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Parameters Object:</label>
        <textarea
          readOnly
          className="w-full p-2 border rounded h-32"
          value={JSON.stringify(displaySettings, null, 2)}
        ></textarea>
      </div>
    </div>
  );
};

export default WordCloudPreview;