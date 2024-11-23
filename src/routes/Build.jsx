// src/routes/Build.jsx
import React from 'react';
import Builder from '../components/builder/Builder';
import { parseParams } from '../utils/parseParams';

const Build = () => {
  const params = parseParams(window.location.search);
  console.log('parsed params in Build: ', params);
  const initialState = { settings: params, words: params.words };

  return (
    <div>
      <h1>Word Cloud Builder</h1>
      <p>
        Customize your word cloud with ease. Enter your word list, tweak the settings,
        and get a shareable URL or API code to embed it in your projects.
      </p>
      <Builder initialState={initialState} />
    </div>
  );
};

export default Build;