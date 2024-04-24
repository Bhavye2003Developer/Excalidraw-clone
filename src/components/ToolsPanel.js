import React from "react";
import CircleIcon from "./CircleIcon";
import EraserIcon from "./EraserIcon";
import FreeHandIcon from "./FreeHandIcon";
import LineIcon from "./LineIcon";
import RectIcon from "./RectIcon";

const ToolsPanel = ({ toolState, setToolState }) => {
  return (
    <div className="flex flex-col items-center w-12 mx-5 my-10 rounded-xl justify-center py-2">
      <button
        className="p-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={() => {
          setToolState({ ...toolState, clear: true });
        }}
      >
        <EraserIcon />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={() => {
          setToolState({ ...toolState, line: true });
        }}
      >
        <LineIcon />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={() => {
          setToolState({ ...toolState, rect: true });
        }}
      >
        <RectIcon />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={() => {
          setToolState({ ...toolState, circle: true });
        }}
      >
        <CircleIcon />
      </button>
      <button
        className="p-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={() => {
          setToolState({ ...toolState, freeHand: true });
        }}
      >
        <FreeHandIcon />
      </button>
    </div>
  );
};

export default ToolsPanel;
