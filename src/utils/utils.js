export const getRelativePointCoordinates = (x, y, canvasRef) => {
  const x0 = canvasRef.current.getBoundingClientRect().left;
  const y0 = canvasRef.current.getBoundingClientRect().top;
  const xNew = x - x0;
  const yNew = y - y0;
  return [xNew, yNew];
};

export const generateCircleRadii = (x1, y1, x2, y2) => {
  const x_distance = Math.pow(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2),
    1 / 2
  );
  const y_distance = Math.abs(y2 - y1);
  return [x_distance, y_distance];
};
