import React from "react";
import { Link } from "react-router-dom";

// Expanded word list
const exampleWords = [
  { text: "Foreground", weight: 30 },
  { text: "Background", weight: 30 },
  { text: "Monochrome", weight: 25 },
  { text: "Colors", weight: 25 },
  { text: "React", weight: 10 },
  { text: "JavaScript", weight: 20 },
  { text: "HTML", weight: 15 },
  { text: "CSS", weight: 18 },
  { text: "Programming", weight: 25 },
  { text: "API", weight: 10 },
  { text: "Cloud", weight: 12 },
  { text: "Frontend", weight: 18 },
  { text: "Backend", weight: 8 },
  { text: "Dynamic", weight: 10 },
  { text: "Design", weight: 15 },
  { text: "Flexibility", weight: 14 },
  { text: "Innovation", weight: 16 },
  { text: "Creativity", weight: 18 },
  { text: "Technology", weight: 17 },
  { text: "Development", weight: 15 },
  { text: "Performance", weight: 10 },
  { text: "Scalable", weight: 9 },
  { text: "Responsive", weight: 12 },
  { text: "Layout", weight: 13 },
  { text: "Interactive", weight: 14 },
  { text: "Graphics", weight: 12 },
  { text: "Rendering", weight: 10 },
  { text: "Shapes", weight: 8 },
  { text: "AspectRatio", weight: 9 },
  { text: "Canvas", weight: 7 },
  { text: "Grid", weight: 5 },
  { text: "Font", weight: 6 },
];

// Utility to generate a word string for the URL
const generateWordString = (words) =>
  words.map(({ text, weight }) => `${text},${weight}`).join(";");

// Predefined example links
const examples = [
  {
    title: "Simple Foreground/Background",
    params: `fg=%230033a0&bg=%23c6093b&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Monochrome Scheme",
    params: `sh=55&so=0,-5,5&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Dark Mode Monochrome",
    params: `sh=55&so=0,-5,5&dm=1&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Custom Hues",
    params: `h=88,100,120&w=${generateWordString(exampleWords)}`,
  },
  {
    title: 'Thanksgiving',
    params: 'h=45%2C72%2C3%2C31%2C57%2C33&bh=34&ff=serif&wf=10&r=0.8&w=turkey,18;gravy,7;cranberry,6;cranberry,1;sauce,5;potatoes,8;mashed,7;stuffing,9;cornbread,5;green,1;beans,6;casserole,5;mac,1;%26,1;cheese,7;yams,8;sweet,1;potatoes,7;pumpkin,1;pie,12;apple,1;pie,8;pecan,1;pie,10;pie,20;rolls,6;bread,5;butter,4;salad,3;dessert,9;appetizers,4;wine,6;cider,5;eggnog,4;coffee,3;tea,2;spices,4;gravy,1;boat,3;family,12;friends,10;togetherness,8;reunion,7;gratitude,7;thankfulness,9;salad,5;macncheese,6;kitchen,4;oven,6;stuffing,12;dressing,8;fixings,7;,1'
  }
];

const Root = () => {
  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-4">Welcome to WordCloud Tool</h1>
  <p className="text-lg mb-6">
    Create beautiful and customizable word clouds using simple URLs or our
    builder tool. No subscription needed, no data stored on our servers.
    Everything lives in the URL you build and access here.
  </p>
  <ul className="space-y-4">
    <li>
      <Link to="/build" className="text-blue-500 hover:underline">
        Go to Builder
      </Link>
    </li>
    <li>
      <Link to="/cloud" className="text-blue-500 hover:underline">
        Word Cloud Demo
      </Link>
    </li>
    <li>
      <Link to="/api" className="text-blue-500 hover:underline">
        API Documentation
      </Link>
    </li>
    <li>
      <span className="font-semibold">Example Links:</span>
      <ul className="ml-4 mt-2 space-y-2 list-disc">
        {examples.map(({ title, params }, index) => (
          <li key={index}>
            <Link to={`/r?${params}`} className="text-blue-500 hover:underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  </ul>
</div>
  );
};

export default Root;