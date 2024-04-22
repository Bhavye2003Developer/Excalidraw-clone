// Board.js
import React, { useEffect, useRef, useState } from "react";

const Board = ({ clear, setClear, line, setLine, rect, setRect }) => {
  const screenDimensions = [window.screen.width, window.screen.height];
  const [canvasContext, setCanvasContext] = useState(null);
  const [startPos, setStartPos] = useState([null, null]); // (x1, y1)
  const [endPos, setEndPos] = useState([null, null]); // (x2, y2)
  const [isPathInitiated, setIsPathInitiated] = useState(false);
  const [cursorPos, setCursorPos] = useState([null, null]);
  const [linesCoordinates, setLinesCoordinates] = useState([]);
  const [rectCoordinates, setRectCoordinates] = useState([]);

  const canvasRef = useRef();

  useEffect(() => {
    setCanvasContext(canvasRef.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (clear) {
      setClear(false);
      setLinesCoordinates([]); // erase everything from board
      canvasContext.clearRect(0, 0, screenDimensions[0], screenDimensions[1]);
      console.log("cleared");
    }
  }, [clear]);

  const initiatePath = () => {
    if (canvasContext) {
      canvasContext.fillStyle = "black";
      canvasContext.beginPath();
      canvasContext.moveTo(startPos[0], startPos[1]);
      setIsPathInitiated(true);
    }
  };

  useEffect(() => {
    if (startPos[0] && startPos[1]) {
      if (line) {
        initiatePath();
        console.log("path initiated for line...");
      }
      if (rect) {
        initiatePath();
        console.log("path initiated for rect...");
      }
    }
  }, [startPos]);

  const endLine = () => {
    console.log(line);
    if (canvasContext) {
      setIsPathInitiated(false);
      setCursorPos([null, null]);
      console.log("path terminated");
      canvasContext.lineTo(endPos[0], endPos[1]);
      canvasContext.stroke();
      setLine();
    }
  };

  useEffect(() => {
    if (endPos[0] && endPos[1]) {
      if (line) endLine();
      if (rect) {
        canvasContext.strokeRect(
          startPos[0],
          startPos[1],
          endPos[0] - startPos[0],
          endPos[1] - startPos[1]
        );

        setIsPathInitiated(false);
        setRect(); // to change of rect to false, as rect is made
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

  const redrawLines = () => {
    for (const lineObj of linesCoordinates) {
      if (lineObj.endTo[0] && lineObj.endTo[1]) {
        canvasContext.beginPath();
        canvasContext.moveTo(lineObj.startFrom[0], lineObj.startFrom[1]);
        canvasContext.lineTo(lineObj.endTo[0], lineObj.endTo[1]);
        canvasContext.stroke();
      }
    }
    console.log("redrawn");
  };

  const redrawRects = () => {
    for (const rectObj of rectCoordinates) {
      if (rectObj.endTo[0] && rectObj.endTo[1]) {
        canvasContext.strokeRect(
          rectObj.startFrom[0],
          rectObj.startFrom[1],
          rectObj.endTo[0] - rectObj.startFrom[0],
          rectObj.endTo[1] - rectObj.startFrom[1]
        );
      }
    }
  };

  const clearCanvas = () => {
    canvasContext.clearRect(0, 0, screenDimensions[0], screenDimensions[1]);
  };

  useEffect(() => {
    if (canvasContext) clearCanvas();
    if (cursorPos[0] && cursorPos[1] && isPathInitiated) {
      if (line) {
        canvasContext.beginPath();
        canvasContext.moveTo(startPos[0], startPos[1]);
        canvasContext.lineTo(cursorPos[0], cursorPos[1]);
        canvasContext.stroke();
      }
      if (rect) {
        canvasContext.strokeRect(
          startPos[0],
          startPos[1],
          cursorPos[0] - startPos[0],
          cursorPos[1] - startPos[1]
        );
      }
    }
    redrawLines();
    redrawRects();
  }, [cursorPos]);

  const constructLine = (e) => {
    console.log("line constructing");
    const relCoordinates = getRelativePointCoordinates(e.clientX, e.clientY); // relative coordinates of the mouse wrt canvas
    if (!isPathInitiated) {
      setStartPos(relCoordinates);
      setLinesCoordinates([
        ...linesCoordinates,
        {
          startFrom: relCoordinates,
          endTo: [null, null],
        },
      ]);
    } else {
      setEndPos(relCoordinates);
      const lastLineCoord = linesCoordinates[linesCoordinates.length - 1];
      const copiedLinesCoordinates = linesCoordinates.slice(
        0,
        linesCoordinates.length - 1
      );
      lastLineCoord.endTo = relCoordinates;
      setLinesCoordinates([...copiedLinesCoordinates, lastLineCoord]);
    }
  };

  const constructRect = (e) => {
    const relCoordinates = getRelativePointCoordinates(e.clientX, e.clientY); // relative coordinates of the mouse wrt canvas
    console.log("rect requested: ", rect);
    if (!isPathInitiated) {
      setStartPos(relCoordinates);
      setRectCoordinates([
        ...rectCoordinates,
        {
          startFrom: relCoordinates,
          endTo: [null, null],
        },
      ]);
    } else {
      setEndPos(relCoordinates);
      const lastRectCoord = rectCoordinates[rectCoordinates.length - 1];
      const copiedRectsCoordinates = rectCoordinates.slice(
        0,
        rectCoordinates.length - 1
      );
      console.log(rectCoordinates);
      lastRectCoord.endTo = relCoordinates;
      setRectCoordinates([...copiedRectsCoordinates, lastRectCoord]);
    }
  };

  return (
    <div
      className={`flex items-center h-screen w-screen ${
        line || rect ? "cursor-crosshair" : "cursor-pointer"
      }`}
    >
      <canvas
        className="bg-white border border-black rounded-xl"
        id="canvas"
        ref={canvasRef}
        width={screenDimensions[0] / 1.3}
        height={screenDimensions[1] / 1.3}
        onMouseMove={(e) => {
          setCursorPos(getRelativePointCoordinates(e.clientX, e.clientY));
        }}
        onClick={(e) => {
          if (line) {
            constructLine(e);
            return;
          }
          if (rect) {
            constructRect(e);
            return;
          }
        }}
        tabIndex={0}
      ></canvas>
    </div>
  );
};

export default Board;
