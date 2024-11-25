// src/routes/Build.jsx
import React from 'react';
import Builder from '../components/builder/Builder';
import { parseParams } from '../utils/parseParams';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const Build = () => {
  const params = parseParams(window.location.search);
  console.log('parsed params in Build: ', params);
  const initialState = { settings: params, words: params.words };

  return (
    <div class="container mx-auto bg-background text-foreground">    
      <Link to="/" className="home-link"><FiHome/></Link>  
      <Builder initialState={initialState} />
    </div>
  );
};

export default Build;