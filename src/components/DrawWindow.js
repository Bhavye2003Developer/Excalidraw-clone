import Board from "./Board";
import ToolsPanel from "./ToolsPanel";

const DrawWindow = ({ toolState, setToolState }) => {
  return (
    <div className="flex-grow flex">
      <ToolsPanel toolState={toolState} setToolState={setToolState} />
      <Board
        clear={toolState.clear}
        setClear={() => setToolState({ ...toolState, clear: false })}
        line={toolState.line}
        setLine={() => setToolState({ ...toolState, line: false })}
        rect={toolState.rect}
        setRect={() => setToolState({ ...toolState, rect: false })}
        circle={toolState.circle}
        setCircle={() => setToolState({ ...toolState, circle: false })}
        freeHand={toolState.freeHand}
        setFreeHand={() => setToolState({ ...toolState, freeHand: false })}
      />
    </div>
  );
};

export default DrawWindow;
