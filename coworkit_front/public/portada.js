const canvas = document.getElementById("canvas1");
const root = document.getElementById("root");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//Creo el objeto mouse
let mouse = {
  x: null,
  y: null,
  radius: 50,
};
//Meto en el objeto mouse los valores x e y por donde pasa el ratón
window.addEventListener("mousemove", function (e) {
  (mouse.x = e.x + canvas.clientLeft / 2),
    (mouse.y = e.y + canvas.clientTop / 2);
});

function drawImage() {
  //Cojo el tamaño del logo
  let imageWidth = png.width;
  let imageHeight = png.height;

  const data = context.getImageData(0, 0, imageWidth, imageHeight);
  context.clearRect(0, 0, canvas.width, canvas.height);

  //***Posición,color,tamaño de las particulas***
  class Particle {
    constructor(x, y, color, size) {
      (this.x = x + canvas.width / 2 - png.width * 2),
        (this.y = y + canvas.height / 2 - png.height * 2),
        (this.color = color),
        (this.size = 2),
        (this.baseX = x + canvas.width / 2 - png.width * 2),
        (this.baseY = y + canvas.height / 2 - png.height * 2),
        (this.density = Math.random() * 10 + 2);
    }
    //Dibuja utilizando la posición de las partículas
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }
    //Hace que vuelva a la posición original a una velocidad
    update() {
      context.fillStyle = this.color;

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;

      const maxDistance = 10;
      let force = (maxDistance - distance + 100) / maxDistance;
      if (force < 0) force = 0;

      let directionX = forceDirectionX * force * this.density * 0.6;
      let directionY = forceDirectionY * force * this.density * 0.6;
      //Aqui escojo la distancia a la que quiero que cambie de direccion
      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 20;
        }
      }
      //Ejecuto el dibujo
      this.draw();
    }
  }
  //Posicion inicial y cada partícula
  function init() {
    particleArray = [];
    for (let y = 0, y2 = data.height; y < y2; y++) {
      for (let x = 0, x2 = data.width; x < x2; x++) {
        if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
          let positionX = x;
          let positionY = y;
          let color =
            "rgb(" +
            data.data[y * 4 * data.width + x * 4] +
            "," +
            data.data[y * 4 * data.width + x * 4 + 1] +
            "," +
            data.data[y * 4 * data.width + x * 4 + 2] +
            ")";
          particleArray.push(new Particle(positionX * 4, positionY * 4, color));
        }
      }
    }
  }
  //Hace el movimiento para cada particula
  function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = "rgba(255,255,255,0.9)";
    context.fillRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }
  }
  init();
  animate();
  //Si cambio el tamaño de la ventana se actualiza innerWidth y innerHeight
  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });
}
//Aqui almaceno la imagen en base64
const png = new Image();
png.src = `data:image/png;base64,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`;

//Aquí se ejecuta la animación
window.addEventListener("load", (e) => {
  context.drawImage(png, 0, 0);
  drawImage();
});

canvas.addEventListener("click", function () {
  canvas.classList.add("canvas");
  setTimeout(() => {
    root.removeAttribute("hidden");
    canvas.setAttribute("hidden", "");
    return clearTimeout;
  }, 2000);
});

window.addEventListener("scroll", function () {
  canvas.classList.add("canvas");
  setTimeout(() => {
    root.removeAttribute("hidden");
    canvas.setAttribute("hidden", "");
    return clearTimeout;
  }, 2000);
});
