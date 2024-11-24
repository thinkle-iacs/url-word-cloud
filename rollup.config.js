// rollup.config.js

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/utils/urlBuilder.js", // Path to your entry file
  output: [
    {
      file: "public/urlBuilder.js", // Output bundle
      format: "esm", // ES Module format
      sourcemap: true, // Optional: Generates a sourcemap
    },

    // CommonJS for Node.js or bundlers
    {
      file: "public/urlBuilder.cjs.js",
      format: "cjs",
      sourcemap: true
    },

    // IIFE that attaches `UrlBuilder` to `window`
    {
      file: "public/urlBuilder.iife.js",
      format: "iife",
      name: "UrlBuilder", // Global object name on `window`
      sourcemap: true
    }
  ],
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS to ES6
    terser(), // Minifies the bundle
  ]
};
