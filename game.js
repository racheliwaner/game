export const EMPTY = 20;
export const FLAG = 21;
export const BOMB = 10;

let myArray;
let arrayBombs;

export const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

function create2DArray(rows, cols) {
  const array = [];
  for (let i = 0; i < rows; i++) {
    const row = new Array(cols).fill(EMPTY);
    array.push(row);
  }
  return array;
}

function placeBombs() {
  const size = myArray.length;
  let placedBombs = 0;

  while (placedBombs < size) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);

    if (arrayBombs[randomRow][randomCol] === EMPTY) {
      arrayBombs[randomRow][randomCol] = BOMB;
      placedBombs++;
    }
  }
}

export function placeChoice(rowNum, colNum) {
  let count = 0;

  for (const [dx, dy] of directions) {
    const newRow = rowNum + dx;
    const newCol = colNum + dy;

    if (
      newRow >= 0 &&
      newRow < myArray.length &&
      newCol >= 0 &&
      newCol < myArray[0].length
    ) {
      if (arrayBombs[newRow][newCol] === BOMB) {
        count++;
      }
    }
  }

  myArray[rowNum][colNum] = count;

  if (count === 0) {
    for (const [dx, dy] of directions) {
      const newRow = rowNum + dx;
      const newCol = colNum + dy;

      if (
        newRow >= 0 &&
        newRow < myArray.length &&
        newCol >= 0 &&
        newCol < myArray[0].length &&
        myArray[newRow][newCol] === EMPTY
      ) {
        placeChoice(newRow, newCol);
      }
    }
  }
}

export function checkWon() {
  for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray.length; j++) {
      if (myArray[i][j] === EMPTY) {
        return true;
      }
    }
  }
  return false;
}

export function setFlag(rowNum, colNum) {
  myArray[rowNum][colNum] = FLAG;
}

export function reveal(rowNum, colNum) {
  if (arrayBombs[rowNum][colNum] === BOMB) {
    return "bomb";
  }

  placeChoice(rowNum, colNum);

  if (!checkWon()) {
    return "won";
  }

  return "reveal";
}

export function init(size = 10) {
  myArray = create2DArray(size, size);
  arrayBombs = create2DArray(size, size);

  placeBombs();

  return {
    myArray,
    arrayBombs
  };
}



