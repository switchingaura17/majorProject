// luigis tower defense
// Joshua Mason
// 10/1/2020

let grid, cellWidth, cellHeight, cellY, cellX, cell, i;
const GRIDSIZE = 25;
let bossBoo, bossBooScaler = 0.5; 
let minnionBoo, hit = 50, minnionBooScaler = 0.3, luigiScaler = 0.3, pearScaler = 0.3;
let baseMap, initialState;
let pear;
let round50 = false;
let luigi;
let roundNumber = 0;
let milli;
let theBoos = [];
let luigiTower;

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

  milli = millis();

  luigiTower = new Tower(50, 100, 10);
  grid = baseMap;
  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;

  window.setInterval(spawnMinnion, 2000);
 
}

function draw() {
  background(220);

  displayBattleMap();

  for (let i=0; i<theBoos.length; i++) {
    theBoos[i].movingMinnion();
    theBoos[i].displayMinnionBoo();
    theBoos[i].ifMinnionHit();
    theBoos[i].playerHealthBar();
  }

  luigiTower.update();
  luigiTower.displayLuigiTower();
  // moveMinnionBoo.set("minnionBoo", 2);
}

function spawnMinnion() {
  let minBoo = new Minnion(3, 0, height / 2.2);
  theBoos.push(minBoo);
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

class Minnion {
  constructor(speed, x, y) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.state = 1;
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
    if (this.state === 1) {
      this.x += this.speed;
      if (this.x >= width / 3.7) {
        this.state = 2;
      }
    }
    else if (this.state === 2) {
      this.y -= this.speed;
      if (this.y <= height / 4.5) {
        this.state = 3;
      }
    }
    else if (this.state === 3) {
      this.x += this.speed;
      if (this.x >= width / 1.4) {
        this.state = 4;
      }
    }
    else if (this.state === 4) {
      this.y += this.speed;
      if (this.y >= height / 2.4) {
        this.state = 5;
      }
    }
    else if (this.state === 5) {
      this.x += this.speed;
      if (this.x === windowWidth) {
        this.state = 6;
      }
    }
  }
  
  playerHealthBar() {
    let j = 500;
    if (this.state === 6) {
      j -= 50;
    }

    fill("blue");
    rect(10, 10, j, 15);
  }
  
  ifMinnionHit() {
    if (pear.radius <= minnionBoo.width/2 && minnionBoo.height/2  + pear.radius) {
      for (hit = 50; hit > 0; hit -= 10) {
        return hit;
      }
    }
  }
  displayMinnionBoo() {
    image(minnionBoo, this.x, this.y, minnionBooScaler * minnionBoo.width, minnionBooScaler * minnionBoo.height);
    
    fill("red");
    rect(this.x+30, this.y, hit, 10);
  }


}

class Tower {
  constructor(x, y, shootingSpeed) {
    this.x = x;
    this.y = y;
    this.shootingSpeed;
    this.selected = false;
  }

  displayLuigiTower() {
    image(luigi, this.x, this.y, luigiScaler * luigi.width, luigiScaler * luigi.height);
  }
  
  checkForClick() {
    if (mouseX > this.x && mouseX < this.x +  luigiScaler * luigi.width && mouseY > this.y && mouseY < this.y + luigiScaler * luigi.height) {
      this.selected = true;
    }
  }
  endClick() {
    this.selected = false;
  }

  update() {
    if (this.selected) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  displayPears() {
    image(pear, this.x, this.y, pearScaler * pear.width, pearScaler * pear.height);
  }

  movingPears() {
    if () {
      this.x = pearX;
      this.y = pearY;
      pearX++;
      pearY++;
    }
  }
} 

function mousePressed() {
  luigiTower.checkForClick();
}

function mouseReleased() {
  luigiTower.endClick();
}