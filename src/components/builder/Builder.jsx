// src/components/builder/Builder.jsx
import React, { useState } from 'react';
import SettingsBuilder from './SettingsBuilder';
import WordCloudPreview from './WordCloudPreview';
import WordListBuilder from './WordListBuilder';

const Builder = ({ initialState = {} }) => {
  const [words, setWords] = useState(initialState.words || []);
  const [settings, setSettings] = useState(initialState.settings || {});
  console.log('Builder got initial state: ',initialState)
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Word Cloud Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Column */}
        <div className="flex flex-col lg:col-span-1 h-full">                    
          <div className="flex-grow">
             <details open className="mt-2 mb-2">
              <summary><span className="text-x1 font-bold text-accent">Word List</span></summary>
              <WordListBuilder words={words} setWords={setWords} initialWords={initialState.words}/>
            </details>  
            <SettingsBuilder settings={settings} setSettings={setSettings} 
              initialSettings={initialState.settings}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-2 h-full">
          <WordCloudPreview words={words} settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default Builder;