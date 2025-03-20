'use client'

import { QRCode } from 'react-qrcode-logo'
import { useState } from 'react'
import {
  inputClassName,
  inputContainerClassName,
  labelClassName,
} from '@/config/styles'
import { Input } from './ui/input'
import ColorPicker from './ColorPicker'

const Generator = () => {
  const [domain, setDomain] = useState<string>('https://example.com')
  const [size, setSize] = useState<string>('200')
  const [bgColor, setBgColor] = useState<string>('#FFFFFF')
  const [fgColor, setFgColor] = useState<string>('#000')

  return (
    <div className='w-fit h-fit flex items-start gap-8 p-6 rounded-[15px] shadow-2xl'>
      <div className='w-[250px] flex flex-col items-start gap-3'>
        <div className={inputContainerClassName}>
          <label htmlFor='domain' className={labelClassName}>
            Domain
          </label>
          <Input
            value={domain}
            id='domain'
            onChange={(e) => {
              const value = e.target.value

              setDomain(value)
            }}
            className={inputClassName}
          />
        </div>
        <div className={inputContainerClassName}>
          <label htmlFor='size' className={labelClassName}>
            Size
          </label>
          <Input
            value={size}
            id='size'
            onChange={(e) => {
              const value = Number(e.target.value)
              if (!Number.isInteger(value)) return

              setSize(e.target.value)
            }}
            className={inputClassName}
          />
        </div>

        <div className={inputContainerClassName}>
          <h4 className={labelClassName}>Colors</h4>
          <div className='w-full flex flex-col items-start gap-2.5'>
            <div className={inputContainerClassName}>
              <h4 className='text-[15px]'>Background</h4>
              <ColorPicker color={bgColor} setColor={setBgColor} />
            </div>
            <div className={inputContainerClassName}>
              <h4 className='text-[15px]'>Foreground</h4>
              <ColorPicker color={fgColor} setColor={setFgColor} />
            </div>
          </div>
        </div>
      </div>
      <QRCode
        value={domain}
        size={Number(size) || 150}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </div>
  )
}

export default Generator
