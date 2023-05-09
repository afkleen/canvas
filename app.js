// Setup
window.focus;
let myCanvas = document.getElementById("myCanvas");
let c = myCanvas.getContext("2d");

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

let marioImage = document.getElementById("mario");
let luigiImage = document.getElementById("luigi");

const GRAVITY = 10;
const JUMP_VELOCITY = -50;

let mario = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  dx: 5,
  dy: 100,
  lives: 1,
  score: 0,
  jumpFrame: 0,
  jumping: false,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};

let luigi = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  dx: 5,
  dy: 30,
  lives: 1,
  score: 0,
  jumping: false,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};

class Platform {
  constructor({ x, y, width, height }) {
    this.position = {
      x,
      y,
    };

    (this.width = width), (this.height = height);
  }
  draw() {
    c.fillStyle = "limegreen";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Rocket {
  constructor({ x, y, width, height }) {
    this.position = {
      x,
      y,
    };

    this.velocity = Math.random() * -6; // Random velocity between -3 and 3

    (this.width = width), (this.height = height);
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity;
  }
}

const platforms = [
  new Platform({ x: 100, y: 200, width: 100, height: 20 }),
  new Platform({ x: 500, y: 400, width: 300, height: 30 }),
];

const rockets = [
  new Rocket({ x: 50, y: 100, width: 40, height: 40 }),
  new Rocket({ x: 600, y: 300, width: 40, height: 40 }),
];

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      mario.directions.left = true;
      break;
    case "ArrowRight":
      mario.directions.right = true;
      break;
    case "ArrowUp":
      if (!mario.jumping) {
        mario.jumping = true;
        mario.jumpFrame = 0;
      }
      break;
    case "ArrowDown":
      mario.directions.down = true;
      break;
    case "w":
      luigi.directions.up = true;
      break;
    case "s":
      mario.directions.down = true;
      break;
    case "a":
      mario.directions.left = true;
      break;
    case "d":
      mario.directions.right = true

if (
  mario.x < rocket.position.x + rocket.width &&
  mario.x + mario.width > rocket.position.x
) {
  // y led kollisison
  if (
    mario.y + mario.height >= rocket.position.y &&
    mario.y < rocket.position.y + rocket.height
  ) {
    mario.lives--;
    console.log(`Mario hit by rocket! ${mario.lives} lives left.`);
  }
}

if (
  luigi.x < rocket.position.x + rocket.width &&
  luigi.x + luigi.width > rocket.position.x
) {
  // y led kollisison
  if (
    luigi.y + luigi.height >= rocket.position.y &&
    luigi.y < rocket.position.y + rocket.height
  ) {
    luigi.lives--;
    console.log(`Luigi hit by rocket! ${luigi.lives} lives left.`);
  }
}
});

if (mario.jumping) {
mario.jumpFrame++;
if (mario.jumpFrame < 20) {
  mario.y -= mario.dy / 10;
} else if (mario.jumpFrame < 40) {
  mario.y += mario.dy / 10;
} else {
  mario.jumpFrame = 0;
}
}

if (mario.directions.left) {
mario.x -= mario.dx;
}
if (mario.directions.right) {
mario.x += mario.dx;
}

if (!mario.jumping) {
mario.y += GRAVITY;
}

if (luigi.directions.up) {
luigi.y -= luigi.dy / 10;
}
if (luigi.directions.down) {
luigi.y += luigi.dy / 10;
}
if (luigi.directions.left) {
luigi.x -= luigi.dx;
}
if (luigi.directions.right) {
luigi.x += luigi.dx;
}

if (mario.y > innerHeight) {
mario.lives--;
console.log('Mario fell off the screen! ${mario.lives} lives left.');
}

if (luigi.y > innerHeight) {
luigi.lives--;
console.log('Luigi fell off the screen! ${luigi.lives} lives left.');
}


animate();