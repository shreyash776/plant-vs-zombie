const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const square_size = 100;
const rows = canvas.height / square_size;
const columns = canvas.width / square_size;
const pointer ={
    x:0,
    y:0
};

class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}
const ctrl_pnl = {
    w:canvas.width,
    h:square_size
}
const squares = [];
for (let i = 1; i < rows; i++) {
    squares[i] = [];
    for (let j = 0; j < columns; j++) {
        const square = new Square(j * square_size, i * square_size, square_size);
        squares[i][j] = square;
    }
}
function mouseinsqr(mouseX, mouseY, squareX, squareY, squareSize) {
    return mouseX >= squareX && mouseX <= squareX + squareSize &&
        mouseY >= squareY && mouseY <= squareY + squareSize;
}
function drawGrid() {
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(mouseinsqr(pointer.x,pointer.y,squares[i][j].x,squares[i][j].y,square_size))
            squares[i][j].draw();
        }
    }
}
canvas.addEventListener('mousemove',function(event) {
    pointer.x=event.x-canvas.offsetLeft;
    pointer.y=event.y-canvas.offsetTop;
})
canvas.addEventListener('mouseleave',function(event) {
    pointer.x=0;
    pointer.y=0;
})

// function drawimg(x,l)
// {
// let images=[];
// images.length=l;
// for(let i=0;i<l;i++)
// {
//     images[i]=new Image();
//     images[i].src= '/images/' + x + (i+1).toString()+'.png'
// }
// let i=0;
// setInterval(function(){
//     ctx.clearRect(0,0,200,200);
//     if(i>=l-1)
//     { i=0;}
//     i++;
//     ctx.drawImage(images[i],100,100);
// },100)
// }
let selectedPlantType="peashooter";
let tsun=150;
const sunflowerCost=50;
const peashooterCost=100;
let plantCost=peashooterCost;
const plants=[];
class sunflower{
    constructor(x,y){
        this.type="sunflower"
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=75;
        this.cost=50;
    }
    draw()
    {

    }
} 
class peashooter {
    constructor(x,y){
        this.type="peashooter";
        this.x=x;
        this.y=y;
        this.side=square_size;
        this.health=100;
        this.peas=[];
        this.enemyDetect=false;
    }
draw()
{
ctx.fillStyle='blue';
ctx.fillRect(this.x,this.y,this.side,this.side)
}}
canvas.addEventListener('click',function()
{
    const sqrX=pointer.x-(pointer.x%square_size);
    const sqrY=pointer.y-(pointer.y%square_size);
    if(sqrY<square_size)
    return;
    for(let i=0;i<plants.length;i++)
    {
        if(plants[i].x==sqrX&&plants[i].y==sqrY)
        return;
    }
    if (selectedPlantType === "peashooter") {
        selectedPlant = peashooter;
        plantCost = peashooterCost;
    } else if (selectedPlantType === "sunflower") {
        selectedPlant = sunflower;
        plantCost = sunflowerCost;
    }
    if(tsun>=plantCost)
    {plants.push(new selectedPlant(sqrX,sqrY));
    tsun=tsun-plantCost;}
})
function drawPlants(){
    for(let i=0;i<plants.length;i++)
    {
        plants[i].draw();
    }
}
function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='grey';
    ctx.fillRect(0,0,ctrl_pnl.w,ctrl_pnl.h);
    drawGrid();
    drawPlants();
    setTimeout(updateGame,16);
}
updateGame();


