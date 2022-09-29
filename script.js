const gameBoard=document.querySelector("#gameBoard");
const scoreText=document.querySelector("#score");
const startButton=document.querySelector("#startButton");
const resetButton=document.querySelector("#resetButton");


const ctx=gameBoard.getContext("2d");

const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const gameBackground="white";
const snakeColor="lightgreen";
const snakeBorder="black";
const foodColor="red";
const unitSize=25;

let running=false;
let reset=false;
let xVelocity=unitSize;
let yVelocity=0;
let foodX;
let foodY;
let score=0;
let timeInterval=300;
let lastSnake;

let snake=[{x:unitSize*4,y:0},{x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize,y:0},{x:0,y:0}];


const Left=37;
const Right=39;
const Up=38;
const Down=40;
window.addEventListener("keydown",changeDirection);

const createFood=()=>{
    foodX=Math.floor((Math.random()*(gameWidth-unitSize))/unitSize)*unitSize;
    foodY=Math.floor((Math.random()*(gameHeight-unitSize))/unitSize)*unitSize;
    }

const drawFood=()=>{
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
 }
    
 
 const drawSnake=()=>{
            ctx.fillStyle=snakeColor;
            ctx.strokeStyle=snakeBorder;
            snake.forEach((snakeBody)=>{
                ctx.fillRect(snakeBody.x,snakeBody.y,unitSize,unitSize);
                ctx.strokeRect(snakeBody.x,snakeBody.y,unitSize,unitSize);
            })
        }
    




drawSnake();
createFood();
drawFood();

startButton.addEventListener("click",()=>{
    startButton.style.display="none"
    scoreText.style.display="block";
    resetButton.style.display="inline"
    reset=false;
    gameStart();
    
});



const gameStart=()=>{
resetButton.addEventListener("click",resetGame);
running=true;
nextTick();

}

const  nextTick=()=>{
    if(running&&!reset){
        setTimeout(()=>{
            clearBoard();   
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },timeInterval);
     }
    
}

const clearBoard=()=>{
    ctx.fillStyle=gameBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
}


function moveSnake(){
    lastSnake=snake;

    const head={x:snake[0].x+xVelocity, y:snake[0].y+yVelocity};
    snake.unshift(head);

    if(snake[0].x==foodX && snake[0].y==foodY){
            score+=10;
            scoreText.textContent=`Score : ${score}`;
            if(timeInterval>=90)
            timeInterval-=20;
            createFood();
        }
    else{
            snake.pop();

        }
    }

    const checkGameOver=()=>{
        switch(true){
            case(snake[0].x<0):
            snake[0].x=gameWidth;
            break;
            case(snake[0].x>=gameWidth):
            snake[0].x=0;
            break;
            case(snake[0].y<0):
            snake[0].y=gameHeight;
            break;
            case(snake[0].y>=gameHeight):
            snake[0].y=0;
            break;
        }
        for(let i=1;i<snake.length;i++){
            if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y)
              running=false;
        }
        for(let j=1;j<lastSnake.length;j++){
            if(snake[0].x==lastSnake[j].x&&snake[0].y==lastSnake[j].y)
               running=false;
        }
        if(running==false)
        displayGameOver();
    };


const displayGameOver=()=>{
        clearBoard();
        ctx.font="50px MV Boli";
        ctx.fillStyle="black";
        ctx.textAlign="center";
        ctx.fillText("GAME OVER!",gameWidth/2,gameHeight/2);
        running=false;
    };


const resetGame=()=>{
        reset=true;
        resetButton.style.display="none";
        scoreText.style.display="none";
        startButton.style.display="inline"
        timeInterval=300;
        scoreText.textContent=`Score : 0`
        xVelocity=unitSize;
        yVelocity=0;
        snake=[{x:unitSize*4,y:0},{x:unitSize*3,y:0},{x:unitSize*2,y:0},{x:unitSize,y:0},{x:0,y:0}];
        clearBoard();
        drawSnake();
        createFood();
        drawFood();
        };
    

function changeDirection(Event){
    let keyValue=Event.keyCode;
    const goingUp=(yVelocity==-unitSize);
    const goingDown=(yVelocity==unitSize);
    const goingLeft=(xVelocity==-unitSize);
    const goingRight=(xVelocity==unitSize);
    switch(true){
        case(keyValue==Left&&!goingRight):
        xVelocity=-unitSize;
        yVelocity=0;
        break;
        case(keyValue==Up&&!goingDown):
        xVelocity=0;
        yVelocity=-unitSize;
        break;
        case(keyValue==Right&&!goingLeft):
        xVelocity=unitSize;
        yVelocity=0;
        break;
        case(keyValue==Down&&!goingUp):
        xVelocity=0;
        yVelocity=unitSize;
        break;
    }

};
