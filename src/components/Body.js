import React, { useState } from "react";
import ExportButton from "./ExportButton";
import EditIcon from "./EditIcon";
import DrawWindow from "./DrawWindow";
import EditProjectNameModal from "./EditProjectNameModal";

const Body = () => {
  const [toolState, setToolState] = useState({
    clear: false,
    line: false,
    rect: false,
    circle: false,
    freeHand: false,
  });

  const [projectName, setProjectName] = useState("User Project");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const []

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex justify-between items-center bg-gray-200 p-4 shadow-md mx-3 mt-2">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-blue-600">FastDraw</div>
        </div>
        <div className="flex text-lg font-bold text-gray-700">
          {projectName}{" "}
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <EditIcon />
          </button>
        </div>
        <div>
          <ExportButton projectName={projectName} />
        </div>
      </div>

      <DrawWindow toolState={toolState} setToolState={setToolState} />

      <EditProjectNameModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        projectName={projectName}
        setProjectName={(updatedName) => {
          setProjectName(updatedName);
        }}
      />
    </div>
  );
};

export default Body;
