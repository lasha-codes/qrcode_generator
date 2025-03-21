import { NextResponse } from 'next/server'
import { prisma } from './db/prisma'

export const POST = async (req: Request) => {
  try {
    const { domain } = await req.json()

    const exists = await prisma.qrCode.findUnique({
      where: {
        domain,
      },
    })

    let qrCode = null

    if (!exists) {
      qrCode = await prisma.qrCode.create({
        data: {
          domain,
        },
      })
    }

    return NextResponse.json({ qrCode }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: err }, { status: 500 })
  }
}
