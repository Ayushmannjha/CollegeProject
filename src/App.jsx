// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EarthScene from "./EarthScene";
import CenterExplosion from "./CentralExplosion";

function App() {
 return (
  <>
    

    <Routes>
      <Route path="/" element={<EarthScene />} />
       <Route path="/Cen" element={<CenterExplosion />} />
    </Routes>
  </>
);

}

export default App;
