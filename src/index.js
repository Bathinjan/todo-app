import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //! Strict mode will cause components to run twice (for "debugging") causing undesired behavior in dev env.
  //! If components are rendering twice, remove StrictMode
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
