import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { name: string } | { error: { message: string } }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  res.setHeader('Cache-Control', 'max-age=10')
  res.status(200).json({ name: 'anonymous' })
}
