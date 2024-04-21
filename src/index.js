import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
