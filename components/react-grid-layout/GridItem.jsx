//
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { DraggableCore } from 'react-draggable'
import { Resizable } from 'react-resizable'
import { fastPositionEqual, perc, setTopLeft, setTransform } from './utils'
import {
  calcGridItemPosition,
  calcGridItemWHPx,
  calcGridColWidth,
  calcXY,
  calcWH,
  clamp,
} from './calculateUtils'
import { resizeHandlesType, resizeHandleType } from './ReactGridLayoutPropTypes'
import classNames from 'classnames'

/**
 * An individual item within a ReactGridLayout.
 */
class GridItem extends React.Component {
  static propTypes = {
    // Children must be only a single element
    children: PropTypes.element,

    // General grid attributes
    cols: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    margin: PropTypes.array.isRequired,
    maxRows: PropTypes.number.isRequired,
    containerPadding: PropTypes.array.isRequired,

    // These are all in grid units
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,

    // All optional
    minW: function (props, propName) {
      const value = props[propName]
      if (typeof value !== 'number') return new Error('minWidth not Number')
      if (value > props.w || value > props.maxW)
        return new Error('minWidth larger than item width/maxWidth')
    },

    maxW: function (props, propName) {
      const value = props[propName]
      if (typeof value !== 'number') return new Error('maxWidth not Number')
      if (value < props.w || value < props.minW)
        return new Error('maxWidth smaller than item width/minWidth')
    },

    minH: function (props, propName) {
      const value = props[propName]
      if (typeof value !== 'number') return new Error('minHeight not Number')
      if (value > props.h || value > props.maxH)
        return new Error('minHeight larger than item height/maxHeight')
    },

    maxH: function (props, propName) {
      const value = props[propName]
      if (typeof value !== 'number') return new Error('maxHeight not Number')
      if (value < props.h || value < props.minH)
        return new Error('maxHeight smaller than item height/minHeight')
    },

    // ID is nice to have for callbacks
    i: PropTypes.string.isRequired,

    // Resize handle options
    resizeHandles: resizeHandlesType,
    resizeHandle: resizeHandleType,

    // Functions
    onDragStop: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onResizeStop: PropTypes.func,
    onResizeStart: PropTypes.func,
    onResize: PropTypes.func,

    // Flags
    isDraggable: PropTypes.bool.isRequired,
    isResizable: PropTypes.bool.isRequired,
    isBounded: PropTypes.bool.isRequired,
    static: PropTypes.bool,

    // Use CSS transforms instead of top/left
    useCSSTransforms: PropTypes.bool.isRequired,
    transformScale: PropTypes.number,

    // Others
    className: PropTypes.string,
    // Selector for draggable handle
    handle: PropTypes.string,
    // Selector for draggable cancel (see react-draggable)
    cancel: PropTypes.string,
    // Current position of a dropping element
    droppingPosition: PropTypes.shape({
      e: PropTypes.object.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }),
  }

  static defaultProps = {
    className: '',
    cancel: '',
    handle: '',
    minH: 1,
    minW: 1,
    maxH: Infinity,
    maxW: Infinity,
    transformScale: 1,
  }

  state = {
    resizing: null,
    dragging: null,
    className: '',
  }

  currentNode

  shouldComponentUpdate(nextProps, nextState) {
    // We can't deeply compare children. If the developer memoizes them, we can
    // use this optimization.
    if (this.props.children !== nextProps.children) return true
    if (this.props.droppingPosition !== nextProps.droppingPosition) return true
    // TODO memoize these calculations so they don't take so long?

    const oldPosition = calcGridItemPosition(
      this.getPositionParams(this.props),
      this.props.x,
      this.props.y,
      this.props.w,
      this.props.h,
      this.state
    )
    const newPosition = calcGridItemPosition(
      this.getPositionParams(nextProps),
      nextProps.x,
      nextProps.y,
      nextProps.w,
      nextProps.h,
      nextState
    )
    return (
      !fastPositionEqual(oldPosition, newPosition) ||
      this.props.useCSSTransforms !== nextProps.useCSSTransforms
    )
  }

  componentDidMount() {
    this.moveDroppingItem({})
  }

  componentDidUpdate(prevProps) {
    this.moveDroppingItem(prevProps)
  }

