// index.js

/**
 * Initializes the required state for the Knight's Travails algorithm.
 * Defines the L-shaped moves and prepares storage for pathfinding.
 */
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

  const visitedSquares = []; // Tracks which squares have already been processed
  const queue = []; // The BFS queue (FIFO)
  const solutionPath = []; // Stores the final sequence of coordinates
  const adjacencyList = {}; // Maps a parent square to its valid neighbors (parent -> children)

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

/**
 * Checks if a coordinate [x, y] exists within an array of coordinates.
 * Needed because [0,0] === [0,0] returns false in JavaScript (reference comparison).
 */
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

// compare two arrays eg. x = [1,2], y=[1,2] returns true
const isSameSquare = (array_1, array_2) =>
  array_1.length === array_2.length &&
  array_1.every((val, idx) => val === array_2[idx]);

/**
 * Calculates all valid knight moves from the current position.
 * Adds new squares to the BFS queue and returns them to be mapped in the adjacency list.
 */
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

/**
 * Processes a single square: marks as visited, finds neighbors,
 * and checks if the target has been reached.
 */
function processSquare(currentPosn, startPosn, targetPosn) {
  if (!containsPosition(visitedSquares, currentPosn)) {
    visitedSquares.push(currentPosn);
  }
  const currEdges = enqueueMoves(currentPosn);
  const key = JSON.stringify(currentPosn); // Convert array to string to use as a key in adjacency object
  adjacencyList[key] = currEdges;

  // Check if any of the new moves reached the destination
  for (const posn of currEdges) {
    if (isSameSquare(posn, targetPosn)) {
      solutionPath.push(targetPosn); // Add target to path
      solutionPath.push(JSON.parse(key)); // Add target's parent to path
      backTrackLastToStart(key, startPosn); // Trace the rest of the path back
      return true;
    }
  }
}

/**
 * Recursively moves backward through the adjacency list from the target
 * back to the starting square to reconstruct the path.
 */
function backTrackLastToStart(currKey, startPosn) {
  const curr_key = JSON.parse(currKey);
  if (isSameSquare(curr_key, startPosn)) return true; // Base Case: We reached the start position
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

/**
 * The Breadth-First Search (BFS) engine.
 * Processes squares in the order they were discovered to ensure the shortest path.
 */
function runBFSToProcessQueue(currPosn, startPosn, targetPosn) {
  while (queue.length > 0) {
    if (isSameSquare(currPosn, targetPosn)) {
      break;
    }
    const nextItem = queue.shift(); // Shift removes first item (FIFO), ensuring level-by-level check
    const targetFound = processSquare(nextItem, startPosn, targetPosn);
    if (targetFound) return;
    currPosn = nextItem;
  }
}

function findKnightPath(startPosn, targetPosn) {
  if (isSameSquare(startPosn, targetPosn)) {
    console.log("Path found in 0 moves:");
    console.log([startPosn]);
    return;
  }
  processSquare(startPosn, startPosn, targetPosn); //initialize queue
  runBFSToProcessQueue(startPosn, startPosn, targetPosn);
  const movesCount = Math.max(0, solutionPath.length - 1);
  console.log(`Path found in ${movesCount} moves:`);
  console.log(solutionPath.reverse());
}

findKnightPath([0, 0], [7, 7]);
