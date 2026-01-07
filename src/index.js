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
  const solutionPath = [];
  const adjacencyList = {};

  return {
    KNIGHT_MOVES,
    visitedSquares,
    queue,
    solutionPath,
    adjacencyList,
  };
}

const { KNIGHT_MOVES, visitedSquares, queue, solutionPath, adjacencyList } =
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

function enqueueMoves(currPosn) {
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

function processSquare(currentPosn, startPosn, targetPosn) {
  if (!containsPosition(visitedSquares, currentPosn)) {
    visitedSquares.push(currentPosn);
  }
  const currEdges = enqueueMoves(currentPosn);
  const key = JSON.stringify(currentPosn);
  adjacencyList[key] = currEdges;

  for (const posn of currEdges) {
    if (isSameSquare(posn, targetPosn)) {
      solutionPath.push(targetPosn);
      solutionPath.push(JSON.parse(key));
      backTrackLastToStart(key, startPosn);
      return true;
    }
  }
}

function backTrackLastToStart(currKey, startPosn) {
  const curr_key = JSON.parse(currKey);
  if (isSameSquare(curr_key, startPosn)) return true;
  for (let key in adjacencyList) {
    for (let posn of adjacencyList[key]) {
      if (isSameSquare(curr_key, posn)) {
        solutionPath.push(JSON.parse(key));
        const found = backTrackLastToStart(key, startPosn);
        if (found) return true;
      }
    }
  }
  return false;
}

function runBFSToProcessQueue(currPosn, startPosn, targetPosn) {
  while (queue.length > 0) {
    if (isSameSquare(currPosn, targetPosn)) {
      break;
    }
    const nextItem = queue.shift(); // removes the item from queue. (1st in line)
    const targetFound = processSquare(nextItem, startPosn, targetPosn);
    if (targetFound) return;
    currPosn = nextItem;
  }
}

function findKnightPath(startPosn, targetPosn) {
  processSquare(startPosn, startPosn, targetPosn); //initialize queue
  runBFSToProcessQueue(startPosn, startPosn, targetPosn);
  console.log(solutionPath.reverse());
}

findKnightPath([0, 0], [7, 7]);
