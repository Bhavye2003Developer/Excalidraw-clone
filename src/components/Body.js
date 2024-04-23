import { useEffect, useState } from "react";
import Board from "./Board";
import ToolsPanel from "./ToolsPanel";

const Body = () => {
  const [toolState, setToolState] = useState({
    clear: false,
    line: false, // if true, draw the line on canvas
    rect: false,
    circle: false,
    freeHand: false,
  });

  const [canvasURL, setCanvasURL] = useState(null);

  return (
    <div className="flex">
      <ToolsPanel toolState={toolState} setToolState={setToolState} />
      <Board
        clear={toolState.clear}
        setClear={() => {
          setToolState({ ...toolState, clear: false });
        }}
        line={toolState.line}
        setLine={() => {
          setToolState({ ...toolState, line: false });
        }}
        rect={toolState.rect}
        setRect={() => {
          setToolState({ ...toolState, rect: false });
        }}
        circle={toolState.circle}
        setCircle={() => {
          setToolState({ ...toolState, circle: false });
        }}
        freeHand={toolState.freeHand}
        setFreeHand={() => {
          setToolState({ ...toolState, freeHand: false });
        }}
      />
      {/* <button
        onClick={() => {
          setCanvasURL(document.getElementById("canvas").toDataURL());
        }}
      >
        <a href={canvasURL} download={"user_image"}>
          EXPORT
        </a>
      </button> */}
    </div>
  );
};

export default Body;
