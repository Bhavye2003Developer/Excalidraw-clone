const ToolsPanel = ({ toolState, setToolState }) => {
  return (
    <div className="flex w-40 mx-5 my-10 bg-gray-100 rounded-xl justify-center py-10">
      <ul>
        <li>
          <button
            className="border border-blue-500 bg-blue-400 py-1 px-2 rounded-xl hover:bg-blue-600"
            onClick={() => {
              setToolState({ ...toolState, clear: true });
            }}
          >
            Clear
          </button>
        </li>
        <br />
        <li>
          <button
            className="border border-blue-500 bg-blue-400 py-1 px-2 rounded-xl hover:bg-blue-600"
            onClick={() => {
              setToolState({ ...toolState, line: true });
            }}
          >
            Line
          </button>
        </li>
        <br />
        <li>
          <button
            className="border border-blue-500 bg-blue-400 py-1 px-2 rounded-xl hover:bg-blue-600"
            onClick={() => {
              setToolState({ ...toolState, rect: true });
            }}
          >
            Rectangle
          </button>
        </li>
        <br />
        <li>
          <button
            className="border border-blue-500 bg-blue-400 py-1 px-2 rounded-xl hover:bg-blue-600"
            onClick={() => {
              setToolState({ ...toolState, circle: true });
            }}
          >
            Circle
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ToolsPanel;
