// Setup
window.focus;
let myCanvas = document.getElementById("myCanvas");
let c = myCanvas.getContext("2d");

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;
const mario1 = document.getElementById("mario");
let marioImage = mario1;
const mario3 = document.getElementById("jump3");
const jump1 = document.getElementById("jump1");
let luigiImage = document.getElementById("luigi");
let rocketImage = document.getElementById("rocket");
let turtleImage = document.getElementById("turtle");
let platformNormal = document.getElementById("platformNormal");
let pipeImage = document.getElementById("pipeimg");

const GRAVITY = 10;

let mario = {
  width: 70,
  height: 70,
  x: 0,
  y: 0,
  dx: 8,
  dy: 100,
  lives: 1,
  score: 0,
  dead: false,
  cooldown: 0,
  jumpFrame: 0,

  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  velocity: 0,
};

let luigi = {
  width: 0,
  height: 0,
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
  constructor({ x, y, width, height, type, image }) {
    this.position = {
      x,
      y,
    };

    this.width = width;
    this.height = height;
    this.type = type;
    this.image = image;
  }
  draw() {
    c.fillStyle = this.color;
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Rocket {
  constructor({ x, y, width, height }) {
    this.position = {
      x,
      y,
    };

    this.velocity = Math.random() * 6 + 3;

    (this.width = width), (this.height = height);
  }

  draw() {
    c.fillStyle = "red";
    c.drawImage(
      rocketImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x -= this.velocity;

    if (this.position.x < 0) {
      this.position.x = this.width + innerWidth;
      this.position.y = Math.random() * innerHeight - 100;
    }
  }
}

let lastRocketTime = 0;
let rocketFrequency = 0;

function updateRockets() {
  let time = Date.now();
  let dt = time - lastRocketTime;
  let numRockets = Math.floor(dt * rocketFrequency) / 1000;

  for (let i = 0; i < numRockets; i++) {
    let rocketY = Math.random() * innerHeight;
    let rocket = new Rocket({
      x: innerWidth,
      y: rocketY,
      width: 50,
      height: 40,
    });
    rockets.push(rocket);
  }

  lastRocketTime = time;
}

class Turtle {
  constructor({ x, y, width, height }) {
    this.position = {
      x,
      y,
    };

    this.velocity = Math.random() * 5 + 3;

    (this.width = width), (this.height = height);
  }

  draw() {
    c.fillStyle = "red";
    c.drawImage(
      turtleImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x -= this.velocity;

    if (this.position.x + turtle.width < 0) {
      this.velocity = -this.velocity;
      this.position.y = innerHeight - 60;
    }

    if (this.position.x > innerWidth) {
      this.velocity = -this.velocity;
      this.position.y = innerHeight - 60;
    }
  }
}

function updateTurtles() {
  let time = Date.now();
  let dt = time - lastRocketTime;
  let numTurtle = Math.floor(dt * rocketFrequency) / 1000;

  for (let i = 0; i < numTurtle; i++) {
    let turtleY = innerHeight - 150;
    let turtle = new Turtle({
      x: innerWidth,
      y: turtleY,
      width: 50,
      height: 40,
    });
    turtles.push(turtle);
  }

  lastRocketTime = time;
}

const platforms = [
  new Platform({
    x: 900,
    y: 250,
    width: 100,
    height: 30,
    type: { solid: false, normal: true },
    image: platformNormal,
  }),

  new Platform({
    x: 500,
    y: 400,
    width: 350,
    height: 30,
    type: { pipe: false, normal: true },
    image: platformNormal,
  }),
  new Platform({
    x: 100,
    y: 200,
    width: 300,
    height: 30,
    type: { pipe: false, normal: true },
    image: platformNormal,
  }),
  new Platform({
    x: 1100,
    y: 400,
    width: 100,
    height: 200,
    type: { pipe: true, normal: false },
    image: pipeImage,
  }),
];

const rockets = [
  new Rocket({ x: innerWidth, y: 100, width: 50, height: 40 }),
  new Rocket({ x: innerWidth, y: 300, width: 50, height: 40 }),
];

const turtles = [
  new Turtle({
    x: innerWidth - 150,
    y: innerHeight - 60,
    width: 50,
    height: 40,
  }),
  new Turtle({
    x: innerWidth - 300,
    y: innerHeight - 60,
    width: 50,
    height: 40,
  }),
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
      // console.log("HOPP");
      marioImage = jump1;
      break;
    case "ArrowDown":
      mario.directions.down = true;
      break;
    case "w":
      luigi.directions.up = true;
      break;
    case "s":
      luigi.directions.down = true;
      break;
    case "a":
      luigi.directions.left = true;
      break;
    case "d":
      luigi.directions.right = true;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      mario.directions.left = false;
      break;
    case "ArrowRight":
      mario.directions.right = false;
      break;
    case "ArrowUp":
      if (mario.velocity <= 0) {
        mario.velocity = 1;
      }
      marioImage = mario1;

      break;
    case "ArrowDown":
      mario.directions.down = false;
      break;
    case "w":
      luigi.directions.up = false;
      break;
    case "s":
      luigi.directions.down = false;
      break;
    case "a":
      luigi.directions.left = false;
      break;
    case "d":
      luigi.directions.right = false;
      break;
    default:
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  mario.score += 1;
  // console.log(mario.dead);
  if (mario.dead) {
    c.font = "30px Arial";
    c.fillText("AAAAA", 200, 200);
    // console.log("ded");
    mario.cooldown += 1;
    if (mario.cooldown == 100) {
      mario.dead = false;
      mario.cooldown = 0;
    }
  }

  c.clearRect(0, 0, innerWidth, innerHeight);
  c.drawImage(marioImage, mario.x, mario.y, mario.width, mario.height);
  c.drawImage(luigiImage, luigi.x, luigi.y, luigi.width, luigi.height);
  updateRockets();
  updateTurtles();

  // console.log(platforms.x);
  // console.log(rockets.x);

  c.font = "30px Arial";
  c.fillText(`Marios Score: ${mario.score}`, 10, 50);
  c.fillText(`Luigi Score: ${luigi.score}`, 10, 80);
  c.fillText(`Mario Lifes: ${mario.lives}`, 1000, 50);
  c.fillText(`Luigi Lifes: ${luigi.lives}`, 1000, 80);

  platforms.forEach((platform) => {
    platform.draw();

    if (platform.type.normal) {
      console.log(platform.type);

      if (mario.directions.down == false) {
        if (
          mario.x < platform.position.x + platform.width &&
          mario.x + mario.width > platform.position.x
        ) {
          if (
            mario.y + mario.height >= platform.position.y &&
            mario.y < platform.position.y
          ) {
            mario.y = platform.position.y - mario.height;
          }
        }
      }
    }
    if (platform.type.pipe) {
      if (
        mario.x < platform.position.x + platform.width &&
        mario.x + mario.width > platform.position.x
      ) {
        if (
          mario.y + mario.height >= platform.position.y &&
          mario.y < platform.position.y
        ) {
          mario.y = platform.position.y - mario.height;
        }
      }

      if (mario.x > platform.position.x - platform.width) {
      }

      // om han kickar ner och står åp så tpas han
      if (
        mario.directions.down == true &&
        mario.x < platform.position.x + platform.width &&
        mario.x + mario.width > platform.position.x &&
        mario.y + mario.height >= platform.position.y &&
        mario.y < platform.position.y
      ) {
        mario.x = 0;
      }
    }
  });

  rockets.forEach((rocket) => {
    rocket.update();

    // horisontal kollision
    if (
      mario.x < rocket.position.x + rocket.width &&
      mario.x + mario.width > rocket.position.x &&
      mario.y + mario.height >= rocket.position.y &&
      mario.y < rocket.position.y
    ) {
      mario.dead = true;
      mario.x = 0;
      mario.y = innerHeight / 2;
      mario.score = 0;
      location.reload();
    }
  });

  turtles.forEach((turtle) => {
    turtle.update();

    // horisontal kollision
    // if (
    //   mario.x < turtle.position.x + turtle.width &&
    //   mario.x + mario.width > turtle.position.x &&
    //   mario.y + mario.height >= turtle.position.y &&
    //   mario.y < turtle.position.y
    // ) {
    //   turtles.pop(turtle);
    // }

    if (
      mario.x < turtle.position.x + turtle.width &&
      mario.x + mario.width > turtle.position.x &&
      mario.y + mario.height + 30 >= turtle.position.y &&
      mario.y < turtle.position.y
    ) {
      turtles.pop(turtle);
    }
    if (
      mario.x < turtle.position.x + turtle.width &&
      mario.x + mario.width > turtle.position.x &&
      mario.y + mario.height >= turtle.position.y &&
      mario.y < turtle.position.y
    ) {
      mario.dead = true;
      mario.x = 0;
      mario.y = innerHeight / 2;
      mario.score = 0;
      location.reload();
    }
    if (turtle.position.x <= 0) {
      turtle.velocity = -turtle.velocity;
    }
  });

  if (mario.velocity != 0) {
    if (mario.velocity < 10) {
      marioImage = jump3;
      mario.y -= 50;
      mario.velocity += 3;
    } else if (mario.velocity >= 10 && mario.velocity < 20) {
      mario.y -= 40;
      mario.velocity += 3;
    } else if (mario.velocity >= 20 && mario.velocity < 30) {
      mario.y -= 30;
      mario.velocity += 3;
    } else if (mario.velocity >= 30 && mario.velocity < 40) {
      mario.y -= -10;
      mario.velocity += 3;
    } else if (mario.velocity >= 40 && mario.velocity < 50) {
      mario.y -= -5;
      mario.velocity += 3;
    } else if (mario.velocity >= 50) {
      mario.velocity = 0;
      marioImage = mario1;
    }
  }

  if (mario.y >= myCanvas.height - 150) {
    mario.jumping = false;
    mario.jumpFrame = 0;
  } else {
    mario.y += GRAVITY;
  }

  // Mario gå höger
  if (mario.directions.right) {
    // console.log("x = ", mario.x);
    if (mario.x < myCanvas.width - mario.width) {
      mario.x += mario.dx;
    }
  }

  //mario gå vänster
  if (mario.directions.left) {
    if (mario.x > 0) {
      mario.x -= mario.dx;
    }
  }

  //Luigi vänster
  if (luigi.directions.right) {
    // console.log("x1 =", luigi.x);
    if (luigi.x < myCanvas.width - luigi.width) {
      luigi.x += luigi.dx;
    }
  }
  // Luigi höger
  if (luigi.directions.left) {
    // console.log("x1 = ", luigi.x);
    if (luigi.x > 0) {
      luigi.x -= luigi.dx;
    }
  }
  if (luigi.directions.up) {
    luigi.y -= luigi.dy;
  }
  if (luigi.directions.down) {
    // console.log("y1 =", luigi.y);
    if (luigi.y < 500) {
      luigi.y += luigi.dy;
    }
  }

  if (mario.y + mario.height + 30 < myCanvas.height) {
    mario.y += 12;
  }
  if (luigi.y + luigi.width + 30 < myCanvas.height) {
    luigi.y += 12;
  }

  // console.log(mario.jumping, mario.jumpFrame, `velocity: ${mario.velocity} `);
}

animate();
