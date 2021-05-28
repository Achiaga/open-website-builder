import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import { HiLink } from 'react-icons/hi'
import {
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignTop,
} from 'react-icons/ai'
import ShadowIcon from '../../assets/shadow-icon'
import BorderRadiusIcon from '../../assets/border-radius-icon'
import BorderIcon from '../../assets/border-icon'
import ImageIcon from '../../assets/image-icon'
import { emojis } from '../../assets/emojis'
import DuplicateIcon from '../../assets/duplicate-icon'

import { FontIcon, BgIcon } from '../../assets/fontIcon'

import { DELETE, DUPLICATE } from './constants'
import { MdOpacity } from 'react-icons/md'

// Text

const fontSize = {
  type: 'dropdown',
  property: 'fontSize',
  tooltip: 'font size',
  options: [
    { value: '12', title: 'xs' },
    { value: '18', title: 'sm' },
    { value: '24', title: 'md' },
    { value: '30', title: 'lg' },
    { value: '36', title: 'xl' },
    { value: '42', title: '2xl' },
    { value: '46', title: '3xl' },
    { value: '52', title: '4xl' },
  ],
}
const textAlign = {
  type: 'dropdown',
  property: 'textAlign',
  tooltip: 'Align Item Horizontally',
  options: [
    { value: 'left', title: <FiAlignLeft /> },
    { value: 'center', title: <FiAlignCenter /> },
    { value: 'right', title: <FiAlignRight /> },
  ],
}
const alignItems = {
  type: 'dropdown',
  property: 'alignItems',
  tooltip: 'Align Item Vertically',
  options: [
    { value: 'start', title: <AiOutlineVerticalAlignTop /> },
    { value: 'center', title: <AiOutlineVerticalAlignMiddle /> },
    { value: 'end', title: <AiOutlineVerticalAlignBottom /> },
  ],
}
const fontWeight = {
  type: 'dropdown',
  property: 'fontWeight',
  tooltip: 'Bold Text',
  options: [
    { value: '300', title: 'thin' },
    { value: '400', title: 'normal' },
    { value: '500', title: 'semibold' },
    { value: '700', title: 'bold' },
    { value: '900', title: 'super-bold' },
  ],
}
export const color = {
  type: 'colorDropdown',
  property: 'fontColor',
  tooltip: 'Text Color',
  options: [
    {
      value: '#000000',
      title: 'black',
      icon: <FontIcon fontColor="#000000" />,
    },
    {
      value: 'rgb(155,154,151)',
      title: 'gray',
      icon: <FontIcon fontColor="rgb(155,154,151)" />,
    },
    {
      value: 'rgb(100,71,58)',
      title: 'brown',
      icon: <FontIcon fontColor="rgb(100,71,58)" />,
    },
    {
      value: 'rgb(217,115,13)',
      title: 'orange',
      icon: <FontIcon fontColor="rgb(217,115,13)" />,
    },
    {
      value: 'rgb(223,171,1)',
      title: 'yellow',
      icon: <FontIcon fontColor="rgb(223,171,1)" />,
    },
    {
      value: 'rgb(15,123,108)',
      title: 'green',
      icon: <FontIcon fontColor="rgb(15,123,108)" />,
    },
    {
      value: 'rgb(11,110,153)',
      title: 'blue',
      icon: <FontIcon fontColor="rgb(11,110,153)" />,
    },
    {
      value: 'rgb(105,64,165)',
      title: 'purple',
      icon: <FontIcon fontColor="rgb(105,64,165)" />,
    },
    {
      value: 'rgb(173,26,114)',
      title: 'pink',
      icon: <FontIcon fontColor="rgb(173,26,114)" />,
    },
    {
      value: 'rgb(224,62,62)',
      title: 'red',
      icon: <FontIcon fontColor="rgb(224,62,62)" />,
    },
    {
      value: '#ffffff',
      title: 'white',
      icon: <FontIcon fontColor="#ffffff" />,
    },
  ],
}

// Block

const border = {
  type: 'dropdown',
  property: 'border',
  tooltip: 'Border Color',
  icon: <BorderIcon />,
  options: [
    { value: 'none', title: '-' },
    { value: '1px solid #000000', title: 'black' },
    { value: '1px solid #cdd3d8', title: 'gray' },
  ],
}

const borderRadius = {
  type: 'dropdown',
  property: 'borderRadius',
  tooltip: 'Round Corners',
  icon: <BorderRadiusIcon />,
  options: [
    { value: '0px', title: '-' },
    { value: '10px', title: 'sm' },
    { value: '20px', title: 'md' },
    { value: '100px', title: 'lg' },
    { value: '100%', title: 'circle' },
  ],
}
const opacitySelector = {
  type: 'dropdown',
  property: 'opacity',
  tooltip: 'Image opacity',
  icon: <MdOpacity />,
  options: [
    { value: '0', title: '-' },
    { value: '0.2', title: 'low' },
    { value: '0.4', title: 'medium' },
    { value: '0.6', title: 'high' },
    { value: '0.8', title: 'dark' },
  ],
}

const boxShadow = {
  type: 'dropdown',
  property: 'boxShadow',
  tooltip: 'Shadow',
  icon: <ShadowIcon />,
  options: [
    {
      value: 'none',
      title: '-',
    },
    {
      value:
        'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      title: 'sm',
    },
    {
      value:
        '0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)',
      title: 'md',
    },
    {
      value: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
      title: 'lg',
    },
    {
      value:
        'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
      title: 'in',
    },
  ],
}

