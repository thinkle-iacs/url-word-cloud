import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import Render from "./routes/Render";
import Build from "./routes/Build";
import Api from "./routes/Api";
import CloudDemo from "./routes/CloudDemo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/r" element={<Render />} />
        <Route path="/build" element={<Build />} />
        <Route path="/api" element={<Api />} />
        <Route path="/cloud" element={<CloudDemo />}/>
      </Routes>
    </Router>
  );
};

export default App;