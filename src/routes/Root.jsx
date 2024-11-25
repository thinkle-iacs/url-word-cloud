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
    title: "Monochrome Scheme",
    params: `fh=55&so=0,-5,5&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Dark Mode Monochrome",
    params: `fh=55&so=0&dm=1&w=${generateWordString(exampleWords)}`,
  },
  {
    title : "Triadic Color Scheme",
    params: `so=0%2C120%2C240&mh=225&ff=Futura&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Custom Hues",
    params: `h=5,239,129&w=${generateWordString(exampleWords)}`,
  },
  {
    title: "Thanksgiving",
    params:
      "h=45%2C72%2C3%2C19%2C57%2C33&bh=34&ff=serif&wf=10&r=0.8&w=turkey,38;gravy,7;cranberry,6;table,7;place%20setting,4;cranberry%20sauce,5;potatoes,8;mashed,7;stuffing,9;cornbread,5;green%20beans,6;casserole,5;mac,1;%26,1;cheese,7;yams,8;sweet,1;potatoes,7;pumpkin,1;pie,12;apple,1;pie,8;pecan,1;pie,10;pie,20;rolls,6;bread,5;butter,4;salad,3;dessert,9;appetizers,4;wine,6;cider,5;eggnog,4;coffee,3;tea,2;spices,4;gravy,1;boat,3;family,18;friends,10;togetherness,8;reunion,7;gratitude,7;thankfulness,9;salad,5;mac%20and%20cheese,6;kitchen,4;oven,6;stuffing,12;dressing,8;fixings,7;football,8;Cowboys,4;Lions,6;cheerleaders,7;nap,5;walk,7;turkey%20trot,6",
  },
  {
    title: "Hardcoded Foreground/Background",
    params: `fg=%230033a0&bg=%23c6093b&w=${generateWordString(exampleWords)}`,
  },
];

const Root = () => {
  return (
    <div className="container mx-auto px-6 py-8 bg-background text-foreground min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-primary">
        Welcome to WordCloud Tool
      </h1>
      <p className="text-lg mb-6">
        Create beautiful and customizable word clouds using simple URLs or our
        builder tool. <span className="text-primary font-semibold">
          No data is stored on our servers:
        </span>{" "}
        everything lives in the URL you create.
      </p>
      <p className="mb-4">
        Also available with a simple{" "}
        <Link to="/api" className="text-link hover:text-link-hover underline">
          API
        </Link>{" "}
        for automating word cloud creation.
      </p>
      <p className="mb-6">
        If you'd like to download a word cloud, there are many tools available.
        However, this tool fills the gap for creating and sharing word clouds
        online easily as webpages. It's also great for embedding dynamically
        generated word clouds in applications.
      </p>
      <ul className="space-y-6">
        <li>
          <Link
            to="/build"
            className="block text-lg font-semibold bg-primary text-primary-text px-4 py-2 rounded shadow-lg"
          >
            Build a WordCloud
          </Link>
        </li>       
        <li>
          <Link
            to="/api"
            className="block text-lg font-semibold bg-secondary text-secondary-text px-4 py-2 rounded  shadow-lg"
          >
            API Documentation
          </Link>
        </li>
        <li>
          <span className="font-bold text-accent text-lg">
            Example Word Clouds:
          </span>
          <ul className="ml-6 mt-4 space-y-3 list-disc">
            {examples.map(({ title, params }, index) => (
              <li key={index}>
                <Link
                  to={`/r?${params}`}
                  className="text-link hover:text-link-hover hover:underline"
                >
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