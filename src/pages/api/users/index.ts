import { prisma, User } from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { user: User } | { err: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // [5] リクエスト method を調べる
  switch (req.method) {
    case 'POST':
      // [6] ORMでレコードを作成する
      prisma.user
        .create({ data: req.body })
        .then((user) => {
          // [7] レコード作成に成功したら、作成データをレスポンス
          res.status(200).json({ user })
        })
        .catch(() => {
          // [8] レコード作成に失敗したら、エラーをレスポンス
          res.status(500).json({ err: 'error' })
        })
      break
    default:
      // [9] POST method 以外は 405 を返す
      res.status(405).json({ err: 'Method Not Allowed' })
  }
}
