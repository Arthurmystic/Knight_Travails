// index.js

const targetPosn = [0, 0]; // to be hushed out later
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
const edges = {};

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
const samePosition = (array_1, array_2) =>
  array_1.length === array_2.length &&
  array_1.every((val, idx) => val === array_2[idx]);

function queueMoves(currPosn) {
  const tempStore = [];
  for (const move of KNIGHT_MOVES) {
    const newPosn = [currPosn[0] + move[0], currPosn[1] + move[1]];

    if (containsPosition(visitedSquares, newPosn) || isOffBoard(newPosn))
      continue; // if position visited or outside board go to next iteration
    queue.push(newPosn);
    tempStore.push(newPosn);
  }
  return tempStore;
}

function handlePosition(currentPosn) {
  // if (samePosition(currentPosn, targetPosn)) return 0; // just if initial and target posn are same

  if (!containsPosition(visitedSquares, currentPosn))
    visitedSquares.push(currentPosn);

  currEdges = queueMoves(currentPosn);
  const key = currentPosn.toString();
  edges[key] = currEdges;
}

handlePosition(startPosn); //initialize queue
// work on queue

function handleQueue(currPosn) {
  while (queue.length > 0) {
    ITE += 1;
    if (samePosition(currPosn, targetPosn)) {
      console.log("yeeye", currPosn);
      break;
    }
    const nextItem = queue.shift(); // removes the item from queue. (1s t in line)
    handlePosition(nextItem);
    currPosn = nextItem;
  }
}
// call moves on finalposn. check if move is in visitedsquare, if yes, store that move in finalarray. and andthen do moves on that posn too.
handleQueue(startPosn);

// console.log(visitedSquares)

backTraverse([0, 0]);
// console.log(visitedSquares)

function backTraverse(posn) {
  let nextPos = posn;
  finalArr.push(nextPos);
  let count = 1;
  console.log(nextPos, startPosn);
  console.log(samePosition(nextPos, startPosn));
  while (!samePosition(nextPos, startPosn)) {
    if (count == 30) {
      console.log("________");
      console.log(finalArr);
      console.log("________");
      return;
    }
    for (const move of KNIGHT_MOVES) {
      let backPosn = [nextPos[0] - move[0], nextPos[1] - move[1]];
      if (
        containsPosition(visitedSquares, backPosn) &&
        !containsPosition(finalArr, backPosn)
      ) {
        finalArr.push(backPosn);
        nextPos = backPosn;
        break;
      }
    }
    count += 1;
    // nextPos = finalArr.at(-1)
  }
  // console.log (finalArr)
  // backTraverse(finalArr.at(-1))
}
console.log(finalArr);

// function handleQueue(currPosn) {
//   if (queue.length <= 0) return;
//   if (samePosition(currPosn, targetPosn)) console.log("yeeye");

//   const removedItem = queue.shift();

//   handlePosition(removedItem);
//   handleQueue(removedItem);
// }
