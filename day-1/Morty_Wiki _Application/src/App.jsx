import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterDetail from "./pages/CharacterDetail";
import FooterPage from "./pages/FooterPage";
import './App.css'

const App = () => {
  return (
    <div>

      <div className="navBar-container">
        <p className="heading-container">Rick and Morty Wiki</p>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>

      {/*Footer page  */}
      <FooterPage />
    </div>
  );
};

export default App;
