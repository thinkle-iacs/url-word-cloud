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
];

const Root = () => {
  return (
    <div>
      <h1>Welcome to WordCloud Tool</h1>
      <p>
        Create beautiful and customizable word clouds using simple URLs or our
        builder tool. No subscription needed, no data stored on our servers.
        Everything lives in the URL you build and access here.
      </p>
      <ul>
        <li>
          <Link to="/build">Go to Builder</Link>
        </li>
        <li>
          <Link to="/cloud">Word Cloud Demo</Link>
        </li>
        <li>
          <Link to="/api">API Documentation</Link>
        </li>
        <li>
          Example Links:
          <ul>
            {examples.map(({ title, params }, index) => (
              <li key={index}>
                <Link to={`/r?${params}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Root;