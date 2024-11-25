// Import the pako library for decompression
import pako from 'pako';
import { url2bytes } from './bytes2url';

// Utility to parse URL parameters
export const parseParams = (search) => {
  const params = new URLSearchParams(search);
  const parsedParams = {};

  if (params.get("c")) {
    // Condensed URL detected
    let condensedRaw = params.get('c');
    
    // Convert URL-safe Base64 back to standard Base64
    
    let bytes = url2bytes(condensedRaw);
        
    try {
      // Decode Base64 to get the compressed binary string                      
      // Decompress the binary data to retrieve the original query string
      const decompressedStr = pako.inflateRaw(bytes, { to: 'string' });
      
      // Recursively parse the decompressed query string
      return parseParams(`?${decompressedStr}`);
    } catch (error) {
      console.error('Decoding or Decompression failed:', error);
      // Optionally, you can decide to return an empty object or handle the error as needed
      return {};
    }
  }

  // Handle verbose URL parameters
  if (params.get("w")) {
    parsedParams.words = params.get("w").split(";").map((pair) => {
      const [word, weight] = pair.split(",");
      return { text: word, weight: parseFloat(weight) };
    });
  }

  if (params.get("h")) {
    parsedParams.hues = params.get("h").split(",").map(Number);
  }

  if (params.get("fh")) {
    parsedParams.foregroundHue = parseInt(params.get("fh"), 10);
  }

  if (params.get("so")) {
    parsedParams.schemeOffsets = params.get("so").split(",").map(Number);
  }

  if (params.get("mw")) {
    parsedParams.minWidth = params.get("mw");
  }

  if (params.get("bg")) {
    parsedParams.backgroundColor = params.get("bg");
  }

  if (params.get("ff")) {
    parsedParams.fontFamily = params.get("ff");
  }

  if (params.get("wf")) {
    parsedParams.weightFactor = parseFloat(params.get("wf"));
  }

  if (params.get("r")) {
    parsedParams.rotateRatio = parseFloat(params.get("r"));
  }

  if (params.get("bh")) {
    parsedParams.backgroundHue = parseInt(params.get("bh"), 10);
  }

  if (params.get("dm")) {
    parsedParams.darkMode = params.get("dm") === "1";
  }

  if (params.get("mh")) {
    parsedParams.monochromeHue = parseInt(params.get("mh"), 10);
  }

  if (params.get("fg")) {
    parsedParams.foregroundColor = params.get("fg");
  }

  if (params.get("fs")) {
    parsedParams.foregroundSaturation = parseFloat(params.get("fs"));
  }

  if (params.get("bs")) {
    parsedParams.backgroundSaturation = parseFloat(params.get("bs"));
  }

  return parsedParams;
};