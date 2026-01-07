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
const samePosition = (array_1, array_2) =>
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
  // if (samePosition(currentPosn, targetPosn)) return 0; // just if initial and target posn are same

  // if (samePosition([5,3],currentPosn)){console.log('KKKKKKKKKKKKKK')}
  if (!containsPosition(visitedSquares, currentPosn)) {
    visitedSquares.push(currentPosn);
    // if (samePosition([5,3],currentPosn)){console.log('wwwwwwwwwwwwwww')}
    // currEdges = queueMoves(currentPosn);
    // const key = currentPosn.toString();
    // edgesMat[key] = currEdges;
  }
  // if (samePosition([5,3],currentPosn)){console.log('wwwwwwwwwwwwwww')}
  currEdges = queueMoves(currentPosn);
  // const key = currentPosn.toString();
  const key = JSON.stringify(currentPosn);
  edgesMat[key] = currEdges;
  // console.log(currEdges)
  // console.log("(===========================)")

  for (const posn of currEdges) {
    // console.log('here',posn)
    if (samePosition(posn, targetPosn)) {
      finalArr2.push(targetPosn);
      console.log("here", posn);
      finalArr2.push(JSON.parse(key));
      currKey = key;
      backTrackKeyToStart(currKey);
      return true;
    }
  }
}

function backTrackKeyToStart(currKey) {
  const curr_key = JSON.parse(currKey);
  // console.log('here',curr_key, startPosn)
  if (samePosition(curr_key, startPosn)) {
    console.log("here299009", curr_key);
    return true;
  }
  let nextKey;
  for (let key in edgesMat) {
    for (let posn of edgesMat[key]) {
      if (samePosition(curr_key, posn)) {
        console.log(key);
        finalArr2.push(JSON.parse(key));
        nextKey = key;
        backTrackKeyToStart(nextKey);
      }
    }
  }
}

handlePosition(startPosn); //initialize queue
// work on queue
// console.log('++++++')
// console.log(edgesMat)
// console.log('++++++\n')

function handleQueue(currPosn) {
  while (queue.length > 0) {
    ITE += 1;
    if (samePosition(currPosn, targetPosn)) {
      console.log("yeeye", currPosn);
      break;
    }
    const nextItem = queue.shift(); // removes the item from queue. (1s t in line)
    const res = handlePosition(nextItem);
    if (res) return;
    currPosn = nextItem;
  }
}

handleQueue(startPosn);

// console.log(visitedSquares)

// backTraverse([0, 0]);
// console.log(visitedSquares)

// console.log('++++++')
// console.log(edgesMat)
// console.log('++++++\n')
// console.log(visitedSquares)
console.log(finalArr2);

function backTraverse(posn) {
  let nextPos = posn;
  finalArr.push(nextPos);
  let count = 1;
  // console.log(nextPos, startPosn);
  // console.log(samePosition(nextPos, startPosn));
  while (!samePosition(nextPos, startPosn)) {
    if (count == 30) {
      // console.log("________");
      // console.log(finalArr);
      // console.log("________");
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
// console.log(finalArr);

// function handleQueue(currPosn) {
//   if (queue.length <= 0) return;
//   if (samePosition(currPosn, targetPosn)) console.log("yeeye");

//   const removedItem = queue.shift();

//   handlePosition(removedItem);
//   handleQueue(removedItem);
// }
