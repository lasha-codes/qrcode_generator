'use client'

import { QRCode } from 'react-qrcode-logo'
import { useRef, useState } from 'react'
import {
  inputClassName,
  inputContainerClassName,
  labelClassName,
} from '@/config/styles'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import ColorPicker from './ColorPicker'
import LogoUploader from './LogoUploader'
import { watermarks } from '@/config/watermarks'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import StylePicker from './StylePicker'
import { qrStyles } from '@/config/qrStyles'
import ValueSlider from './Slider'
import { Button } from './ui/button'
import { Canvg } from 'canvg'

const Generator = () => {
  const [domain, setDomain] = useState<string>(
    'https://tap-ping.com/qr/xxxxxxx'
  )
  const [size, setSize] = useState<string>('200')
  const [bgColor, setBgColor] = useState<string>('#FFFFFF')
  const [fgColor, setFgColor] = useState<string>('#000000')
  const [eyeColor, setEyeColor] = useState<string>('#000000')
  const [logo, setLogo] = useState<string>('')
  const [logoHeight, setLogoHeight] = useState<string>('')
  const [logoWidth, setLogoWidth] = useState<string>('')
  const [logoPadding, setLogoPadding] = useState<string>('')
  const [style, setStyle] = useState<(typeof qrStyles)[number]>('fluid')
  const [behindQrCode, setBehindQrCode] = useState<boolean>(false)
  const [eyeRadius, setEyeRadius] = useState<number>(15)

  const qrRef = useRef<QRCode | null>(null)

  const downloadSVG = () => {
    const canvas = document.getElementById(
      'react-qrcode-logo'
    ) as HTMLCanvasElement

    if (canvas) {
      const scaleFactor = window.devicePixelRatio || 2

      const highQualityCanvas = document.createElement('canvas')
      const ctx = highQualityCanvas.getContext('2d')

      if (ctx) {
        highQualityCanvas.width = canvas.width * scaleFactor
        highQualityCanvas.height = canvas.height * scaleFactor

        ctx.scale(scaleFactor, scaleFactor)
        ctx.drawImage(canvas, 0, 0)

        const highResDataURL = highQualityCanvas.toDataURL('image/png')

        const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" width="${highQualityCanvas.width}" height="${highQualityCanvas.height}">
                            <image href="${highResDataURL}" width="${highQualityCanvas.width}" height="${highQualityCanvas.height}" />
                          </svg>`

        const blob = new Blob([svgImage], { type: 'image/svg+xml' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'qrcode.svg'
        link.click()
      }
    }
  }

  return (
    <div className='w-fit max-sm:w-[90%] max-h-[95vh] h-fit flex flex-col items-center gap-8 p-5 rounded-[15px] shadow-2xl shadow-white/30 bg-white overflow-y-auto'>
      <div className='w-fit h-fit flex items-start gap-8 max-sm:flex-col max-sm:w-full'>
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
              <div className={inputContainerClassName}>
                <h4 className='text-[15px]'>Eye</h4>
                <ColorPicker color={eyeColor} setColor={setEyeColor} />
              </div>
            </div>
          </div>
          <div className={inputContainerClassName}>
            <label htmlFor='logo-padding' className={labelClassName}>
              Logo padding
            </label>
            <Input
              id='logo-padding'
              value={logoPadding}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (!Number.isInteger(value)) return
                setLogoPadding(e.target.value)
              }}
            />
          </div>
          <div className={inputContainerClassName}>
            <h3 className={labelClassName}>Logo</h3>
            <div className='w-full flex items-center gap-2'>
              <Input
                value={logoHeight}
                placeholder='Height'
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (!Number.isInteger(value)) return
                  setLogoHeight(e.target.value)
                }}
                className={inputClassName}
              />

              <IoClose className='min-w-[15px]' />

              <Input
                value={logoWidth}
                placeholder='Width'
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (!Number.isInteger(value)) return
                  setLogoWidth(e.target.value)
                }}
                className={inputClassName}
              />
            </div>
            <div
              onClick={() => setBehindQrCode((prev) => !prev)}
              className='mt-2 flex items-center gap-1 font-medium cursor-default'
            >
              Remove QrCode behind logo
              <Checkbox checked={behindQrCode} />
            </div>

            <LogoUploader setLogo={setLogo} />

            <div className='w-full flex items-center gap-3 flex-wrap mt-3'>
              {watermarks.map((src, idx) => (
                <Image
                  key={idx}
                  onClick={() => setLogo(src)}
                  src={src}
                  width={30}
                  height={30}
                  alt={src}
                  objectFit='contain'
                  className='cursor-pointer'
                />
              ))}
            </div>
          </div>

          <div className={inputContainerClassName}>
            <h4 className={labelClassName}>Pattern</h4>
            <StylePicker style={style} setStyle={setStyle} />
          </div>

          <div className={inputContainerClassName}>
            <h4 className={labelClassName}>Eye radius</h4>
            <ValueSlider
              max={100}
              defaultValue={15}
              step={1}
              onSlide={(value) => setEyeRadius(value / 3)}
            />
          </div>
        </div>

        <QRCode
          ref={qrRef}
          value={domain}
          size={Number(size) || 150}
          bgColor={bgColor}
          fgColor={fgColor}
          eyeColor={eyeColor}
          logoImage={logo}
          logoHeight={Number(logoHeight)}
          logoWidth={Number(logoWidth)}
          removeQrCodeBehindLogo={!behindQrCode}
          qrStyle={style}
          eyeRadius={eyeRadius}
          logoPadding={Number(logoPadding)}
          ecLevel='H'
        />
      </div>

      <Button onClick={downloadSVG} className={`w-full h-[45px]`}>
        Download
      </Button>
    </div>
  )
}

export default Generator
