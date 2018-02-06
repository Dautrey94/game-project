var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function start(){
   // left at 20 for fast refresh
   var intervalId = setInterval(updateCanvas, 20);
}
var frameNumber = 0

var  everyInterval = ((n) => {
   if ((frameNumber / n) % 1 === 0) {
     return true
   }
   return false
 });

var flyingSquares = [];

function Square (x,y,color,width,height) {
   this.height = height;
   this.width = width;
   this.x = x;
   this.y = y;
   this.color = color;
   this.update = function() {
       ctx.fillStyle = color;
       // ctx.arc(this.x,this.y,this.width,this.height);
       ctx.beginPath();
       ctx.arc(this.x,this.y,50,0,2*Math.PI);
       ctx.stroke();
   }
   this.newPos = function() {
       this.x -= 10;
   }
}

function pushSquare() {
   if (everyInterval(500)) {
       var random = Math.floor(Math.random() * canvas.height);
       flyingSquares.push(new Square(canvas.width,random,'red',40,40));
   }
}

function drawSquares() {
   pushSquare();
   flyingSquares.forEach((elem) => {
       elem.newPos();
       elem.update();
   })
}

function Character(x , y, color, width, height) {
   this.x = x;
   this.y = y;
   this.color = color;
   this.width = width;
   this.height = height;
   this.speedX = 0;
   this.speedY = 0;
   this.gravity = 0.45;
   this.gravitySpeed = 0;
   this.update = function (){
       ctx.fillStyle=this.color;
       ctx.fillRect (this.x,this.y,this.width,this.height);
   }  
   this.newPos = function() {
       this.gravitySpeed += this.gravity;
       this.y += this.speedY + this.gravitySpeed;
   }  
}

var gameCharacter = new Character (75,550,"green",50,50);


function updateCanvas() {
   ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
   gameCharacter.newPos()
   if (gameCharacter.y > canvas.height - gameCharacter.height){
       gameCharacter.y = canvas.height - gameCharacter.height
       gameCharacter.gravitySpeed = 0
   } else if (gameCharacter.y < 0) {
       gameCharacter.y = 0
       gameCharacter.gravitySpeed = 0
   }
   gameCharacter.update()
   drawSquares();
   frameNumber += 20; 
}

window.addEventListener("keydown",function(e){
   if (e.which === 32){
       gameCharacter.gravitySpeed = -8;
   }
})