const textShadow = {
  type: 'dropdown',
  property: 'textShadow',
  tooltip: 'Text Shadow',
  icon: <ShadowIcon />,
  options: [
    {
      value: 'none',
      title: 'none',
    },
    {
      value: '2px 2px #565656',
      title: 'sm',
    },
    {
      value: '6px 4px #0000009e',
      title: 'md',
    },
    {
      value: '7px 2px #000000',
      title: 'lg',
    },
  ],
}

// Common

const backgroundColor = {
  type: 'colorDropdown',
  property: 'backgroundColor',
  tooltip: 'Background Color',
  options: [
    {
      value: 'transparent',
      title: 'none',
      icon: <BgIcon bgColor="transparent" />,
    },
    {
      value: '#85603f',
      title: 'brown',
      icon: <BgIcon bgColor="#85603f" />,
    },
    {
      value: '#E65F0C',
      title: 'orange',
      icon: <BgIcon bgColor="#E65F0C" />,
    },
    {
      value: 'rgb(255, 195, 0)',
      title: 'yellow',
      icon: <BgIcon bgColor="rgb(255, 195, 0)" />,
    },
    {
      value: '#00BA5E',
      title: 'green',
      icon: <BgIcon bgColor="#00BA5E" />,
    },
    {
      value: '#1f441e',
      title: 'green',
      icon: <BgIcon bgColor="#1f441e" />,
    },
    {
      value: '#39b2ab',
      title: 'green2',
      icon: <BgIcon bgColor="#39b2ab" />,
    },
    {
      value: '#4CB0EA',
      title: 'blue',
      icon: <BgIcon bgColor="#4CB0EA" />,
    },
    {
      value: '#28527a',
      title: 'blue',
      icon: <BgIcon bgColor="#28527a" />,
    },
    {
      value: '#E112FC',
      title: 'purple',
      icon: <BgIcon bgColor="#E112FC" />,
    },
    {
      value: '#693c72',
      title: 'purple',
      icon: <BgIcon bgColor="#693c72" />,
    },
    {
      value: '#f2dbe1',
      title: 'pink',
      icon: <BgIcon bgColor="#f2dbe1" />,
    },
    {
      value: 'rgb(233, 161, 185)',
      title: 'pink',
      icon: <BgIcon bgColor="rgb(233, 161, 185)" />,
    },
    {
      value: '#f7484e',
      title: 'red',
      icon: <BgIcon bgColor="#f7484e" />,
    },
    {
      value: 'rgb(220, 220, 220)',
      title: 'gray',
      icon: <BgIcon bgColor="rgb(220, 220, 220)" />,
    },
    {
      value: '#292929',
      title: 'gray',
      icon: <BgIcon bgColor="#292929" />,
    },
    {
      value: '#000000',
      title: 'black',
      icon: <BgIcon bgColor="#000000" />,
    },
    {
      value: '#FFFFFF',
      title: 'white',
      icon: <BgIcon bgColor="#FFFFFF" />,
    },
  ],
}

const emoji = {
  type: 'emojiDropdown',
  property: 'emoji',
  tooltip: 'Add Emoji to the Text',
  icon: '😋',
  options: emojis,
}

export const deleteProperty = {
  type: 'button',
  tooltip: 'Delete ( Blocks attached to this block will be delted).',
  placeholder: <RiDeleteBin6Line color="black" size="0.9rem" />,
  property: '',
  operationType: DELETE,
}
export const duplicateProperty = {
  type: 'duplicate',
  tooltip: 'Duplicate block/group',
  placeholder: <DuplicateIcon color="black" size="0.7rem" />,
  property: '',
  operationType: DUPLICATE,
}

const imageSelector = {
  type: 'image',
  icon: <ImageIcon />,
  tooltip: 'Select an Image',
  inputPlaceholder: 'Enter your link',
  property: 'imageUrl',
}

export const redirectInput = {
  type: 'text',
  icon: <HiLink size="1.1rem" />,
  tooltip: 'Add a Link you want the user to be redirect to when click on it.',
  inputPlaceholder: 'Add a link to redirect when click',
  property: 'redirect',
}

export const gradientColor = {
  type: 'textGradient',
  property: 'gradientColor',
  tooltip: 'Gradient Background Color',
  inputPlaceholder1: '#FFFFFF',
  inputPlaceholder2: '#000000',
}

export const Properties = {
  text: [
    deleteProperty,
    fontSize,
    textAlign,
    alignItems,
    fontWeight,
    textShadow,
    emoji,
    color,
    duplicateProperty,
  ],

  image: [
    deleteProperty,
    borderRadius,
    boxShadow,
    imageSelector,
    opacitySelector,
    redirectInput,
    duplicateProperty,
  ],
  inception: [
    deleteProperty,
    border,
    borderRadius,
    boxShadow,
    imageSelector,
    opacitySelector,
    backgroundColor,
    gradientColor,
    redirectInput,
    duplicateProperty,
  ],
  form: [
    deleteProperty,
    border,
    borderRadius,
    boxShadow,
    backgroundColor,
    duplicateProperty,
  ],
  button: [
    deleteProperty,
    border,
    borderRadius,
    boxShadow,
    color,
    backgroundColor,
    gradientColor,
    redirectInput,
    duplicateProperty,
  ],
}
