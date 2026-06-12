const aquarium = document.getElementById("aquarium");
const aqCtx = aquarium.getContext("2d");

const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");

aquarium.width = window.innerWidth;
aquarium.height = window.innerHeight;

let drawing = false;
const fishes = [];

class Fish {
  constructor(img, name) {
    this.img = img;
    this.name = name;
    this.x = Math.random() * aquarium.width;
    this.y = Math.random() * aquarium.height;
    this.width = 100;
    this.height = 100;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x + this.width > aquarium.width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y + this.height > aquarium.height) {
      this.speedY *= -1;
    }
  }

  draw() {
    aqCtx.drawImage(this.img, this.x, this.y, this.width, this.height);

    aqCtx.font = "20px Arial";
    aqCtx.fillStyle = "black";
    aqCtx.textAlign = "center";
    aqCtx.fillText(this.name, this.x + this.width / 2, this.y - 10);
  }
}

function animate() {
  aqCtx.clearRect(0, 0, aquarium.width, aquarium.height);

  fishes.forEach(fish => {
    fish.update();
    fish.draw();
  });

  requestAnimationFrame(animate);
}

function startDraw(e) {
  drawing = true;
  drawCtx.beginPath();
  drawCtx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;

  drawCtx.lineWidth = 3;
  drawCtx.lineCap = "round";
  drawCtx.lineTo(e.offsetX, e.offsetY);
  drawCtx.stroke();
}

function stopDraw() {
  drawing = false;
}

drawCanvas.addEventListener("mousedown", startDraw);
drawCanvas.addEventListener("mousemove", draw);
drawCanvas.addEventListener("mouseup", stopDraw);

drawCanvas.addEventListener("touchstart", (e) => {
  drawing = true;
  const rect = drawCanvas.getBoundingClientRect();
  drawCtx.beginPath();
  drawCtx.moveTo(
    e.touches[0].clientX - rect.left,
    e.touches[0].clientY - rect.top
  );
});

drawCanvas.addEventListener("touchmove", (e) => {
  if (!drawing) return;
  const rect = drawCanvas.getBoundingClientRect();

  drawCtx.lineWidth = 3;
  drawCtx.lineCap = "round";
  drawCtx.lineTo(
    e.touches[0].clientX - rect.left,
    e.touches[0].clientY - rect.top
  );
  drawCtx.stroke();
});

drawCanvas.addEventListener("touchend", stopDraw);

document.getElementById("clearDrawing").addEventListener("click", () => {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

document.getElementById("finishDrawing").addEventListener("click", () => {
  const img = new Image();
  img.src = drawCanvas.toDataURL("image/png");

  img.onload = () => {
    const name = document.getElementById("fishName").value || "물고기";
    fishes.push(new Fish(img, name));
    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  };
});

animate();
