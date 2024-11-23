import React from "react";
import WordCloud from "../components/WordCloud.jsx";

const CloudDemo = () => {
  // Example: Test word list with weights.
const exampleWords = [
    { text: 'React', weight: 12 },
    { text: 'JavaScript', weight: 20 },
    { text: 'HTML', weight: 38 },
    { text: 'CSS', weight: 17 },
    { text: 'Web', weight: 9 },
    { text: 'Cloud', weight: 6 },
    { text: 'Coding', weight: 40 },
    { text: 'Programming', weight: 8 },
    { text: 'OpenAI', weight: 7 },
    { text: 'API', weight: 16 },
    { text: 'Framework', weight: 8 },
    { text: 'Library', weight: 7 },
    { text: 'Frontend', weight: 25 },
    { text: 'Backend', weight: 5 },
    { text: 'NodeJS', weight: 6 },
    { text: 'Express', weight: 5 },
    { text: 'WordCloud', weight: 11 },
    { text: 'SVG', weight: 7 },
    { text: 'Shapes', weight: 9 },
    { text: 'Circle', weight: 8 },
    { text: 'Square', weight: 7 },
    { text: 'Heart', weight: 6 },
    { text: 'AspectRatio', weight: 10 },
    { text: 'Design', weight: 8 },
    { text: 'Colors', weight: 9 },
    { text: 'Style', weight: 7 },
    { text: 'Canvas', weight: 6 },
    { text: 'Grid', weight: 5 },
    { text: 'Rotation', weight: 7 },
    { text: 'Dynamic', weight: 8 },
    { text: 'Layout', weight: 9 },
    { text: 'Font', weight: 6 },
    { text: 'Size', weight: 5 },
    { text: 'Position', weight: 7 },
    { text: 'Responsive', weight: 8 },
    { text: 'Mobile', weight: 7 },
    { text: 'Interactive', weight: 9 },
    { text: 'Scalable', weight: 6 },
    { text: 'Performance', weight: 5 },
    { text: 'Accessibility', weight: 6 },
    { text: 'WebGL', weight: 8 },
    { text: 'Graphics', weight: 7 },
    { text: 'Rendering', weight: 8 },
    { text: 'Flexibility', weight: 7 },
    { text: 'Innovation', weight: 9 },
    { text: 'Creativity', weight: 10 },
    { text: 'Technology', weight: 9 },
    { text: 'Development', weight: 8 },
    { text: 'Engineering', weight: 7 },
];

  return (          
    <WordCloud words={exampleWords} />    
  );
};

export default CloudDemo;
