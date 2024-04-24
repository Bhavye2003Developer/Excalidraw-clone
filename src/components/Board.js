// FastDraw
import React, { useEffect, useRef, useState } from "react";
import {
  generateCircleRadii,
  getRelativePointCoordinates,
} from "../utils/utils";

const Board = ({
  clear,
  setClear,
  line,
  setLine,
  rect,
  setRect,
  circle,
  setCircle,
  freeHand,
  setFreeHand,
}) => {
  const screenDimensions = [window.screen.width, window.screen.height];
  const [canvasContext, setCanvasContext] = useState(null);
  const [startPos, setStartPos] = useState([null, null]); // (x1, y1)
  const [endPos, setEndPos] = useState([null, null]); // (x2, y2)
  const [isPathInitiated, setIsPathInitiated] = useState(false);
  const [cursorPos, setCursorPos] = useState([null, null]);
  const [displayObjects, setDisplayObjects] = useState({
    linesCoordinates: [],
    rectCoordinates: [],
    circleCoordinates: [],
    freeHandCoordinates: [],
  });

  const canvasRef = useRef();

  useEffect(() => {
    setCanvasContext(canvasRef.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (clear) {
      setClear(false);
      // erase everything from board
      setDisplayObjects({
        linesCoordinates: [],
        rectCoordinates: [],
        circleCoordinates: [],
        freeHandCoordinates: [],
      });
      canvasContext.clearRect(0, 0, screenDimensions[0], screenDimensions[1]);
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
      if (circle) {
        initiatePath();
        console.log("path inititaed for circle...");
      }
      if (freeHand) {
        initiatePath();
        console.log("path initiated for freeHand...");
      }
    }
  }, [startPos]);

  useEffect(() => {
    console.log("path terminated");
    if (endPos[0] && endPos[1] && canvasContext) {
      clearCanvas();
      redrawAllObjects();
      setIsPathInitiated(false);
      if (line) {
        canvasContext.lineTo(endPos[0], endPos[1]);
        canvasContext.stroke();
        setCursorPos([null, null]);
        setLine();
      }
      if (rect) {
        canvasContext.strokeRect(
          startPos[0],
          startPos[1],
          endPos[0] - startPos[0],
          endPos[1] - startPos[1]
        );
        setRect(); // to change of rect to false, as rect is made
      }
      if (circle) {
        const x = (startPos[0] + endPos[0]) / 2;
        const y = (startPos[1] + endPos[1]) / 2;
        const [radiusX, radiusY] = generateCircleRadii(...startPos, ...endPos);
        canvasContext.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        canvasContext.stroke();
        setCursorPos([null, null]);
        setCircle();
      }
      if (freeHand) {
        setFreeHand();
      }
    }
  }, [endPos]);

  const redrawLines = () => {
    for (const lineObj of displayObjects.linesCoordinates) {
      if (lineObj.endTo[0] && lineObj.endTo[1]) {
        canvasContext.beginPath();
        canvasContext.moveTo(lineObj.startFrom[0], lineObj.startFrom[1]);
        canvasContext.lineTo(lineObj.endTo[0], lineObj.endTo[1]);
        canvasContext.stroke();
      }
    }
  };

  const redrawRects = () => {
    for (const rectObj of displayObjects.rectCoordinates) {
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

  const redrawCircles = () => {
    for (const circleObj of displayObjects.circleCoordinates) {
      if (circleObj.endTo[0] && circleObj.endTo[1]) {
        const x = (circleObj.startFrom[0] + circleObj.endTo[0]) / 2;
        const y = (circleObj.startFrom[1] + circleObj.endTo[1]) / 2;
        const [radiusX, radiusY] = generateCircleRadii(
          ...circleObj.startFrom,
          ...circleObj.endTo
        );
        canvasContext.beginPath();
        canvasContext.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        canvasContext.stroke();
      }
    }
  };

  const redrawFreeHandLines = () => {
    if (
      displayObjects.freeHandCoordinates &&
      displayObjects.freeHandCoordinates.length > 0
    ) {
      for (const freeHandObj of displayObjects.freeHandCoordinates) {
        const points = freeHandObj.points;
        canvasContext.beginPath();
        canvasContext.moveTo(points[0][0], points[0][1]);
        for (let index = 1; index < points.length; ++index) {
          canvasContext.lineTo(points[index][0], points[index][1]);
          canvasContext.stroke();
        }
      }
    }
  };

  const redrawAllObjects = () => {
    redrawLines();
    redrawRects();
    redrawCircles();
    redrawFreeHandLines();
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
      if (circle) {
        const x = (startPos[0] + cursorPos[0]) / 2;
        const y = (startPos[1] + cursorPos[1]) / 2;
        const [radiusX, radiusY] = generateCircleRadii(
          ...startPos,
          ...cursorPos
        );
        canvasContext.beginPath();
        canvasContext.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        canvasContext.stroke();
      }
      if (freeHand) {
        canvasContext.lineTo(cursorPos[0], cursorPos[1]);
        canvasContext.stroke();
        const points = [
          ...[
            ...displayObjects.freeHandCoordinates[
              displayObjects.freeHandCoordinates.length - 1
            ].points,
          ],
        ];

        const copiedFreeHandArray = displayObjects.freeHandCoordinates.slice(
          0,
          displayObjects.freeHandCoordinates.length - 1
        );
        points.push(cursorPos);
        setDisplayObjects({
          ...displayObjects,
          freeHandCoordinates: [...copiedFreeHandArray, { points }],
        });
      }
    }
    redrawAllObjects();
  }, [cursorPos]);

  const constructLine = (e) => {
    const relCoordinates = getRelativePointCoordinates(
      e.clientX,
      e.clientY,
      canvasRef
    ); // relative coordinates of the mouse wrt canvas
    if (!isPathInitiated) {
      setStartPos(relCoordinates);

      setDisplayObjects({
        ...displayObjects,
        linesCoordinates: [
          ...displayObjects.linesCoordinates,
          {
            startFrom: relCoordinates,
            endTo: [null, null],
          },
        ],
      });
    } else {
      setEndPos(relCoordinates);
      const lastLineCoord =
        displayObjects.linesCoordinates[
          displayObjects.linesCoordinates.length - 1
        ];
      const copiedLinesCoordinates = displayObjects.linesCoordinates.slice(
        0,
        displayObjects.linesCoordinates.length - 1
      );
      lastLineCoord.endTo = relCoordinates;
      setDisplayObjects({
        ...displayObjects,
        linesCoordinates: [...copiedLinesCoordinates, lastLineCoord],
      });
    }
  };

  const constructRect = (e) => {
    const relCoordinates = getRelativePointCoordinates(
      e.clientX,
      e.clientY,
      canvasRef
    ); // relative coordinates of the mouse wrt canvas
    if (!isPathInitiated) {
      setStartPos(relCoordinates);

      setDisplayObjects({
        ...displayObjects,
        rectCoordinates: [
          ...displayObjects.rectCoordinates,
          {
            startFrom: relCoordinates,
            endTo: [null, null],
          },
        ],
      });
    } else {
      setEndPos(relCoordinates);
      const lastRectCoord =
        displayObjects.rectCoordinates[
          displayObjects.rectCoordinates.length - 1
        ];
      const copiedRectsCoordinates = displayObjects.rectCoordinates.slice(
        0,
        displayObjects.rectCoordinates.length - 1
      );
      lastRectCoord.endTo = relCoordinates;
      setDisplayObjects({
        ...displayObjects,
        rectCoordinates: [...copiedRectsCoordinates, lastRectCoord],
      });
    }
  };

  const constructCircle = (e) => {
    const relCoordinates = getRelativePointCoordinates(
      e.clientX,
      e.clientY,
      canvasRef
    ); // relative coordinates of the mouse wrt canvas
    if (!isPathInitiated) {
      setStartPos(relCoordinates);

      setDisplayObjects({
        ...displayObjects,
        circleCoordinates: [
          ...displayObjects.circleCoordinates,
          {
            startFrom: relCoordinates,
            endTo: [null, null],
          },
        ],
      });
    } else {
      setEndPos(relCoordinates);
      const lastCircleCoord =
        displayObjects.circleCoordinates[
          displayObjects.circleCoordinates.length - 1
        ];
      const copiedCirclesCoordinates = displayObjects.circleCoordinates.slice(
        0,
        displayObjects.circleCoordinates.length - 1
      );
      lastCircleCoord.endTo = relCoordinates;
      setDisplayObjects({
        ...displayObjects,
        circleCoordinates: [...copiedCirclesCoordinates, lastCircleCoord],
      });
    }
  };

  const constructFreeHandWriting = (e) => {
    const relCoordinates = getRelativePointCoordinates(
      e.clientX,
      e.clientY,
      canvasRef
    ); // relative coordinates of the mouse wrt canvas
    if (!isPathInitiated) {
      setStartPos(relCoordinates);
      setDisplayObjects({
        ...displayObjects,
        freeHandCoordinates: [
          ...displayObjects.freeHandCoordinates,
          {
            points: [relCoordinates],
          },
        ],
      });
    } else {
      setEndPos(relCoordinates);
    }
  };

  return (
    <div
      className={`flex-grow mt-5 ${
        line || rect || circle ? "cursor-crosshair" : "cursor-default"
      }`}
    >
      <canvas
        className="bg-white border border-black rounded-xl"
        id="canvas"
        ref={canvasRef}
        width={screenDimensions[0] / 1.3}
        height={screenDimensions[1] / 1.5}
        onMouseMove={(e) => {
          setCursorPos(
            getRelativePointCoordinates(e.clientX, e.clientY, canvasRef)
          );
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
          if (circle) {
            constructCircle(e);
            return;
          }
          if (freeHand) {
            constructFreeHandWriting(e);
            return;
          }
        }}
        tabIndex={0}
      ></canvas>
    </div>
  );
};

export default Board;
