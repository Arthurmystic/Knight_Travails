// index.js

const targetPosn = [4, 3]; // to be hushed out later
const startPosn = [3, 3]; // to be hushed out later
let ITE = 0;

const KNIGHT_MOVES = [
  [+1, +2],
  [+1, -2],
  [-1, +2],
  [-1, -2],
  [+2, +1],
  [+2, -1],
  [-2, +1],
  [-2, -1],
];

const visitedSquares = [];
const queue = [];
const finalArr = [];
const finalArr2 = [];
const edgesMat = {};

// Checks if an array contains an array. Can't use .includes as only checks single items eg a, or 9 etc
function containsPosition(mainArray, target) {
  const exists = mainArray.some(
    (innerArray) =>
      innerArray.length === target.length &&
      innerArray.every((value, index) => value === target[index])
  );
  return exists;
}
const isOffBoard = (position) =>
  position.some((coord) => coord < 0 || coord > 7);

// compare to arrays eg. x = [1,2], y=[1,2] returns true
const isSameSquare = (array_1, array_2) =>
  array_1.length === array_2.length &&
  array_1.every((val, idx) => val === array_2[idx]);

function queueMoves(currPosn) {
  const tempStore = [];
  for (const move of KNIGHT_MOVES) {
    const newPosn = [currPosn[0] + move[0], currPosn[1] + move[1]];

    if (containsPosition(visitedSquares, newPosn) || isOffBoard(newPosn)) {
      continue; // if position visited or outside board go to next iteration
    }
    queue.push(newPosn);
    tempStore.push(newPosn);
  }
  return tempStore;
}

function handlePosition(currentPosn) {
  if (!containsPosition(visitedSquares, currentPosn)) {
    visitedSquares.push(currentPosn);
  }
  currEdges = queueMoves(currentPosn);
  const key = JSON.stringify(currentPosn);
  edgesMat[key] = currEdges;

  for (const posn of currEdges) {
    if (isSameSquare(posn, targetPosn)) {
      finalArr2.push(targetPosn);
      finalArr2.push(JSON.parse(key));
      currKey = key;
      backTrackKeyToStart(currKey);
      return true;
    }
  }
}

function backTrackKeyToStart(currKey) {
  const curr_key = JSON.parse(currKey);
  if (isSameSquare(curr_key, startPosn)) {
    console.log("herep", curr_key);
    return true;
  }
  console.log("here2");
  let nextKey;
  for (let key in edgesMat) {
    for (let posn of edgesMat[key]) {
      if (isSameSquare(curr_key, posn)) {
        // console.log(key);
        finalArr2.push(JSON.parse(key));
        nextKey = key;
        const found = backTrackKeyToStart(nextKey);
        if (found) return true;
      }
    }
  }
  return false;
}

function handleQueue(currPosn) {
  while (queue.length > 0) {
    ITE += 1;
    if (isSameSquare(currPosn, targetPosn)) {
      break;
    }
    const nextItem = queue.shift(); // removes the item from queue. (1s t in line)
    const res = handlePosition(nextItem);
    if (res) return;
    currPosn = nextItem;
  }
}
handlePosition(startPosn); //initialize queue
handleQueue(startPosn);
// finalArr2.push()
console.log(finalArr2);
