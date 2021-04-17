import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editBlockConfig,
  getGridRowHeight,
  getIsMobileBuilder,
} from '../../features/builderSlice'
import { ButtonSelector, TextInput } from './block-modifiers'
import {
  deleteProperty,
  duplicateProperty,
  redirectInput,
} from './block-properties'
import { EDIT } from './constants'
import 'quill-emoji/dist/quill-emoji.css'
import { BuilderPrevText } from './text'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => {}
const quillEmoji =
  typeof window === 'object' ? require('quill-emoji') : () => {}
const { EmojiBlot } = quillEmoji

ReactQuill.register &&
  ReactQuill?.register(
    {
      'formats/emoji': EmojiBlot,
    },
    true
  )

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
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-blockquote" />
      <button className="ql-link" />
      {/* <select className="ql-align" /> */}
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
    </>
  )
}

export const CustomToolbar = ({ blockId }) => {
  const [isOpen, setIsOpen] = useState('')
  const dispatch = useDispatch()

  const handleOpenToolbar = (e) => {
    const { id } = e.currentTarget
    setIsOpen(id)
  }

  function handleEdit(id, value, operationType = EDIT) {
    dispatch(editBlockConfig({ blockId, operationType }))
  }

  return (
    <Box
      id="toolbar"
      display="flex"
      alignItems="center"
      justifyContent="left"
      top="-50px"
      rounded="5px"
      boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      pos="absolute"
      onClick={(e) => e.stopPropagation()}
      backgroundColor="white"
      color="black"
      zIndex="9999"
    >
      {QuillToolbar()}
      <ButtonSelector handleEdit={handleEdit} {...deleteProperty} />
      <ButtonSelector handleEdit={handleEdit} {...duplicateProperty} />
      <TextInput
        isOpen={isOpen}
        handleOpenToolbar={handleOpenToolbar}
        isBlockAtTop={false}
        isBlockAtLeft={false}
        isBlockAtRight={false}
        handleEdit={handleEdit}
        {...redirectInput}
        value={''}
      />
    </Box>
  )
}

const formats = [
  'header',
  'font',
  'size',
  'link',
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
  // 'align',
  'emoji',
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
      // style={{ height: '100%' }}
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
