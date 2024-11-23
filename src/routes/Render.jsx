import React from "react";
import { useLocation } from "react-router-dom";
import WordCloudComponent from "../components/WordCloud";
import { parseParams } from "../utils/parseParams";

const Render = () => {
  const location = useLocation();
  const params = parseParams(location.search);
  console.log('Parsed params: ',params)

  return <WordCloudComponent {...params} />;
};

export default Render;