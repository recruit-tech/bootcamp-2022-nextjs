import { prisma, User } from '@/prisma'
import type { GetServerSideProps, NextPage, NextComponentType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  user: User
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const now = new Date().toISOString()
  // 課題１：エラー「オブジェクトは 'undefined' である可能性があります」を消すには？
  if (!ctx.params || typeof ctx.params.id !== 'string') {
    throw new Error('400')
  }
  const user = await prisma.user.findUnique({ where: { id: +ctx.params.id } })
  // 課題２：const user: User | null の推論を、const user: User にするためには？
  if (!user) {
    throw new Error('404')
  }
  return { props: { user, now } }
}

const DeleteButton: React.FC<Props> = (props) => {
  const router = useRouter()
  return (
    <button onClick={() => {
      fetch(`/api/users/${props.user.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        router.push(`/users`)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    }>
      Delete
    </button>
  )
}

const Page: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>User</h1>
      {/* 課題３：ユーザー詳細を表示してみて */}
      <h2>{props.user.name}</h2>
      <h4>{props.user.email}</h4>
      <Link href={`/users/${props.user.id}/edit`}>
        編集する
      </Link>
      <DeleteButton {...props}></DeleteButton>
      <hr />
      <p>{props.now}</p>
    </div>
  )
}

export default Page