  // When a droppingPosition is present, this means we should fire a move event, as if we had moved
  // this element by `x, y` pixels.
  moveDroppingItem(prevProps) {
    const { droppingPosition } = this.props
    if (!droppingPosition) return

    const prevDroppingPosition = prevProps.droppingPosition || {
      left: 0,
      top: 0,
    }
    const { dragging } = this.state

    if (!this.currentNode) {
      // eslint-disable-next-line react/no-find-dom-node
      this.currentNode = ReactDOM.findDOMNode(this)
    }

    const shouldDrag =
      (dragging && droppingPosition.left !== prevDroppingPosition.left) ||
      droppingPosition.top !== prevDroppingPosition.top

    if (!dragging) {
      this.onDragStart(droppingPosition.e, {
        node: this.currentNode,
        deltaX: droppingPosition.left,
        deltaY: droppingPosition.top,
      })
    } else if (shouldDrag) {
      const deltaX = droppingPosition.left - dragging.left
      const deltaY = droppingPosition.top - dragging.top

      this.onDrag(droppingPosition.e, {
        node: this.currentNode,
        deltaX,
        deltaY,
      })
    }
  }

  getPositionParams(props = this.props) {
    return {
      cols: props.cols,
      containerPadding: props.containerPadding,
      containerWidth: props.containerWidth,
      margin: props.margin,
      maxRows: props.maxRows,
      rowHeight: props.rowHeight,
    }
  }

  /**
   * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
   * well when server rendering, and the only way to do that properly is to use percentage width/left because
   * we don't know exactly what the browser viewport is.
   * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
   * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
   *
   * @param  {Object} pos Position object with width, height, left, top.
   * @return {Object}     Style object.
   */
  createStyle(pos) {
    const { usePercentages, containerWidth, useCSSTransforms } = this.props

    let style
    // CSS Transforms support (default)
    if (useCSSTransforms) {
      style = setTransform(pos)
    } else {
      // top,left (slow)
      style = setTopLeft(pos)

      // This is used for server rendering.
      if (usePercentages) {
        style.left = perc(pos.left / containerWidth)
        style.width = perc(pos.width / containerWidth)
      }
    }

    return style
  }

