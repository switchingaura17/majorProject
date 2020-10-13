// luigis tower defense
// Joshua Mason
// 10/1/2020

let grid, cellWidth, cellHeight, cellY, cellX;
const GRIDSIZE = 25;
let bossBoo, minnionBoo;
let baseMap, initialState;

function preload() {
  bossBoo = loadImage("assets/bossBoo.png");

  minnionBoo = loadImage("assets/minnionBoo.png");

  baseMap = loadStrings("assets/1.txt");

  initialState = loadStrings("assets/2.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < baseMap.length; i++) {
    baseMap[i] = baseMap[i].split(",");
  }

  //loop through the whole 2d array, and turn everything to numbers
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      baseMap[y][x] = int(baseMap[y][x]);
    }
  }

  grid = baseMap;
  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(220);

  displayBattleMap();
}

function displayBattleMap() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("green");
      }
      else {
        fill("black");
      }

      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);
    }
  }
 
}

function generateEmptyGrid(gridSize) {
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      grid[i].push(0);
    }
    
  }
  return grid;
}

class Minnion {
  cunstructor {
    this . x = 0;
    this.y = checkBlack();
  }
  
  checkBlack() {
    for (let i =0; i < windowWidth; i += 5) {
      
    }
  }
}