// src/components/builder/WordCloudPreview.jsx

import React from 'react';
import WordCloudComponent from '../WordCloud';
import { getUrl } from '../../utils/urlBuilder';

const WordCloudPreview = ({ words, settings }) => {
  const url = getUrl(words, settings);
  const { words: _, ...displaySettings } = { ...settings };  
  return (
    <div className="p-4 border rounded">
      <a href={url} target="_blank" rel="noreferrer" className="text-blue-500 underline mb-4 block">
        Open in new tab
      </a>
      <details>
        <summary className="text-sm text-gray-600 mb-2">Code</summary>
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
      </details>
      
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
    </div>
  );
};

export default WordCloudPreview;