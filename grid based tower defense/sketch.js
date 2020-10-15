// luigis tower defense
// Joshua Mason
// 10/1/2020

let grid, cellWidth, cellHeight, cellY, cellX, cell;
const GRIDSIZE = 25;
let bossBoo, bossBooScaler = 0.5; 
let minnionBoo, minnionHealthBar, hit = 50, minnionBooScaler = 0.3;
let baseMap, initialState;
// let moveMinnionBoo = new Map();
let pear;
let round50 = false;
let minBoo, luigi;
let i;

function preload() {
  bossBoo = loadImage("assets/bossBoo.png");

  minnionBoo = loadImage("assets/minnionBoo.png");

  baseMap = loadStrings("assets/1.txt");

  initialState = loadStrings("assets/2.txt");

  pear = loadImage("assets/pear.png");

  luigi = loadImage("assets/luigi.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < baseMap.length; i++) {
    baseMap[i] = baseMap[i].split(",");
  }
  for (let y=0; y<GRIDSIZE; y++) {
    for (let x=0; x<GRIDSIZE; x++) {
      baseMap[y][x] = int(baseMap[y][x]);
    }
  }

  grid = baseMap;
  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
  minBoo = new Minnion(this.speed, 0, height/2);
  
}

function draw() {
  background(220);

  // placeMinnion();
  displayBattleMap();
  // moveMinnionBoo();
  // displayMinnionBoo();
  ifMinnionHit();
  // minnionBoo.movingMinnion();
  minBoo.displayMinnionBoo();
  // moveMinnionBoo.set("minnionBoo", 2);
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

function ifMinnionHit() {
  if (pear.radius <= minnionBoo.width/2 && minnionBoo.height/2  + pear.radius) {
    for (let hit = 50; hit > 0; hit -= 10) {
      return hit;
    }
  }
}

function displayBattleLuigi() {
  image();
}

class Minnion {
  constructor(speed, x, y) {
    this.x = 0;
    this.y = height / 2.2;
    this.speed = 5;
  }
  // use as a boolean and reset using a function outside of class
  // resetAfter50() {
  //   for (roundNumber = 0; roundNumber < 50; roundNumber += 2) {
  //     if (roundNumber === 50) {
  //       console.log(roundNumber);
  //     }
  //   }
  // }

  movingMinnion() {
    for (i = 0; i < windowWidth; i+=2) {
      if (i === 1) {
        this.displayMinnionBoo();
      }
    }
  }

  displayMinnionBoo() {
    image(minnionBoo, 0, height / 2.2, minnionBooScaler * minnionBoo.width, minnionBooScaler * minnionBoo.height);
    
    fill("red");
    minnionHealthBar = rect(30, height / 2.15, hit, 10);
  }
}
