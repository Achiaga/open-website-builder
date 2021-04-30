import { Resizable } from 're-resizable'
import { useEffect, useState } from 'react'

const ResizeWrapper = ({
  width,
  height,
  blockId,
  onResizeStop,
  isTextBlock,
  handleResize,
  children,
}) => {
  const [isOver, setIsOver] = useState(false)
  useEffect(() => {
    setIsOver()
  }, [])
  return (
    <Resizable
      size={{ width, height }}
      defaultSize={{ width, height }}
      key={blockId}
      style={{
        position: 'absolute',
        zIndex: 2,
        outline: '2px solid',
        outlineColor: isOver ? '#43E28E' : 'transparent',
        transition: 'outline-color .3s',
      }}
      onResizeStop={onResizeStop}
      enable={{
        top: false,
        right: isTextBlock ? true : false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: isTextBlock ? false : true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={handleResize}
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      handleStyles={
        isOver && {
          bottomRight: {
            border: '1px solid blue',
            background: 'white',
            borderRadius: '2px',
            zIndex: 2,
          },
          right: {
            border: '1px solid blue',
            background: 'white',
            borderRadius: '2px',
            zIndex: 2,
          },
        }
      }
    >
      {children}
    </Resizable>
  )
}
export default ResizeWrapper
