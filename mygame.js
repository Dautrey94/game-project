var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function start(){
    // left at 20 for fast refresh
    var intervalId = setInterval(updateCanvas, 20);
}
var frameNumber = 0

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
    animate();
    if (gameCharacter.y > canvas.height - gameCharacter.height){
        gameCharacter.y = canvas.height - gameCharacter.height
        gameCharacter.gravitySpeed = 0
    } else if (gameCharacter.y < 0) {
        gameCharacter.y = 0
        gameCharacter.gravitySpeed = 0
    }
    gameCharacter.update()
    frameNumber += 20   
}

window.addEventListener("keydown",function(e){
    if (e.which === 32){
        gameCharacter.gravitySpeed = -8;
    }
})
var spawnLineX = 1300;

// spawn a new object every 1500ms
var spawnRate = 500;

// set how fast the objects will fall
var spawnRateOfDescent = -4;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
//var startTime = Date.now();

// start animating
//  


function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: spawnLineX,
        // set y to start on the line where objects are spawned
        y: Math.random() * (canvas.width - 30) + 15 
    }

    // add the new object to the objects[] array
    objects.push(object);
}



function animate() {

    // get the elapsed time
    //var time = Date.now();

    // see if its time to spawn a new object
    // if (time > (lastSpawn + spawnRate)) {
    //     lastSpawn = time;
    //     spawnRandomObject();
    // }

    // request another animation frame
    //requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the line where new objects are spawned
    //ctx.beginPath();
   // ctx.moveTo(0, spawnLineX);
   // ctx.lineTo(canvas.width, spawnLineX);
   // ctx.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.x += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}