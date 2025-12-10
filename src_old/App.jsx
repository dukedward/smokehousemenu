import React, { useState } from "react";
import "./App.css";

const VIEWS = {
  HOME: "home",
  SMALL_PLATES: "small_plates",
  CATERING: "catering",
};

function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [selectedCategory, setSelectedCategory] = useState("");

  const goHome = () => {
    setView(VIEWS.HOME);
    setSelectedCategory("");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const renderHeader = () => (
    <header className="app-header">
      <h1 className="app-title">4 The Fork Of IT</h1>
      {view !== VIEWS.HOME && (
        <button className="back-button" onClick={goHome}>
          ← Home
        </button>
      )}
    </header>
  );

  const renderSelectedCategory = () =>
    selectedCategory && (
      <div className="selected-category">
        <span>Selected:</span>
        <strong>{selectedCategory}</strong>
      </div>
    );

  const renderHome = () => (
    <main className="screen">
      <h2 className="screen-title">Welcome</h2>
      <p className="screen-subtitle">
        Choose a menu to explore our delicious options.
      </p>

      <div className="button-grid">
        <button
          className="nav-card"
          onClick={() => {
            setView(VIEWS.SMALL_PLATES);
            setSelectedCategory("");
          }}
        >
          <h3>Small Plates</h3>
          <p>Great for individual cravings.</p>
        </button>

        <button
          className="nav-card"
          onClick={() => {
            setView(VIEWS.CATERING);
            setSelectedCategory("");
          }}
        >
          <h3>Catering Platters</h3>
          <p>Perfect for groups & events.</p>
        </button>
      </div>
    </main>
  );

  const renderSmallPlates = () => (
    <main className="screen">
      <h2 className="screen-title">Small Plates</h2>
      <p className="screen-subtitle">Tap a category to see what we offer.</p>

      <div className="button-grid">
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("BBQ Entrees")}
        >
          BBQ Entrees
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Fried Entrees")}
        >
          Fried Entrees
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Burgers & Sandwiches")}
        >
          Burgers & Sandwiches
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Sides")}
        >
          Sides
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Beverages")}
        >
          Beverages
        </button>
        <button
          className="menu-button menu-button-special"
          onClick={() => handleCategoryClick("Specials")}
        >
          Specials
        </button>
      </div>

      {renderSelectedCategory()}
    </main>
  );

  const renderCatering = () => (
    <main className="screen">
      <h2 className="screen-title">Catering Platters</h2>
      <p className="screen-subtitle">
        Choose a category for your event platters.
      </p>

      <div className="button-grid">
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Entrees")}
        >
          Entrees
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Sides")}
        >
          Sides
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Hand-crafted Sauces")}
        >
          Hand-crafted Sauces
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Beverages")}
        >
          Beverages
        </button>
        <button
          className="menu-button"
          onClick={() => handleCategoryClick("Breads")}
        >
          Breads
        </button>
        <button
          className="menu-button menu-button-special"
          onClick={() => handleCategoryClick("Specials")}
        >
          Specials
        </button>
      </div>

      {renderSelectedCategory()}
    </main>
  );

  return (
    <div className="app-root">
      {renderHeader()}

      {view === VIEWS.HOME && renderHome()}
      {view === VIEWS.SMALL_PLATES && renderSmallPlates()}
      {view === VIEWS.CATERING && renderCatering()}
    </div>
  );
}

export default App;