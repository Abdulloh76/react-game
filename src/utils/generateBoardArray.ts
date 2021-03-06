export default function generateBoardArray(options: number[]) {
  const [width, height, minesNumber] = options;
  const arr: number[][] = Array.from(Array(height), () => Array(width).fill(0));
  let remainingMines: number = minesNumber;
  const minesPositions: { x: number; y: number; }[] =[]

  while (remainingMines !== 0) {
    const x: number = Math.floor(Math.random() * width);
    const y: number = Math.floor(Math.random() * height);

    if (arr[x][y] !== -1) {
      arr[x][y] = -1;
      remainingMines -= 1;
      minesPositions.push({ x, y })

      if (x + 1 < width) {
        if (y + 1 < height && arr[x + 1][y + 1] !== -1) arr[x + 1][y + 1] += 1;
        if (arr[x + 1][y] !== -1) arr[x + 1][y] += 1;
        if (y - 1 >= 0 && arr[x + 1][y - 1] !== -1) arr[x + 1][y - 1] += 1;
      }
      if (x - 1 >= 0) {
        if (y + 1 < height && arr[x - 1][y + 1] !== -1) arr[x - 1][y + 1] += 1;
        if (arr[x - 1][y] !== -1) arr[x - 1][y] += 1;
        if (y - 1 >= 0 && arr[x - 1][y - 1] !== -1) arr[x - 1][y - 1] += 1;
      }
      if (y + 1 < height && arr[x][y + 1] !== -1) arr[x][y + 1] += 1;
      if (y - 1 >= 0 && arr[x][y - 1] !== -1) arr[x][y - 1] += 1;
    }
  }
  return { arr, minesPositions };
}

// generateBoardArray(9, 9, 10) ~~
// [ 1,  1,  1,  0,  0,  1,  1,  1,  0]
// [ 1, -1,  2,  1,  1,  2, -1,  3,  1]
// [ 2,  2,  2, -1,  2,  3, -1, -1,  1]
// [-1,  1,  1,  2, -1,  2,  2,  2,  1]
// [ 2,  2,  0,  1,  1,  1,  0,  0,  0]
// [-1,  1,  0,  0,  0,  0,  0,  0,  0]
// [ 2,  2,  1,  0,  0,  0,  0,  0,  0]
// [ 1, -1,  2,  1,  1,  0,  0,  0,  0]
// [ 1,  1,  2, -1,  1,  0,  0,  0,  0]
// -1 === mine
