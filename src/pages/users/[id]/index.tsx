import { prisma, User } from '@/prisma'
import type { GetServerSideProps, NextPage } from 'next'

type Props = {
  user: User
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const now = new Date().toISOString()
  // 課題１：エラー「オブジェクトは 'undefined' である可能性があります」を消すには？
  const user = await prisma.user.findUnique({ where: { id: +ctx.params.id } })
  // 課題２：const user: User | null の推論を、const user: User にするためには？
  return { props: { user, now } }
}

const Page: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>User</h1>
      {/* 課題３：ユーザー詳細を表示してみて */}
    </div>
  )
}

export default Page
