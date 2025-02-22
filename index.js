const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let squareX = 175;
const squareY = 350;
const squareSize = 50;

let ballX = Math.random() * canvas.width;
let ballY = 0;
const ballRadius = 10;
let score = 0;
let isGameOver = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && squareX > 0) {
    squareX -= 15;
  } else if (
    event.key === "ArrowRight" &&
    squareX < canvas.width - squareSize
  ) {
    squareX += 15;
  } else if (event.key === "Enter" && isGameOver) {
    restartGame();
  }
});

function draw() {
  if (isGameOver) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 120, 200);
    ctx.fillText(`Score: ${score}`, 150, 240);
    ctx.fillText("Press Enter to Restart", 80, 280);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(squareX, squareY, squareSize, squareSize);

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  ballY += 2;

  if (
    ballY + ballRadius > squareY &&
    ballX > squareX &&
    ballX < squareX + squareSize
  ) {
    score++;
    ballY = 0;
    ballX = Math.random() * canvas.width;
  }

  if (ballY > canvas.height) {
    isGameOver = true;
  }

  requestAnimationFrame(draw);
}

function restartGame() {
  squareX = 175;
  ballX = Math.random() * canvas.width;
  ballY = 0;
  score = 0;
  isGameOver = false;
  draw();
}

draw();
