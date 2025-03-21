'use client'

import { QrCode } from '@prisma/client'
import { useState } from 'react'
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5'

const Item = ({ item }: { item: QrCode }) => {
  const [copied, setCopied] = useState<boolean>(false)
  return (
    <div
      key={item.id}
      className='bg-white px-5 py-3 rounded-[10px] shadow-2xl shadow-white/30 w-full flex items-center justify-between'
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(item.domain)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 3000)
        }}
        disabled={copied}
        className='flex items-center gap-2 cursor-pointer'
      >
        {!copied ? (
          <IoCopyOutline className='text-lg' />
        ) : (
          <IoCheckmark className='text-lg' />
        )}
        {item.domain}
      </button>

      <span>#{item.id}</span>
    </div>
  )
}

export default Item
