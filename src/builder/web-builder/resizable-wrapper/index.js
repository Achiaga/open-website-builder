import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

const Resizable = dynamic(() =>
  import('re-resizable').then((mod) => mod.Resizable)
)

const ReizeHandlesInitialValue = {
  top: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomLeft: false,
  topLeft: false,
}

const ResizeWrapper = ({
  width,
  height,
  blockId,
  onResizeStop,
  isTextBlock,
  handleResize,
  isSelected,
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
        outlineColor: isOver ? '#586ee0' : 'transparent',
        transition: 'outline-color .3s',
      }}
      onResizeStop={onResizeStop}
      enable={{
        ...ReizeHandlesInitialValue,
        right: isTextBlock ? true : false,
        bottomRight: isTextBlock ? false : true,
      }}
      onResize={handleResize}
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      handleStyles={
        (isOver || isSelected) && {
          bottomRight: {
            background:
              'linear-gradient(0,rgba(255,255,255,0.5),rgba(255,255,255,0.5)),#f6f6f9',
            boxShadow:
              '0 0 6px rgb(27 24 60 / 10%), 0 0 2px rgb(39 34 93 / 75%)',
            zIndex: 4,
            borderRadius: '10px',
          },
          right: {
            background:
              'linear-gradient(0,rgba(255,255,255,0.5),rgba(255,255,255,0.5)),#f6f6f9',
            boxShadow:
              '0 0 6px rgb(27 24 60 / 10%), 0 0 2px rgb(39 34 93 / 75%)',
            borderRadius: '50px',
            margin: 'auto',
            height: '30%',
            minHeight: '30px',
            top: '50%',
            zIndex: 4,
            transform: 'translate(0px, -50%)',
          },
        }
      }
    >
      {children}
    </Resizable>
  )
}
export default ResizeWrapper
