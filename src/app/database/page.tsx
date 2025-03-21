import Item from '@/components/Item'
import { prisma } from '../api/db/prisma'

const Database = async () => {
  const qrCodes = await prisma.qrCode.findMany({
    take: 40,
  })
  return (
    <div className='h-screen bg-[#1D1D1D] p-10 flex flex-col items-center gap-3'>
      {qrCodes.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Database
