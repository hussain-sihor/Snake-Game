const playBoard = document.querySelector('.play-board');


let foodX , foodY ;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let score = 0;
let gameOver = false;
let setIntervalId;
// -------------------

function changeFoodPosition(){
  foodX = Math.floor(Math.random()*30)+1;
  foodY = Math.floor(Math.random()*30)+1;
}

function changeDirection(e){
  // console.log(e);
  // on any direction key pressed it will have key: 'ArrowDown'
  if(e.key == 'ArrowDown' && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }
  else if(e.key == 'ArrowUp' && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
  else if(e.key == 'ArrowLeft' && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }
  else if(e.key == 'ArrowRight' && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }
  onload();
}
function displayScore(){
  const playScore = document.querySelector('.score');
  playScore.innerHTML = `Score: ${score}`;
}
function displayHighScore(){
  const displayHighScore = document.querySelector('.high-score');

  let HighScore = localStorage.getItem('highscore') || 0;

  if(score>=HighScore){
    displayHighScore.innerHTML = `High Score: ${score}`;
    localStorage.setItem('highscore',score);
  }
  else{
    displayHighScore.innerHTML = `High Score: ${HighScore}`;
  }
}
function handelGameOver(){
  clearInterval(setIntervalId);
  alert("Game Over !! Press OK")
  location.reload();
}

function onload(){
  if(gameOver){return handelGameOver()};

  let newHTML = `<div class="food"style="grid-area:${foodX}/${foodY}"></div>`;
  
  //detecting food collision
  if(snakeX==foodX && snakeY==foodY){
    snakeBody.push([foodX,foodY]);//Incresing the Snakebody
    score++;
    displayScore();
    displayHighScore();
    changeFoodPosition();
  }

  //detecting head collision
  if(snakeX <=0 || snakeY<=0 || snakeX>30 || snakeY >30){
    gameOver=true;
  }
  
  for (let i = snakeBody.length-1; i > 0; i--) {
    snakeBody[i]= snakeBody[i-1];
    
  }
  snakeBody[0] = [snakeX,snakeY];

  //Updating current direction change
  snakeX+=velocityX;
  snakeY+=velocityY;

  for (let i = 0; i < snakeBody.length; i++) {
    newHTML += `<div class="snake-head"style="grid-area:${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`;

    if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
    }
  }

  playBoard.innerHTML = newHTML;
}

// --------------------

changeFoodPosition();
setIntervalId = setInterval(onload,130);
displayScore();
displayHighScore();
document.addEventListener("keydown",changeDirection);
