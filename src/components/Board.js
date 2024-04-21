import { useEffect, useRef, useState } from "react";

const Board = () => {
  const [canvasContext, setCanvasContext] = useState(null);
  const [startPos, setStartPos] = useState([null, null]);
  const [endPos, setEndPos] = useState([null, null]);
  const [isPathInitiated, setIsPathInitiated] = useState(false);
  const [cursorPos, setCursorPos] = useState([null, null]);
  const canvasRef = useRef();

  useEffect(() => {
    setCanvasContext(canvasRef.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (startPos[0] && startPos[1]) {
      if (canvasContext) {
        canvasContext.fillStyle = "black";
        canvasContext.beginPath();
        canvasContext.moveTo(startPos[0], startPos[1]);
        setIsPathInitiated(true);
        console.log("path initiated...");
      }
    }
  }, [startPos]);

  useEffect(() => {
    if (endPos[0] && endPos[1]) {
      if (canvasContext) {
        setIsPathInitiated(false);
        setCursorPos([null, null]);
        console.log("path terminated");
        canvasContext.lineTo(endPos[0], endPos[1]);
        // make line till x, y
        canvasContext.stroke();
      }
    }
  }, [endPos]);

  const getRelativePointCoordinates = (x, y) => {
    const x0 = canvasRef.current.getBoundingClientRect().left;
    const y0 = canvasRef.current.getBoundingClientRect().top;
    const xNew = x - x0;
    const yNew = y - y0;
    return [xNew, yNew];
  };

  useEffect(() => {
    if (cursorPos[0] && cursorPos[1] && isPathInitiated) {
      console.log("changing");
      // path initiated and cursor moving
      canvasContext.lineTo(cursorPos[0], cursorPos[1]);
      canvasContext.stroke();
    }
  }, [cursorPos]);

  return (
    <div>
      <center>
        <canvas
          id="canvas"
          ref={canvasRef}
          width={600}
          height={300}
          style={{
            backgroundColor: "red",
          }}
          onMouseMove={(e) => {
            setCursorPos(getRelativePointCoordinates(e.clientX, e.clientY));
          }}
          onClick={(e) => {
            if (!isPathInitiated)
              setStartPos(getRelativePointCoordinates(e.clientX, e.clientY));
            else setEndPos(getRelativePointCoordinates(e.clientX, e.clientY));
          }}
          tabIndex={0}
        ></canvas>
      </center>
    </div>
  );
};

export default Board;
