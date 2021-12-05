export interface PieChartItem {
  label: string;
  value: number;
  color: string;
}

const degreeToRadians: (angle: number) => number = (angle) => {
  return (angle * Math.PI) / 180;
};

const getTotal: (data: PieChartItem[]) => number = (data) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].value;
  }

  return sum;
};

const calculateStart: (
  data: PieChartItem[],
  index: number,
  total: number
) => number = (data, index, total) => {
  if (index === 0) {
    return 0;
  }

  return calculateEnd(data, index - 1, total);
};

const calculateEndAngle: (
  data: PieChartItem[],
  index: number,
  total: number
) => number = (data, index, total) => {
  const angle = (data[index].value / total) * 360;
  const inc = index === 0 ? 0 : calculateEndAngle(data, index - 1, total);

  return angle + inc;
};

const calculateEnd: (
  data: PieChartItem[],
  index: number,
  total: number
) => number = (data, index, total) => {
  return degreeToRadians(calculateEndAngle(data, index, total));
};

export const drawPieChart: (
  data: PieChartItem[],
  size?: number
) => HTMLCanvasElement = (data, size = 20) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const total = getTotal(data);

  let startAngle, endAngle;

  for (let i = 0; i < data.length; i++) {
    startAngle = calculateStart(data, i, total);
    endAngle = calculateEnd(data, i, total);

    ctx.beginPath();
    ctx.fillStyle = data[i].color;
    ctx.moveTo(x, y);
    ctx.arc(x, y, y, startAngle, endAngle);
    ctx.fill();
  }

  return canvas;
};
