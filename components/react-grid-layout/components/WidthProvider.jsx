//
import * as React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

// eslint-disable-next-line no-unused-vars

/*
 * A simple HOC that provides facility for listening to container resizes.
 *
 * The Flow type is pretty janky here. I can't just spread `WPProps` into this returned object - I wish I could - but it triggers
 * a flow bug of some sort that causes it to stop typechecking.
 */
export default function WidthProvider(ComposedComponent) {
  return class WidthProvider extends React.Component {
    static defaultProps = {
      measureBeforeMount: false,
    }

    static propTypes = {
      // If true, will not render children until mounted. Useful for getting the exact width before
      // rendering, to prevent any unsightly resizing.
      measureBeforeMount: PropTypes.bool,
    }

    state = {
      width: 1280,
    }

    mounted = false

    componentDidMount() {
      this.mounted = true

      window.addEventListener('resize', this.onWindowResize)
      // Call to properly set the breakpoint and resize the elements.
      // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
      // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.
      this.onWindowResize()
    }

    componentWillUnmount() {
      this.mounted = false
      window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = () => {
      if (!this.mounted) return
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(this) // Flow casts this to Text | Element
      if (node instanceof HTMLElement)
        this.setState({ width: node.offsetWidth })
    }

    render() {
      const { measureBeforeMount, ...rest } = this.props
      if (measureBeforeMount && !this.mounted) {
        return <div className={this.props.className} style={this.props.style} />
      }

      return <ComposedComponent {...rest} {...this.state} />
    }
  }
}
