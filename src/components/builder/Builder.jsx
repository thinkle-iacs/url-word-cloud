// src/components/builder/Builder.jsx
import React, { useState } from 'react';
import SettingsBuilder from './SettingsBuilder';
import WordCloudPreview from './WordCloudPreview';
import WordListSection from './WordListSection';


const Builder = ({ initialState = {} }) => {
  const [words, setWords] = useState(initialState.words || []);
  const [settings, setSettings] = useState(initialState.settings || {});

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Word Cloud Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Column */}
        <div className="flex flex-col lg:col-span-1 h-full">
          <WordListSection words={words} setWords={setWords} />
          <div className="flex-grow overflow-auto">
            <SettingsBuilder settings={settings} setSettings={setSettings} />
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-2 h-full overflow-auto">
          <WordCloudPreview words={words} settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default Builder;