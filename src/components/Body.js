import { useState } from "react";
import Board from "./Board";
import ToolsPanel from "./ToolsPanel";

const Body = () => {
  const [toolState, setToolState] = useState({
    clear: false,
  });

  return (
    <div className="flex">
      <ToolsPanel toolState={toolState} setToolState={setToolState} />
      <Board
        clear={toolState.clear}
        setClear={() => {
          setToolState({ ...toolState, clear: false });
        }}
      />
    </div>
  );
};

export default Body;
