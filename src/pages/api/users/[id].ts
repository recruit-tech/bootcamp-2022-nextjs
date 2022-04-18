import { prisma, User } from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { user: User } | { err: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query)
  const id = req.query.id
  if (typeof id != 'string') {
    res.status(400).json({ err: 'error' })
    return
  }
  const idNumber: number = +id
  switch (req.method) {
    case 'PUT':
      // 課題４：req.query から id を取得し、PrismaClient でユーザーを更新してみて
      prisma.user
        .update({
          where: {
            id: idNumber
          },
          data: {
            name: req.body.name,
            email: req.body.email
          }
        })
        .then((user) => {
          res.status(200).json({ user })
        })
        .catch(() => {
          res.status(500).json({ err: 'error' })
        })
      break
    case 'DELETE':
      // 課題５：req.query から id を取得し、PrismaClient でユーザーを物理削除してみて
      prisma.user.delete({
        where: {
          id: idNumber
        }
      })
      .then(() => {
        res.status(200).end()
      })
      .catch(() => {
        res.status(500).json({ err: 'error' })
      })
      break
    default:
      res.status(405).json({ err: 'Method Not Allowed' })
  }
}
