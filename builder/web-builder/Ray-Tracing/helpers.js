export function getGridPos({ x, w, h, y, i }, gridColumnWidth, gridRowHeight) {
  const sx = x * gridColumnWidth
  const sy = y * gridRowHeight
  const sw = w * gridColumnWidth
  const sh = h * gridRowHeight
  return { x: sx, y: sy, w: sw, h: sh, i }
}

export const getIsMidScreen = (draggingBlock, gridColumnWidth) => {
  const width = gridColumnWidth * draggingBlock.w
  const leftDis = Math.round(draggingBlock?.x + width / 2)
  const isMidScreen =
    leftDis - 1 <= window.innerWidth / 2 && leftDis + 1 >= window.innerWidth / 2

  return isMidScreen
}

export function distanceOccurrences(distances) {
  var occurrences = {}

  for (var i = 0; i < distances.length; i++) {
    var num = distances[i]
    occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1
  }
  return occurrences
}
