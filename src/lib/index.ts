import axios from 'axios'
import { toast } from 'sonner'

export const downloadSVG = (documentObject: Document) => {
  const canvas = documentObject.getElementById(
    'react-qrcode-logo'
  ) as HTMLCanvasElement
  if (canvas) {
    const scaleFactor = window.devicePixelRatio || 2
    const highQualityCanvas = documentObject.createElement('canvas')
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
      const link = documentObject.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'qrcode.svg'
      link.click()
    }
  }
}

export const generateQrCode = async (
  domain: string,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setUploading(true)
    const { data } = await axios.post('/api', { domain })
    setUploading(false)
    return data.qrCode
  } catch (err) {
    setUploading(false)
  }
}
