// Setup
window.focus;
let myCanvas = document.getElementById("myCanvas");
let c = myCanvas.getContext("2d");

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

let marioImage = document.getElementById("mario");
let luigiImage = document.getElementById("luigi");

const GRAVITY = 10;

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

    this.velocity = Math.random() * 6; // Random velocity between -3 and 3

    (this.width = width), (this.height = height);
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity;

    if (this.position.x > innerWidth) {
      this.position.x = this.width; // reset to left edge
      this.position.y = Math.random() * innerHeight; // new random y-coordinate
    }
  }
}

let lastRocketTime = 0;
let rocketFrequency = 0.000000000001; // number of rockets per second

function updateRockets() {
  let time = Date.now();
  let dt = time - lastRocketTime;
  let numRockets = Math.floor(dt * rocketFrequency) / 1000;

  for (let i = 0; i < numRockets; i++) {
    let rocketY = Math.random() * innerHeight;
    let rocket = new Rocket({
      x: innerWidth,
      y: rocketY,
      width: 40,
      height: 40,
    });
    rockets.push(rocket);
  }

  lastRocketTime = time;
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
      mario.jumping = true;
      console.log("HOPP");

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
      mario.directions.right = true;
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
      mario.directions.up = false;

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
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.drawImage(marioImage, mario.x, mario.y, mario.width, mario.height);
  c.drawImage(luigiImage, luigi.x, luigi.y, luigi.width, luigi.height);
  updateRockets();

  console.log(platforms.x);
  console.log(rockets.x);

  platforms.forEach((platform) => {
    platform.draw();

    // horisontal kollision
    if (
      mario.x < platform.position.x + platform.width &&
      mario.x + mario.width > platform.position.x
    ) {
      // y led kollisison
      if (
        mario.y + mario.height >= platform.position.y &&
        mario.y < platform.position.y
      ) {
        // marios position uppe på plattformen

        mario.jumping = false;

        mario.y = platform.position.y - mario.height;
      }
    }
  });

  rockets.forEach((rocket) => {
    rocket.update();

    // // horisontal kollision
    // if (
    //   mario.x < rocket.position.x + rocket.width &&
    //   mario.x + mario.width > rocket.position.x
    // ) {
    //   // y led kollisison
    //   if (
    //     mario.y + mario.height >= rocket.position.y &&
    //     mario.y < rocket.position.y
    //   ) {
    //     // marios position uppe på plattformen

    //     mario.y = rocket.position.y - mario.height;
    //   }
    // }
  });

  if (mario.jumping) {
    if (mario.jumpFrame < 10) {
      mario.y -= 50;
      mario.jumpFrame += 1;
    } else if (mario.jumpFrame >= 10 && mario.jumpFrame < 20) {
      mario.y -= 40;
      mario.jumpFrame += 1;
    } else if (mario.jumpFrame >= 20 && mario.jumpFrame < 30) {
      mario.y -= 30;
      mario.jumpFrame += 1;
    } else if (mario.jumpFrame >= 30) {
      mario.jumpFrame += 1;
    }
  }

  //Hopp

  // if (mario.jumping && mario.jumpFrame < 10) {
  //   mario.y -= 50;
  //   mario.jumpFrame += 1;
  // } else if (
  //   mario.jumping &&
  //   mario.jumpFrame >= 10 &&
  //   mario.jumping &&
  //   mario.jumpFrame < 20
  // ) {
  //   mario.y -= 40;
  //   mario.jumpFrame += 1;
  // } else if (
  //   mario.jumping &&
  //   mario.jumpFrame >= 20 &&
  //   mario.jumping &&
  //   mario.jumpFrame < 30
  // ) {
  //   mario.y -= 30;
  //   mario.jumpFrame += 1;
  // } else if (mario.jumping && mario.jumpFrame >= 30) {
  //   mario.jumpFrame += 1;
  // }

  // Är mario på marken?
  if (mario.y >= myCanvas.height - 150) {
    mario.jumping = false;
    mario.jumpFrame = 0;
  } else {
    mario.y += GRAVITY;
  }

  // Mario gå höger
  if (mario.directions.right) {
    console.log("x = ", mario.x);
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
    console.log("x1 =", luigi.x);
    if (luigi.x < myCanvas.width - luigi.width) {
      luigi.x += luigi.dx;
    }
  }
  // Luigi höger
  if (luigi.directions.left) {
    console.log("x1 = ", luigi.x);
    if (luigi.x > 0) {
      luigi.x -= luigi.dx;
    }
  }
  if (luigi.directions.up) {
    luigi.y -= luigi.dy;
  }
  if (luigi.directions.down) {
    console.log("y1 =", luigi.y);
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

  console.log(mario.jumping, mario.jumpFrame);
}

animate();
