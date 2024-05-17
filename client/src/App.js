import React from "react";
import Header from "./components/header/Header";
import Pages from "./components/mainpages/Pages";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { DataProvider } from "./GlobalState";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
