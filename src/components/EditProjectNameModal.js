import { useState } from "react";

const EditProjectNameModal = ({
  isOpen,
  onClose,
  projectName,
  setProjectName,
}) => {
  const [name, setName] = useState(projectName);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-lg font-bold">
            Edit project name
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          <label htmlFor="input" className="block text-sm font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="input"
            name="input"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter something..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => {
              setProjectName(name);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectNameModal;
