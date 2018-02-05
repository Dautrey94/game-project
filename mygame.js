var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// start codepen code

// var test = 0;
// var img = new Image();
// img.src = 'https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';
// //img.src = "http://www.mulierchile.com/game-background-images/game-background-images-007.jpg"
// var CanvasXSize = canvas.width;
// var CanvasYSize = canvas.height;
// var speed = 30;
// var scale = 1.6;
// var y = 0;

// var dx = 0.75;
// var imgW;
// var imgH;
// var x = 0;
// var clearX;
// var clearY;
// var ctx;

// img.onload = function() {
//     imgW = img.width * scale;
//     imgH = img.height * scale;
//     if (imgW > CanvasXSize) { 
//       x = CanvasXSize - imgW; }
//     if (imgW > CanvasXSize) { clearX = imgW; }
//     else { clearX = CanvasXSize; }
//     if (imgH > CanvasYSize) { clearY = imgH; }
//     else { clearY = CanvasYSize; }
//     // do not uncomment ctx = document.getElementById('canvas').getContext('2d');
//     return setInterval(draw, speed);
// }

// function draw() {

//     gameCharacter.update();

//     ctx.clearRect(0, 0, clearX, clearY);
//     if (imgW <= CanvasXSize) {
//         if (x > CanvasXSize) { x = -imgW + x; }
//         if (x > 0) { ctx.drawImage(img, -imgW + x, y, imgW, imgH); }
//         if (x - imgW > 0) { ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH); }
//     }
//     else {
//         if (x > (CanvasXSize)) { x = CanvasXSize - imgW; }
//         if (x > (CanvasXSize-imgW)) { ctx.drawImage(img, x - imgW + 1, y, imgW, imgH); }
//     }
//     ctx.drawImage(img, x, y,imgW, imgH);
//     x += dx;
// }

// end codepen code

function start(){
    // left at 20 for fast refresh
    var intervalId = setInterval(updateCanvas, 20);
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

// here is where we start getting problems / refreshing goes crazy
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
}

window.addEventListener("keydown",function(e){
    if (e.which === 32){
        gameCharacter.gravitySpeed = -8;
    }
})
