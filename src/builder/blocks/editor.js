import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editBlockConfig,
  getGridRowHeight,
  getIsMobileBuilder,
} from '../../features/builderSlice'
import {
  ButtonSelector,
  CustomToolTip,
  DuplicateButton,
} from './block-modifiers'
import { color, deleteProperty, duplicateProperty } from './block-properties'
import { EDIT } from './constants'
import { BuilderPrevText } from './text'

const ReactQuill =
  // eslint-disable-next-line no-undef
  typeof window === 'object' ? require('react-quill') : () => {}

const ToolbarButton = ({ name }) => {
  return (
    <CustomToolTip label={'Italic Font'}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        h="100%"
        px="0.45rem"
        _hover={{ background: 'primary.100' }}
      >
        <Box as="button" className={'ql-' + name} />
      </Box>
    </CustomToolTip>
  )
}
const ToolbarSelect = ({ name }) => {
  return (
    <CustomToolTip label={'Align Fonts'}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        h="100%"
        px="0.45rem"
        _hover={{ background: 'primary.100' }}
      >
        <select className={'ql-' + name} />
      </Box>
    </CustomToolTip>
  )
}

const ToolbarColor = () => {
  return (
    <CustomToolTip label={'Font Color'}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        h="100%"
        px="0.45rem"
        _hover={{ background: 'primary.100' }}
      >
        <select className="ql-color">
          {color.options.map((colorOption, index) => {
            return <option value={colorOption.value} key={index} />
          })}
        </select>
      </Box>
    </CustomToolTip>
  )
}

function QuillToolbar() {
  return (
    <>
      <select
        className="ql-header"
        defaultValue={''}
        onChange={(e) => e.persist()}
      >
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
        <option value="6" />
        <option selected />
      </select>
      <ToolbarButton name="italic" />
      <ToolbarButton name="link" />
      <ToolbarButton name="bold" />
      <ToolbarButton name="blockquote" />
      <ToolbarButton name="underline" />
      <ToolbarSelect name="align" />
      <ToolbarColor />
    </>
  )
}

export const CustomToolbar = ({ blockId }) => {
  const dispatch = useDispatch()

  function handleEdit(_, __, operationType = EDIT) {
    dispatch(editBlockConfig({ blockId, operationType }))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="left"
      top="-50px"
      boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      pos="absolute"
      onClick={(e) => e.stopPropagation()}
      backgroundColor="white"
      color="gray.500"
      zIndex="9999"
      borderRadius="20px"
      fontSize="xs"
      h="35px"
    >
      <ButtonSelector handleEdit={handleEdit} {...deleteProperty} />
      <Box
        id="toolbar"
        display="flex"
        alignItems="center"
        justifyContent="left"
      >
        {QuillToolbar()}
      </Box>
      <DuplicateButton handleEdit={handleEdit} {...duplicateProperty} />
    </Box>
  )
}

const formats = [
  'header',
  // 'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'align',
  // 'emoji',
]

function ReactQuillEditor(onChange, text, placeholder, modules) {
  return (
    <ReactQuill
      onChange={onChange}
      value={text}
      placeholder={placeholder}
      modules={modules}
      formats={formats}
      theme={'snow'}
    />
  )
}

const Editor = ({ data, selectedId, handleChange, blockId, placeholder }) => {
  const [text, setText] = useState(data.text)
  const rowHeight = useSelector(getGridRowHeight)
  const isMobile = useSelector(getIsMobileBuilder)
  function onChange(html) {
    setText(html)
    handleChange(html)
  }
  const isSelected = selectedId === blockId
  if (!isSelected || isMobile)
    return <BuilderPrevText data={{ ...data, rowHeight }} />
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
    clipboard: {
      matchVisual: true,
    },
  }

  return (
    <Box className="text-editor" h="100%">
      <Box d={isSelected ? 'block' : 'none'}>
        <CustomToolbar blockId={blockId} />
      </Box>
      {ReactQuillEditor(onChange, text, placeholder, modules, formats)}
    </Box>
  )
}

export default Editor
