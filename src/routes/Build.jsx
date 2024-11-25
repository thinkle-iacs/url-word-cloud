// src/routes/Build.jsx
import React from 'react';
import Builder from '../components/builder/Builder';
import { parseParams } from '../utils/parseParams';

const Build = () => {
  const params = parseParams(window.location.search);
  console.log('parsed params in Build: ', params);
  const initialState = { settings: params, words: params.words };

  return (
    <div class="container mx-auto bg-background text-foreground">      
      <Builder initialState={initialState} />
    </div>
  );
};

export default Build;