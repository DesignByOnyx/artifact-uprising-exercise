import React from "react";
import logo from "./logo.svg";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Artifact Uprising" />
      </header>
      <main>
        <Cart />
      </main>
    </div>
  );
}

export default App;
