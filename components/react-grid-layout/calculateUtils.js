//

// Helper for generating column width
export function calcGridColWidth(positionParams) {
  const { margin, containerPadding, containerWidth, cols } = positionParams
  return (
    (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols
  )
}

// This can either be called:
// calcGridItemWHPx(w, colWidth, margin[0])
// or
// calcGridItemWHPx(h, rowHeight, margin[1])
export function calcGridItemWHPx(gridUnits, colOrRowSize, marginPx) {
  // 0 * Infinity === NaN, which causes problems with resize contraints
  if (!Number.isFinite(gridUnits)) return gridUnits
  return Math.round(
    colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx
  )
}

/**
 * Return position on the page given an x, y, w, h.
 * left, top, width, height are all in pixels.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number}  x                      X coordinate in grid units.
 * @param  {Number}  y                      Y coordinate in grid units.
 * @param  {Number}  w                      W coordinate in grid units.
 * @param  {Number}  h                      H coordinate in grid units.
 * @return {Position}                       Object containing coords.
 */
export function calcGridItemPosition(positionParams, x, y, w, h, state) {
  const { margin, containerPadding, rowHeight } = positionParams
  const colWidth = calcGridColWidth(positionParams)
  const out = {}

  // If resizing, use the exact width and height as returned from resizing callbacks.
  if (state && state.resizing) {
    out.width = Math.round(state.resizing.width)
    out.height = Math.round(state.resizing.height)
  }
  // Otherwise, calculate from grid units.
  else {
    out.width = calcGridItemWHPx(w, colWidth, margin[0])
    out.height = calcGridItemWHPx(h, rowHeight, margin[1])
  }

  // If dragging, use the exact width and height as returned from dragging callbacks.
  if (state && state.dragging) {
    out.top = Math.round(state.dragging.top)
    out.left = Math.round(state.dragging.left)
  }
  // Otherwise, calculate from grid units.
  else {
    out.top = Math.round((rowHeight + margin[1]) * y + containerPadding[1])
    out.left = Math.round((colWidth + margin[0]) * x + containerPadding[0])
  }

  return out
}

/**
 * Translate x and y coordinates from pixels to grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number} top                     Top position (relative to parent) in pixels.
 * @param  {Number} left                    Left position (relative to parent) in pixels.
 * @param  {Number} w                       W coordinate in grid units.
 * @param  {Number} h                       H coordinate in grid units.
 * @return {Object}                         x and y in grid units.
 */
export function calcXY(positionParams, top, left, w, h) {
  const { margin, cols, rowHeight, maxRows } = positionParams
  const colWidth = calcGridColWidth(positionParams)

  // left = colWidth * x + margin * (x + 1)
  // l = cx + m(x+1)
  // l = cx + mx + m
  // l - m = cx + mx
  // l - m = x(c + m)
  // (l - m) / (c + m) = x
  // x = (left - margin) / (coldWidth + margin)
  let x = Math.round((left - margin[0]) / (colWidth + margin[0]))
  let y = Math.round((top - margin[1]) / (rowHeight + margin[1]))

  // Capping
  x = clamp(x, 0, cols - w)
  y = clamp(y, 0, maxRows - h)
  return { x, y }
}

/**
 * Given a height and width in pixel values, calculate grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calcluations.
 * @param  {Number} height                  Height in pixels.
 * @param  {Number} width                   Width in pixels.
 * @param  {Number} x                       X coordinate in grid units.
 * @param  {Number} y                       Y coordinate in grid units.
 * @return {Object}                         w, h as grid units.
 */
export function calcWH(positionParams, width, height, x, y) {
  const { margin, maxRows, cols, rowHeight } = positionParams
  const colWidth = calcGridColWidth(positionParams)

  // width = colWidth * w - (margin * (w - 1))
  // ...
  // w = (width + margin) / (colWidth + margin)
  let w = Math.round((width + margin[0]) / (colWidth + margin[0]))
  let h = Math.round((height + margin[1]) / (rowHeight + margin[1]))

  // Capping
  w = clamp(w, 0, cols - x)
  h = clamp(h, 0, maxRows - y)
  return { w, h }
}

// Similar to _.clamp
export function clamp(num, lowerBound, upperBound) {
  return Math.max(Math.min(num, upperBound), lowerBound)
}
