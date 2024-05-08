
const gridSpace = 30;

let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 0;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

const gameEdgeLeft = 150;
const gameEdgeRight = 450;

const colors = [
    '#dca3ff', // soft purple color
    '#ff90a0', // cherry color
    '#80ffb4', // mint color
    '#ff7666', // soft red color
    '#70b3f5', // soft blue color
    '#b2e77d',  // light green color
    '#ffd700',  // honey yellow color
];

function setup() {
    createCanvas(600, 540);

    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    textFont('Ubuntu');
}

function draw() {
    const colorDark = '#0d0d0d';
    const colorLight = '#304550';
    const colorBackground = '#e1eeb0';

    background(colorBackground);

    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 1, height);

    rect(0, 0, gameEdgeLeft, height);

    // Draw the score rectangle
    fill(colorBackground);
    rect(450, 80, 150, 70)

    // Draw the next pice rectangle
    rect(460, 405, 130, 130, 5, 5);

    // Draw the level rectangle
    rect(460, 210, 130, 60, 5, 5);

    // Draw the lines rectangle
    rect(460, 280, 130, 60, 5, 5);

    // Draw the score lines
    fill(colorLight)
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    // Draw the score banner
    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    // Draw the score banner inner rectangle
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    // Draw the next piece inner rectangle
    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    // Draw the level inner rectangle
    rect(465, 215, 120, 50, 5, 5);

    // Draw the lines inner rectangle
    rect(465, 285, 120, 50, 5, 5);

    // Draw the info labels
    fill(25);
    noStroke();
    textSize(24);
    textAling(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    // Draw the current score
    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    // Draw the game border
    stroke(colorDark);
    lineFades(gameEdgeRight, 0, gameEdgeRight, 0, gameEdgeRight, height);

    // Show the falling piece
    fallingPiece.show();

    // Speed up the falling piece if the down arrow is pressed
    updateEvery = keyIsDown(DOWN_ARROW) ? 2 : updateEveryCurrent;

    // Update the game state
    if (!pauseGame) {
        ticks++;
        if (ticks >= updateEvery) {
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    // Show the grid pieces
    for (let i = 0; i < gridPieces; i++) {
        gridPieces[i].show();
    }

    // Show the fading lines
    for (let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }

    // Process the grid workers
    if (gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

}