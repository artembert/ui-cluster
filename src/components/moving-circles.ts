const canvasElementId = "canvas-id";

const canvas = document.getElementById(canvasElementId);
if (!canvas) {
  throw new Error("canvas element does not exist");
}
const ctx = canvas.getContext("2d");
const circles = [];
const radius = 20;

//Animation from https://javascript.tutorials24x7.com/blog/how-to-draw-animated-circles-in-html5-canvas
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.radius = radius;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > 400 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 400 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

for (let i = 0; i < 5; i++) {
  const color =
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  const x = Math.random() * (400 - radius * 2) + radius;
  const y = Math.random() * (400 - radius * 2) + radius;

  const dx = (Math.random() - 0.5) * 2;
  const dy = (Math.random() - 0.5) * 2;

  circles.push(new Circle(x, y, dx, dy, radius, color));
}

export const movingCirclesInit: () => void = () => {
  requestAnimationFrame(movingCirclesInit);
  ctx.clearRect(0, 0, 400, 400);

  for (let r = 0; r < 5; r++) {
    circles[r].update();
  }
};

export const movingCirclesSourceConfig: Source = {
  name: "movingCircles",
  elementId: canvasElementId,
};
