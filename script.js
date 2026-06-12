const canvas = document.getElementById("aquarium");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fishes = [];

class Fish {
  constructor(name) {
    this.name = name || "물고기";
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 50;
    this.speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x - this.size, this.y);
    ctx.lineTo(this.x - this.size - 20, this.y - 15);
    ctx.lineTo(this.x - this.size - 20, this.y + 15);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x + 20, this.y - 5, 5, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x + 20, this.y - 5, 2, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.x, this.y - this.size);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let fish of fishes) {
    fish.update();
    fish.draw();
  }

  requestAnimationFrame(animate);
}

document.getElementById("addFish").addEventListener("click", () => {
  const name = document.getElementById("fishName").value;
  fishes.push(new Fish(name));
  document.getElementById("fishName").value = "";
});

canvas.addEventListener("click", (e) => {
  const name = document.getElementById("fishName").value || "물고기";
  const fish = new Fish(name);

  fish.x = e.clientX;
  fish.y = e.clientY;

  fishes.push(fish);
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();

  const name = document.getElementById("fishName").value || "물고기";
  const fish = new Fish(name);

  fish.x = e.touches[0].clientX;
  fish.y = e.touches[0].clientY;

  fishes.push(fish);
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});