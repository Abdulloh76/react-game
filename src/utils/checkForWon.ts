export default function checkForWon(
  trackingArray: number[][],
  minesPositions: { x: number; y: number }[]
) {
  let flags = 0;
  for (let i = 0; i < minesPositions.length; i++) {
    const { x, y } = minesPositions[i];
    if (trackingArray[x][y] === -1) flags++;
  }

  return minesPositions.length === flags;
}
