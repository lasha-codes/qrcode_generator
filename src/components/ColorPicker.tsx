'use client'

import { useCallback } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HexColorPicker } from 'react-colorful'

interface Props {
  setColor: React.Dispatch<React.SetStateAction<string>>
  color: string
}

const ColorPicker = ({ color, setColor }: Props) => {
  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor)
    },
    [setColor]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full flex items-center gap-2 rounded-[8px] overflow-hidden h-[33px] border'>
        <div
          style={{
            background: color,
          }}
          className='w-[33px] h-full border-r'
        />
        <span>{color}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <HexColorPicker color={color} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColorPicker
