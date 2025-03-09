// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App.jsx";

// ReactDOM.render(<App />, document.getElementById("root"));
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Make sure the path is correct
import "./index.css"; // If you have styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
