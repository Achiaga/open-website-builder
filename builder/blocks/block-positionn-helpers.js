function getTranslateValues(element) {
  if (!element?.offsetParent)
    return {
      left: 0,
      top: 0,
    }
  const style = window.getComputedStyle(element?.offsetParent)
  const widthBlock = style['width']?.replace('px', '') || 0
  const heightBlock = style['height']?.replace('px', '') || 0
  const matrix =
    style['transform'] || style.webkitTransform || style.mozTransform
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ') ?? null
  if (!matrixValues)
    return {
      left: 0,
      top: 0,
    }
  return {
    right: +matrixValues[4],
    left: +matrixValues[4],
    top: +matrixValues[5],
    width: +widthBlock,
    height: +heightBlock,
  }
}

function getBlockPos(blcokId) {
  const element = document.getElementById(blcokId)
  const parentElement = element?.offsetParent?.offsetParent
  return getTranslateValues(parentElement)
}

export function getBlockOffsets(blockId) {
  return getBlockPos(blockId)
}
