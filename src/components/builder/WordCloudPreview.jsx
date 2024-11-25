// src/components/builder/WordCloudPreview.jsx

import React from 'react';
import WordCloudComponent from '../WordCloud';
import { getCondensedUrl, getUrl } from '../../utils/urlBuilder';

const WordCloudPreview = ({ words, settings }) => {
  const verboseUrl = getUrl(words, settings);
  const url = getCondensedUrl(words, settings);
  const { words: _, ...displaySettings } = { ...settings };  
  return (
    <div className="p-4 border rounded">
      <a href={url} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover underline mb-4 block">
        Open in new tab
      </a>
      <details>
        <summary className="text-xl font-bold  text-foreground mb-2">Code</summary>
        
          <details><summary className="text-sm font-bold mb-1">URL Params:</summary>
            <pre>{verboseUrl.slice(0,verboseUrl.indexOf('w='))}w=...</pre>
          </details>
          <details><summary className="text-sm font-bold mb-1">Full Verbose URL:</summary>
            <pre>{verboseUrl}</pre>              
          </details>
          <details><summary className="text-sm font-bold mb-1">Condensed URL:</summary>
            <pre>{url}</pre>  
          </details>                    
        
        <details>
          <summary className="text-md font-bold mb-1">Example Call:</summary>
          <pre>
            UrlBuilder.getCondensedUrl(
              {JSON.stringify(words.slice(0,3), null, 2)},
              {JSON.stringify(displaySettings, null, 2)}
            );
          </pre>
        </details>
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