  /**
   * Mix a Draggable instance into a child.
   * @param  {Element} child    Child element.
   * @return {Element}          Child wrapped in Draggable.
   */
  mixinDraggable(child, isDraggable) {
    return (
      <DraggableCore
        disabled={!isDraggable}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.handle}
        cancel={
          '.react-resizable-handle' +
          (this.props.cancel ? ',' + this.props.cancel : '')
        }
        scale={this.props.transformScale}
      >
        {child}
      </DraggableCore>
    )
  }

  /**
   * Mix a Resizable instance into a child.
   * @param  {Element} child    Child element.
   * @param  {Object} position  Position object (pixel values)
   * @return {Element}          Child wrapped in Resizable.
   */
  mixinResizable(child, position, isResizable) {
    const {
      cols,
      x,
      minW,
      minH,
      maxW,
      maxH,
      transformScale,
      resizeHandles,
      resizeHandle,
    } = this.props
    const positionParams = this.getPositionParams()

    // This is the max possible width - doesn't go to infinity because of the width of the window
    const maxWidth = calcGridItemPosition(positionParams, 0, 0, cols - x, 0)
      .width

    // Calculate min/max constraints using our min & maxes
    const mins = calcGridItemPosition(positionParams, 0, 0, minW, minH)
    const maxes = calcGridItemPosition(positionParams, 0, 0, maxW, maxH)
    const minConstraints = [mins.width, mins.height]
    const maxConstraints = [
      Math.min(maxes.width, maxWidth),
      Math.min(maxes.height, Infinity),
    ]
    return (
      <Resizable
        draggableOpts={{
          disabled: !isResizable,
        }}
        className={isResizable ? undefined : 'react-resizable-hide'}
        width={position.width}
        height={position.height}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        onResizeStop={this.onResizeStop}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        transformScale={transformScale}
        resizeHandles={resizeHandles}
        handle={resizeHandle}
      >
        {child}
      </Resizable>
    )
  }

  /**
   * onDragStart event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node, delta and position information
   */
  onDragStart = (e, { node }) => {
    const { onDragStart } = this.props
    if (!onDragStart) return

    const newPosition = { top: 0, left: 0 }

    // TODO: this wont work on nested parents
    const { offsetParent } = node
    if (!offsetParent) return
    const parentRect = offsetParent.getBoundingClientRect()
    const clientRect = node.getBoundingClientRect()
    const cLeft = clientRect.left / this.props.transformScale
    const pLeft = parentRect.left / this.props.transformScale
    const cTop = clientRect.top / this.props.transformScale
    const pTop = parentRect.top / this.props.transformScale
    newPosition.left = cLeft - pLeft + offsetParent.scrollLeft
    newPosition.top = cTop - pTop + offsetParent.scrollTop
    this.setState({ dragging: newPosition })

    // Call callback with this data
    const { x, y } = calcXY(
      this.getPositionParams(),
      newPosition.top,
      newPosition.left,
      this.props.w,
      this.props.h
    )

    return onDragStart.call(this, this.props.i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  /**
   * onDrag event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node, delta and position information
   */
  onDrag = (e, { node, deltaX, deltaY }) => {
    const { onDrag, transformScale } = this.props
    if (!onDrag) return
    deltaX /= transformScale
    deltaY /= transformScale

    if (!this.state.dragging) {
      throw new Error('onDrag called before onDragStart.')
    }
    let top = this.state.dragging.top + deltaY
    let left = this.state.dragging.left + deltaX

    const { isBounded, i, w, h, containerWidth } = this.props
    const positionParams = this.getPositionParams()

    // Boundary calculations; keeps items within the grid
    if (isBounded) {
      const { offsetParent } = node

      if (offsetParent) {
        const { margin, rowHeight } = this.props
        const bottomBoundary =
          offsetParent.clientHeight - calcGridItemWHPx(h, rowHeight, margin[1])
        top = clamp(top, 0, bottomBoundary)

        const colWidth = calcGridColWidth(positionParams)
        const rightBoundary =
          containerWidth - calcGridItemWHPx(w, colWidth, margin[0])
        left = clamp(left, 0, rightBoundary)
      }
    }

    const newPosition = { top, left }
    this.setState({ dragging: newPosition })

    // Call callback with this data
    const { x, y } = calcXY(positionParams, top, left, w, h)
    return onDrag.call(this, i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  /**
   * onDragStop event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node, delta and position information
   */
  onDragStop = (e, { node }) => {
    const { onDragStop } = this.props
    if (!onDragStop) return

    if (!this.state.dragging) {
      throw new Error('onDragEnd called before onDragStart.')
    }
    const { w, h, i } = this.props
    const { left, top } = this.state.dragging
    const newPosition = { top, left }
    this.setState({ dragging: null })

    const { x, y } = calcXY(this.getPositionParams(), top, left, w, h)

    return onDragStop.call(this, i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  /**
   * onResizeStop event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResizeStop = (e, callbackData) => {
    this.onResizeHandler(e, callbackData, 'onResizeStop')
  }

  /**
   * onResizeStart event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResizeStart = (e, callbackData) => {
    this.onResizeHandler(e, callbackData, 'onResizeStart')
  }

  /**
   * onResize event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResize = (e, callbackData) => {
    this.onResizeHandler(e, callbackData, 'onResize')
  }

  /**
   * Wrapper around drag events to provide more useful data.
   * All drag events call the function with the given handler name,
   * with the signature (index, x, y).
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  onResizeHandler(e, { node, size }, handlerName) {
    const handler = this.props[handlerName]
    if (!handler) return
    const { cols, x, y, i, maxH, minH } = this.props
    let { minW, maxW } = this.props

    // Get new XY
    let { w, h } = calcWH(
      this.getPositionParams(),
      size.width,
      size.height,
      x,
      y
    )

    // minW should be at least 1 (TODO propTypes validation?)
    minW = Math.max(minW, 1)

    // maxW should be at most (cols - x)
    maxW = Math.min(maxW, cols - x)

    // Min/max capping
    w = clamp(w, minW, maxW)
    h = clamp(h, minH, maxH)

    this.setState({ resizing: handlerName === 'onResizeStop' ? null : size })

    handler.call(this, i, w, h, { e, node, size })
  }

  render() {
    const {
      x,
      y,
      w,
      h,
      isDraggable,
      isResizable,
      droppingPosition,
      useCSSTransforms,
    } = this.props

    const pos = calcGridItemPosition(
      this.getPositionParams(),
      x,
      y,
      w,
      h,
      this.state
    )
    const child = React.Children.only(this.props.children)

    // Create the child element. We clone the existing element but modify its className and style.
    let newChild = React.cloneElement(child, {
      className: classNames(
        'react-grid-item',
        child.props.className,
        this.props.className,
        {
          static: this.props.static,
          resizing: Boolean(this.state.resizing),
          'react-draggable': isDraggable,
          'react-draggable-dragging': Boolean(this.state.dragging),
          dropping: Boolean(droppingPosition),
          cssTransforms: useCSSTransforms,
        }
      ),
      // We can set the width and height on the child, but unfortunately we can't set the position.
      style: {
        ...this.props.style,
        ...child.props.style,
        ...this.createStyle(pos),
      },
    })

    // Resizable support. This is usually on but the user can toggle it off.
    newChild = this.mixinResizable(newChild, pos, isResizable)

    // Draggable support. This is always on, except for with placeholders.
    newChild = this.mixinDraggable(newChild, isDraggable)

    return newChild
  }
}
export default GridItem
