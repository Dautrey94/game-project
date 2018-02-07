var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// starts game after 2 seconds
setTimeout(function(){ 
    start();
}, 2000);

function start(){
   // left at 20 for fast refresh
   var intervalId = setInterval(updateCanvas, 20);
}
var frameNumber = 0
// checks if set number of frames have passed
var  everyInterval = ((n) => {
   if ((frameNumber / n) % 1 === 0) {
     return true
   }
   return false
 });

var flyingRectangles = [];
var flyingRectangles2 = [];
var flyingRectangles3 = [];

function Rectangles (x,y,color,width,height) {
   this.height = height;
   this.width = width;
   this.x = x;
   this.y = y;
   this.color = color;
   this.update = function() {
    ctx.fillStyle=this.color;
    ctx.fillRect (this.x,this.y,this.width,this.height);
       //ctx.fillStyle = color;
       // ctx.arc(this.x,this.y,this.width,this.height);
       //ctx.beginPath();
       //ctx.arc(this.x,this.y,50,0,2*Math.PI);
       //ctx.fill();
   }
   this.newPos = function() {
       //this.x -= 15;
       if( this.color === "red"){
           this.x -=5;
       } else if( this.color === "green"){
           this.x -=30;
       } else {
           this.x -=12
       }
   } 
}

function pushRectangles() {
   if (everyInterval(600)) {
       var random = Math.floor(Math.random() * canvas.height);
       flyingRectangles.push(new Rectangles(canvas.width,random,"white",60,60));
       score++;
   } 
}
function pushRectangles2() {
    if (everyInterval(1000)) {
        var random = Math.floor(Math.random() * canvas.height);
        flyingRectangles2.push(new Rectangles(canvas.width,random,"red",60,60));
        score++;
    } 
 }
 function pushRectangles3() {
    if (everyInterval(5000)) {
        var random = Math.floor(Math.random() * canvas.height);
        flyingRectangles3.push(new Rectangles(canvas.width,random,"green",40,40));
        score++;
    } 
 }


function drawRectangles() {
   pushRectangles();
   flyingRectangles.forEach((elem) => {
       elem.newPos();
       elem.update();
   })
}
function drawRectangles2() {
    pushRectangles2();
    flyingRectangles2.forEach((elem) => {
        elem.newPos();
        elem.update();
    })
 }
 function drawRectangles3() {
    pushRectangles3();
    flyingRectangles3.forEach((elem) => {
        elem.newPos();
        elem.update();
    })
 }



var gameCharacter = new Character (75,550,"#0e6bc7",50,50);

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
   this.collide = function(rectangle) {
    // collision detection based on coordinates 
    var left = this.x;
    var right = this.x + (this.width);
    var top = this.y;
    var bottom = this.y + (this.height);
    var rectangleLeft = rectangle.x;
    var rectangleRight = rectangle.x + (this.width);
    var rectangleTop =rectangle.y;
    var rectangleBottom = rectangle.y + (this.height);
    var collided = true;
    if ((bottom < rectangleTop) ||
        (top > rectangleBottom) ||
        (right < rectangleLeft) ||
        (left > rectangleRight)) {
        collided = false;
        
    }
    return collided;
   }
    
}



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
   for (var i =0; i < flyingRectangles.length; i++) {
       if (gameCharacter.collide(flyingRectangles[i])){
            // document.location.reload();
            document.location.href = "index.html";
    //        alert("game over");
       }
   }
   for (var i =0; i < flyingRectangles2.length; i++) {
    if (gameCharacter.collide(flyingRectangles2[i])){
         document.location.reload();
 //        alert("game over");
    }
}
for (var i =0; i < flyingRectangles3.length; i++) {
    if (gameCharacter.collide(flyingRectangles3[i])){
         document.location.reload();
 //        alert("game over");
    }
}
   gameCharacter.update()
   drawRectangles();
   drawRectangles2();
   drawRectangles3();
   frameNumber += 20; 
   drawScore();
}

window.addEventListener("keydown",function(e){
   if (e.which === 32){
       gameCharacter.gravitySpeed = -8;
   }
})

var score = 0;
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 600, 20);
}

