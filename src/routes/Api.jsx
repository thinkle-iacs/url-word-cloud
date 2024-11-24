import React, { useState } from 'react';

const BASE =
  process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Dynamically set BASE URL


const ApiProps = ({ options, title="API Options", blurb=undefined }) => {
  const [viewMode, setViewMode] = useState('settings'); // 'settings' or 'queryString'

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'settings' ? 'queryString' : 'settings'));
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('settings')}
            className={`px-4 py-2 rounded shadow ${
              viewMode === 'settings'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition`}
          >
            UrlWordCloud Settings
          </button>
          <button
            onClick={() => setViewMode('queryString')}
            className={`px-4 py-2 rounded shadow ${
              viewMode === 'queryString'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition`}
          >
            Query String Parameters
          </button>
        </div>
      </div>
      {blurb && <p className="mb-4">{blurb}</p>}
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Example</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-4 py-2">
                <code>{viewMode === 'settings' ? option.settingsName : option.queryName}</code>
              </td>
              <td className="border border-gray-300 px-4 py-2">{option.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <code>{viewMode === 'settings' ? option.settingsExample : option.queryExample}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



const Api = () => {

  const wordOptions = [
    {
      settingsName: 'words',
      queryName: 'w',
      description: 'A list of word,weight pairs.',
      settingsExample: '[{ text: "Hello", weight: 5 }, { text: "World", weight: 3 }]',
      queryExample: 'Hello,5;World,3',
    },       
  ]
  const formatOptions = [
    {
      settingsName : 'fontFamily',
      queryName: 'ff',
      description: 'Font family for the word cloud.',
      settingsExample: "'Arial'",
      queryExample: 'Arial',
    },
    {
      settingsName : 'weightFactor',
      queryName: 'wf',
      description: 'Scaling factor for word weights.',
      settingsExample: '8',
      queryExample: '8',
    },
    {
      settingsName : 'rotateRatio',
      queryName: 'r',
      description: 'Ratio of words that will rotate.',
      settingsExample: '0.4',
      queryExample: '0.4',
    }
    // add rotation and 
  ]
  const hueOptions = [
     {
      settingsName: 'monochromeHue',
      queryName: 'mh',
      description: 'A single hue value (in degrees, 0–360) for creating a monochromatic color scheme.',
      settingsExample: '180',
      queryExample: '180',
    },
    {
      settingsName: 'foregroundHue',
      queryName: 'sh',
      description: 'A foreground hue value (in degrees, 0–360). Will be used with dark mode or light mode + schemeOffsets (if present) to create text colors.',
      settingsExample: '240',
      queryExample: '240',
    },
    {
      settingsName: 'schemeOffsets',
      queryName: 'so',
      description: 'Offsets (in degrees) for generating a color scheme from the foreground or monochrome hue.',
      settingsExample: '[0, -30, 30]',
      queryExample: '0,-30,30',
    },
    {
      settingsName: 'hues',
      queryName: 'h',
      description: 'An array of hue values (in degrees, 0–360) to specify custom hues for the color scheme.',
      settingsExample: '[7, 48, 240]',
      queryExample: '7,48,240',
    },           
    {
      settingsName: 'backgroundHue',
      queryName: 'bh',
      description: 'A hue value for the background. This pairs with other foreground options (except monochromeHue, which is used for foreground and background).',
      settingsExample: '90',
      queryExample: '90',
    },
  ];
  const colorOptions = [
    {
      settingsName : 'foregroundColor',
      queryName: 'fg',
      description: 'Foreground color for the word cloud.',
      settingsExample: "'#0033a0'",
      queryExample: '%230033a0',
    },
    {
      settingsName : 'backgroundColor',
      queryName: 'bg',
      description: 'Background color for the word cloud.',
      settingsExample: "'#c6093b'",
      queryExample: '%23c6093b',
    },
  ]

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      <p className="mb-4">
        This app generates word clouds based on the query string provided in the URL. You can build query strings
        manually or programmatically and share links directly to render your custom word cloud.
      </p>
      <p className="mb-4">
        Below, you’ll find details on how to use the <strong>UrlBuilder</strong> library or manually construct URLs to
        integrate word clouds into your projects.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Table of Contents</h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          <a href="#overview" className="text-blue-500 underline">
            Overview
          </a>
        </li>
        <li>
          <a href="#using-scripts" className="text-blue-500 underline">
            Using the UrlBuilder Library
          </a>
        </li>
        <li>
          <a href="#word-lists" className="text-blue-500 underline">
            Word Lists
          </a>
        </li>
        <li>
          <a href="#cloud-options" className="text-blue-500 underline">
            Cloud Options
          </a>
        </li>
        <li>
          <a href="#manual-urls" className="text-blue-500 underline">
            Building URLs by Hand
          </a>
        </li>
      </ul>

      <h2 id="overview" className="text-2xl font-semibold mb-4">
        Overview
      </h2>
      <p className="mb-4">
        The word cloud generator uses query strings to customize the appearance and content of your word cloud. By
        embedding the generated URL into your app or linking directly to it, you can easily share and display custom
        word clouds.
      </p>

      <h2 id="using-scripts" className="text-2xl font-semibold mt-6 mb-4">
        Using the UrlBuilder Library
      </h2>
      <p className="mb-4">
        You can integrate the <strong>UrlBuilder</strong> library into your projects to generate URLs programmatically.
        Include the library using one of the following methods:
      </p>
      <h3 className="text-lg font-semibold mt-4">Modern Environments</h3>
      <p className="mb-4">For environments that support ES6 modules:</p>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {`<script type="module">
  import UrlWordCloud from "${BASE}/urlBuilder.js";
  const words = [
    { text: "Hello", weight: 5 },
    { text: "World", weight: 3 }
  ];
  const options = {
    fg: "#0033a0",
    bg: "#c6093b"
  };
  const url = UrlWordCloud.getCondensedUrl(words, options);
  document.querySelector("a").href = url;
</script>`}
      </pre>
      <h3 className="text-lg font-semibold mt-4">Older Environments</h3>
      <p className="mb-4">
        If your environment doesn’t support ES6 modules, use the <code>urlBuilder.iife.js</code> version, which
        attaches a global <code>UrlWordCloud</code> object:
      </p>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {`<script src="${BASE}/urlBuilder.iife.js"></script>
<script>
  const words = [
    { text: "Hello", weight: 5 },
    { text: "World", weight: 3 }
  ];
  const options = {
    fg: "#0033a0",
    bg: "#c6093b"
  };
  const url = UrlWordCloud.getCondensedUrl(words, options);
  console.log("Generated URL:", url);
</script>`}
      </pre>

      <h2 id="word-lists" className="text-2xl font-semibold mt-6 mb-4">
        Word Lists
      </h2>
      <p className="mb-4">
        To generate a word cloud, you need a word list. You can either pass an array of word objects or generate the
        word list from raw text.
      </p>
      <h3 className="text-lg font-semibold mt-4">Direct Word List</h3>
      <p className="mb-4">
        Use an array of objects where each object contains a <code>text</code> and a <code>weight</code> property:
      </p>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {`const words = [
  { text: "Hello", weight: 5 },
  { text: "World", weight: 3 },
];`}
      </pre>
      <h3 className="text-lg font-semibold mt-4">Generating from Text</h3>
      <p className="mb-4">
        You can also generate a word list from text using the{" "}
        <code>getWordFrequenciesFromSourceText</code> method. By default, this method removes stopwords and profanity.
      </p>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {`const text = "Hello world! Hello hello world!";
const options = {
  removeStopwords: true,
  removeBadWords: true,
  language: "en",
};
const wordFrequencies = UrlWordCloud.getWordFrequenciesFromSourceText(text, options);`}
      </pre>

      <h2 id="cloud-options" className="text-2xl font-semibold mt-6 mb-4">
        Cloud Options
      </h2>
      <p className="mb-4">
        If you are using the API, the <strong>settings</strong> object lets you customize the word cloud’s appearance. Below is a list of the
        available settings. If you are building URLs manually, you can use the query string parameters directly.
      </p>
      <p>Below are the available options for the word cloud:</p>      
      <ApiProps options={wordOptions} title="Word List"/>
      <ApiProps options={formatOptions} title="Font, Rotation & Size"/>      
      <ApiProps options={hueOptions} title="Color Schemes"/>
      <p>
      </p>
      <ApiProps options={colorOptions} title="Raw Colors" blurb="The fg/bg are available for very simple color schemes (provide a foreground and a background). 
        They are used as is, whereas the hue based schemes will automatically generate
        a readable color scheme in a light or dark mode."/>
      
    </div>
  );
};

export default Api;