// rollup.config.js

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/utils/urlBuilder.js", // Path to your entry file
  output: {
    file: "public/urlBuilder.js", // Output bundle
    format: "esm", // ES Module format
    sourcemap: true, // Optional: Generates a sourcemap
  },
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS to ES6
    terser(), // Minifies the bundle
  ],
};
