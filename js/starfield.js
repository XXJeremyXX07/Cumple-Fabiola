// Fondo estelar animado para la página principal
const sfCanvas = document.getElementById("starfield");
const sfCtx = sfCanvas.getContext("2d");
let sfW = window.innerWidth;
let sfH = window.innerHeight;
let sfStars = [];
function resizeSF() {
  sfW = window.innerWidth;
  sfH = window.innerHeight;
  sfCanvas.width = sfW;
  sfCanvas.height = sfH;
}
resizeSF();
window.addEventListener('resize', resizeSF);

function SFStar() {
  this.x = Math.random() * sfW;
  this.y = Math.random() * sfH;
  this.radius = Math.random() * 1.2 + 0.5;
  this.speed = Math.random() * 0.07 + 0.04;
  this.alpha = Math.random() * 0.7 + 0.2;
}
SFStar.prototype.draw = function() {
  sfCtx.beginPath();
  sfCtx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  sfCtx.fillStyle = `rgba(255,255,255,${this.alpha})`;
  sfCtx.shadowColor = "#b6aaff";
  sfCtx.shadowBlur = 10;
  sfCtx.fill();
  sfCtx.shadowBlur = 0;
};
SFStar.prototype.move = function() {
  this.x += this.speed;
  if(this.x > sfW) {
    this.x = 0;
    this.y = Math.random() * sfH;
  }
};

function createSFStars(n) {
  sfStars = [];
  for(let i=0;i<n;i++) sfStars.push(new SFStar());
}
function animateSF() {
  sfCtx.clearRect(0,0,sfW,sfH);
  for(let s of sfStars) {
    s.move();
    s.draw();
  }
  requestAnimationFrame(animateSF);
}
createSFStars(190);
animateSF();