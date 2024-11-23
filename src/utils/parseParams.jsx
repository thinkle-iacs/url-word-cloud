// Utility to parse URL parameters
export const parseParams = (search) => {
  const params = new URLSearchParams(search);
  const parsedParams = {};

  if (params.get("w")) {
    parsedParams.words = params.get("w").split(";").map((pair) => {
      const [word, weight] = pair.split(",");
      return { text: word, weight: parseFloat(weight) };
    });
  }

  if (params.get("h")) {
    parsedParams.hues = params.get("h").split(",").map(Number);
  }

  if (params.get("sh")) {
    parsedParams.singleHue = parseInt(params.get("sh"), 10);
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

  return parsedParams;
};
