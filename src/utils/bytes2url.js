// src/utils/customBase64.js

const URL_SAFE_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * Converts a Uint8Array to a URL-safe custom 6-bit encoded string.
 * @param {Uint8Array} bytes - The binary data to encode.
 * @returns {string} - URL-safe custom 6-bit encoded string.
 */
export const bytes2url = (bytes) => {
  let binaryString = "";

  // Convert each byte to binary and pad to 8 bits
  bytes.forEach((byte) => {
    binaryString += byte.toString(2).padStart(8, "0");
  });

  let urlSafeString = "";
  for (let i = 0; i < binaryString.length; i += 6) {
    const chunk = binaryString.slice(i, i + 6);

    // Convert 6-bit chunks to decimal and map to the custom charset
    const decimalValue = parseInt(chunk.padEnd(6, "0"), 2); // Pad with zeros for the last chunk
    urlSafeString += URL_SAFE_CHARSET[decimalValue];
  }

  return urlSafeString;
};

/**
 * Converts a URL-safe custom 6-bit encoded string back to a Uint8Array.
 * @param {string} urlSafeString - The URL-safe custom 6-bit encoded string.
 * @returns {Uint8Array} - The decoded binary data.
 */
export const url2bytes = (urlSafeString) => {
  let binaryString = "";

  // Convert each character back to its 6-bit binary representation
  for (const char of urlSafeString) {
    const decimalValue = URL_SAFE_CHARSET.indexOf(char);
    if (decimalValue === -1) {
      throw new Error(`Invalid character "${char}" in URL-safe string`);
    }
    binaryString += decimalValue.toString(2).padStart(6, "0");
  }

  const byteArray = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    const chunk = binaryString.slice(i, i + 8);
    if (chunk.length === 8) {
      byteArray.push(parseInt(chunk, 2));
    }
  }

  return new Uint8Array(byteArray);
};
