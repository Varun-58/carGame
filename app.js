// logic_of_controlers
const paddle = document.querySelectorAll(".paddle")
const acceleration = document.querySelector(".acc")
const brake = document.querySelector(".br")

paddle.forEach(ele => {
  ele.addEventListener("pointerdown", () => ele.classList.add("pressed"))
  ele.addEventListener("pointerup", () => ele.classList.remove("pressed"))
  ele.addEventListener("pointerleave", () => ele.classList.remove("pressed"))
});

// logic_of_movingElements
const skyMove = document.querySelector(".sky")
const treesMove = document.querySelector(".trees")
const trackMove = document.querySelector(".road")
const wheels = document.querySelectorAll(".wheel")
const frame = document.querySelector(".carFrame")

let pos = 0;
let speed = 0;
let target = 0;
let acc = 0.05;
let wheelSpeed = 0;
let bounceTime = 0;
let dip = 0;
let dipTarget = 0;
let dipAcc = 0.08;
let startGame = false;

const startingSound = new Audio("carStart.wav");
const carSound = new Audio("carSound.mp3");
const carbrake = new Audio("carbrake.wav");
const bgSound = new Audio("bgSound.mp3");

acceleration.addEventListener("pointerdown", () => {
  target = 20;
  treeTargetSpeed = 20;
  cloudTargetSpeed = 5;

  if (!startGame) {
    startingSound.currentTime = 0;
    startingSound.play()
    startGame = true;
  }

  setTimeout(() => {
    carSound.loop = true;
    carSound.volume = 0.5;
    carSound.play()
  }, 800);

  bgSound.play()
  bgSound.loop = true;
  bgSound.volume = 0.5
})
acceleration.addEventListener("pointerup", () => {
  target = 8;
  treeTargetSpeed = 8;
  cloudTargetSpeed = 2;
  carSound.pause()
})
acceleration.addEventListener("pointerup", () => {
  target = 8;
  treeTargetSpeed = 8;
  cloudTargetSpeed = 2;
})
brake.addEventListener("pointerdown", () => {
  target = 0;
  dipTarget = 5;
  treeTargetSpeed = 0;
  cloudTargetSpeed = 0;

  carbrake.currentTime = 0;
  carbrake.play();
})
brake.addEventListener("pointerup", () => {
  target = 2;
  dipTarget = 0;
  treeTargetSpeed = 2;
  cloudTargetSpeed = 0.5;

  carbrake.pause()
})
brake.addEventListener("pointerleave", () => {
  target = 2;
  dipTarget = 0;
  treeTargetSpeed = 2;
  cloudTargetSpeed = 0.5;

  carbrake.pause()
})

function trackControl() {
  speed += (target - speed) * acc;
  pos += speed;
  trackMove.style.backgroundPositionX = -pos + "px";

  wheelSpeed += speed * 5;
  wheels.forEach(wheel => {
    wheel.style.transform = `rotate(${wheelSpeed}deg)`
  })

  bounceTime += speed * 0.02;
  let bounce = Math.sin(bounceTime) * speed * 0.2
  console.log(bounce)
  dip += (dipTarget - dip) * dipAcc;
  frame.style.transform = `translateY(${bounce + dip}px) rotate(${dip * 0.2}deg)`

  requestAnimationFrame(trackControl)
}
trackControl()

// surrounding_move_ani
let treesPos = 0;
let treeSpeed = 0;
let treeTargetSpeed = 0;
let treeAcc = 0.2

let cloudPos = 0;
let cloudSpeed = 0;
let cloudTargetSpeed = 0;
let cloudAcc = 0.1


function surroundings() {
  treeSpeed += (treeTargetSpeed - treeSpeed) * treeAcc;
  treesPos += treeSpeed;
  treesMove.style.backgroundPositionX = -treesPos + "px"

  cloudSpeed += (cloudTargetSpeed - cloudSpeed) * cloudAcc;
  cloudPos += cloudSpeed;
  skyMove.style.backgroundPositionX = -cloudPos + "px"

  requestAnimationFrame(surroundings)
}
surroundings()

//horn_logic
const horn = document.querySelector(".horn img");
const hornSound = new Audio("horn.wav")

horn.addEventListener("click", () => {
  hornSound.currentTime = 0;
  hornSound.play()
  horn.classList.remove("hornPunp")
  horn.offsetWidth;
  horn.classList.add("hornPunp")
})

//display
const start = document.querySelector(".startPage button");
const startPage = document.querySelector(".startPage");
const gameBox = document.querySelector(".container");
const topPage = document.querySelector(".rotateDevice")

start.addEventListener("click", () => {
  start.classList.remove("startBtnPump")
  start.offsetWidth;
  start.classList.add("startBtnPump")

  setTimeout(() => {
    startPage.classList.add("hide")
    gameBox.classList.remove("hide")
  }, 200)
})


document.addEventListener("DOMContentLoaded", () => {
  function rotate() {
    if (window.innerWidth < window.innerHeight) {
      // Portrait
      topPage.classList.remove("hide");
      startPage.classList.add("hide");
      gameBox.classList.add("hide");
    } else {
      // Landscape
      topPage.classList.add("hide");
      startPage.classList.remove("hide");
      gameBox.classList.add("hide");
    }
  }

  rotate();
  window.addEventListener("resize", rotate);

});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
