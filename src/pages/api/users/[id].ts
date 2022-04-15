import { User } from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { user: User } | { err: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query)
  switch (req.method) {
    case 'PUT':
      // 課題４：req.query から id を取得し、PrismaClient でユーザーを更新してみて
      res.status(501).json({ err: 'Not Implemented' })
      break
    case 'DELETE':
      // 課題５：req.query から id を取得し、PrismaClient でユーザーを物理削除してみて
      res.status(501).json({ err: 'Not Implemented' })
      break
    default:
      res.status(405).json({ err: 'Method Not Allowed' })
  }
}
