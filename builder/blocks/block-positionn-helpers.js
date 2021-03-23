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

function hasTranslate(element) {
  const style = window.getComputedStyle(element)
  const transformProperty = style['transform']
  const marix =
    transformProperty.match(/matrix.*\((.+)\)/)?.[1].split(', ') ?? null
  return !!marix
}

function getBlockOffset(element) {
  const style = window.getComputedStyle(element)
  const width = +style['width']?.replace('px', '') || 0
  const height = +style['height']?.replace('px', '') || 0
  const top = +style['top']?.replace('px', '') || 0
  const left = +style['left']?.replace('px', '') || 0
  return { left, top, width, height }
}

function getChildInceptionPos(blockId, blockParentId) {
  const v1 = getBlockPos(blockId)
  const v2 = getBlockPos(blockParentId)
  return {
    top: v1.top + v2.top,
    left: v1.left + v2.left,
    width: v1.width,
    height: v1.height,
  }
}

function getBlockPos(blcokId) {
  const element = document.getElementById(blcokId)
  const parentElement = element.offsetParent
  let dim = getBlockOffset(parentElement)
  if (hasTranslate(parentElement)) {
    return getTranslateValues(element)
  }
  return dim
}

export function getBlockOffsets(blockId, blockParentId) {
  if (blockId.includes('child-inception')) {
    return getChildInceptionPos(blockId, blockParentId)
  }
  return getBlockPos(blockId)
}
