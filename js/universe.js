// Universo animado (loader) con efecto de profundidad y movimiento realista
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
let stars = [];
let w = window.innerWidth;
let h = window.innerHeight;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resize();
window.addEventListener('resize', resize);

function Star() {
  this.depth = Math.random() * 0.85 + 0.15;
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.radius = (Math.random() * 1.6 + 0.7) * this.depth * 2.2;
  this.alpha = Math.random() * 0.5 + 0.5;
  this.speed = 0.12 + 1.1 * this.depth;
  this.angle = Math.random() * 2 * Math.PI;
  this.color = this.depth > 0.7 ?
    `rgba(${185 + Math.floor(Math.random()*40)},${185 + Math.floor(Math.random()*40)},255,${this.alpha})` :
    `rgba(200,210,255,${this.alpha * 0.75})`;
}
Star.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = this.color;
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 19 * this.depth;
  ctx.fill();
  ctx.shadowBlur = 0;
};
Star.prototype.move = function() {
  this.angle += 0.002 * (2 - this.depth);
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed * 0.8;
  if (this.x < 0) this.x = w;
  if (this.x > w) this.x = 0;
  if (this.y < 0) this.y = h;
  if (this.y > h) this.y = 0;
};

function createStars(n) {
  stars = [];
  for(let i=0; i<n; i++) stars.push(new Star());
}
function animateUniverse() {
  ctx.clearRect(0,0,w,h);
  stars.sort((a, b) => a.depth - b.depth);
  for(let s of stars) {
    s.move();
    s.draw();
  }
  requestAnimationFrame(animateUniverse);
}
createStars(260);
animateUniverse();