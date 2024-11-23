import React from "react";

const Api = () => {
  return (
    <div>
      <h1>API Documentation</h1>
      <p>
        Use the following parameters in the query string to generate word clouds:
      </p>
      <ul>
        <li><strong>w</strong>: Words and weights, e.g., `foo,2;bar,3`</li>
        <li><strong>bg</strong>: Background color, e.g., `#0033a0`</li>
        <li><strong>h</strong>: Hues for colors, e.g., `88,168,198`</li>
        {/* Add more parameter explanations */}
      </ul>
    </div>
  );
};

export default Api;