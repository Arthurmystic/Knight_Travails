// index.js

function initKnightState() {
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
  const finalArr2 = [];
  const edgesMat = {};

  return {
    KNIGHT_MOVES,
    visitedSquares,
    queue,
    finalArr2,
    edgesMat,
  };
}

const { KNIGHT_MOVES, visitedSquares, queue, finalArr2, edgesMat } =
  initKnightState();

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

function handlePosition(currentPosn, startPosn, targetPosn) {
  if (!containsPosition(visitedSquares, currentPosn)) {
    visitedSquares.push(currentPosn);
  }
  const currEdges = queueMoves(currentPosn);
  const key = JSON.stringify(currentPosn);
  edgesMat[key] = currEdges;

  for (const posn of currEdges) {
    if (isSameSquare(posn, targetPosn)) {
      finalArr2.push(targetPosn);
      finalArr2.push(JSON.parse(key));
      backTrackLastToStart(key, startPosn);
      return true;
    }
  }
}

function backTrackLastToStart(currKey, startPosn) {
  const curr_key = JSON.parse(currKey);
  if (isSameSquare(curr_key, startPosn)) return true;
  for (let key in edgesMat) {
    for (let posn of edgesMat[key]) {
      if (isSameSquare(curr_key, posn)) {
        finalArr2.push(JSON.parse(key));
        const found = backTrackLastToStart(key, startPosn);
        if (found) return true;
      }
    }
  }
  return false;
}

function handleQueue(currPosn, startPosn, targetPosn) {
  while (queue.length > 0) {
    if (isSameSquare(currPosn, targetPosn)) {
      break;
    }
    const nextItem = queue.shift(); // removes the item from queue. (1st in line)
    const targetFound = handlePosition(nextItem, startPosn, targetPosn);
    if (targetFound) return;
    currPosn = nextItem;
  }
}
// const startPosn= [0,0]
// const targetPosn =[7,7]
// handlePosition(startPosn); //initialize queue
//   handleQueue(startPosn,targetPosn);
//   console.log(finalArr2.reverse());

function knightMoves(startPos, targetPos) {
  const startPosn = [0, 0];
  const targetPosn = [7, 7];
  handlePosition(startPosn, startPosn, targetPosn); //initialize queue
  handleQueue(startPosn, startPosn, targetPosn);
  console.log(finalArr2.reverse());
}

knightMoves([0, 0], [7, 7]);
