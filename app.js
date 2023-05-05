
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
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// function Faller(mario) {
//   for (let i = 0; i < Platformlista.length; i++) {
//     const element = array[i];
//     if (
//       mario.y + mario.height == Platformlista[i].varY &&
//       Platformlista[i].varX < mario.x + mario.width &&
//       mario.x < Platformlista[i].varX + Platformlista[i].längdX
//     ) {
//       return true;
//     }
//   }
// }

const platforms = [
  new Platform({ x: 100, y: 200, width: 200, height: 25 }),
  new Platform({ x: 500, y: 400, width: 300, height: 30 }),
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

  console.log(platforms.x);

  // platforms.forEach((platform) => {
  //   platform.draw();
  //   //Kolliderar mario med plattform?

  //   if (
  //     mario.x < platform.x + platform.width &&
  //     mario.x + mario.width > platform.x &&
  //     mario.y < platform.y + platform.height &&
  //     mario.y + mario.height > platform.y
  //   ) {
  //     mario.y -= GRAVITY;
  //   }
  // });

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
        mario.y = platform.position.y - mario.height;
        mario.jumping = false;
      }
    }
  });

  //Hopp
  if (mario.jumping && mario.jumpFrame < 10) {
      for (let i = 0; i < 100; i++) {
            mario.jumpFrame=mario.jumpFra
        
      }
   

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
