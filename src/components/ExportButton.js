import { useState } from "react";

const ExportButton = ({ projectName }) => {
  const [canvasURL, setCanvasURL] = useState(null);

  return (
    <button
      onClick={() => {
        setCanvasURL(document.getElementById("canvas").toDataURL());
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit mr-5"
    >
      <a href={canvasURL} download={projectName} className="text-center block">
        EXPORT
      </a>
    </button>
  );
};

export default ExportButton;
