# Knight's Travails – Shortest Path Finder

A JavaScript implementation to find the **shortest sequence of moves** a knight can take from a starting square to a target square on a standard 8x8 chessboard. This project uses **Breadth-First Search (BFS)** to ensure the shortest path is found.

---

## Features

- Calculates all valid knight moves from any position.
- Uses BFS to explore positions **level by level**.
- Avoids revisiting already-processed squares.
- Tracks parent-child relationships to **reconstruct the path**.
- Handles edge cases (off-board positions, same start and target).

---

## How it Works

1. **Define Moves** – The knight can move in 8 possible L-shaped ways. These are stored in `KNIGHT_MOVES`.

2. **Initialize State** – The code sets up:

   - `visitedSquares` to track visited coordinates.
   - `queue` for BFS.
   - `adjacencyList` to store parent-child relationships.
   - `solutionPath` to store the final path.

3. **Processing Squares** – Each square is processed using `processSquare()`:

   - Marks it as visited.
   - Finds valid moves and adds them to the BFS queue.
   - Checks if the target is reached.

4. **BFS Engine** – `runBFSToProcessQueue()`:

   - Processes the queue **FIFO** (first-in, first-out).
   - Explores all positions **level by level**, guaranteeing the shortest path.

5. **Path Reconstruction** – `backTrackLastToStart()` traces the path from the target back to the start using the adjacency list.

6. **Result** – `findKnightPath(startPosn, targetPosn)` prints:
   - The total number of moves.
   - The sequence of coordinates representing the path.

---

## Usage

1. **Import or include the script** (if in a browser, include in `<script>` tag).

2. **Call the main function**:

```javascript
// Find the shortest path from [0, 0] to [7, 7]
findKnightPath([0, 0], [7, 7]);
```

## Future Improvements

Child → Parent Mapping: Currently, the adjacency list maps parent → children.
This requires iterating through the entire list to backtrack, costing O(N²) in the worst case.
A more efficient approach is to store child → parent during BFS.
This allows direct backtracking in O(n) time:

