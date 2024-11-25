// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if necessary
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(220, 15%, 18%)", // Dark gray-blue background
          text: "hsl(220, 70%, 90%)", // Light text for readability
        },
        shaded: {
          DEFAULT: "hsl(220, 15%, 12%)", // Dark gray-blue background
          text: "hsl(220, 70%, 85%)", // Light text for readability
        },
        foreground: {
          DEFAULT: "hsl(220, 70%, 90%)", // Light background
          text: "hsl(220, 15%, 18%)", // Dark text for readability
        },
        primary: {
          DEFAULT: "hsl(220, 90%, 80%)", // Light blue background
          text: "hsl(220, 90%, 20%)", // Dark blue text for contrast
        },
        secondary: {
          DEFAULT: "hsl(240, 40%, 60%)", // Purple background
          text: "hsl(240, 60%, 10%)", // Dark purple text for contrast
        },
        code: {
          DEFAULT: "hsl(240, 10%, 20%)", // Purple background
          text: "hsl(240, 20%, 70%)", // Dark purple text for contrast
        },
        accent: {
          DEFAULT: "hsl(40, 90%, 60%)", // Yellow background
          text: "hsl(40, 90%, 20%)", // Dark yellow text for contrast
        },
        link: {
          DEFAULT: "hsl(200, 80%, 70%)", // Light blue for links
          hover: "hsl(200, 90%, 60%)", // Slightly brighter blue for hover
          dark: "hsl(200, 50%, 40%)", // Darker blue for dark mode (if needed)
        },
      },
    },
  },
  plugins: [],
};
