import { prisma, User } from '@/prisma'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

type Props = {
  users: User[]
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const now = new Date().toISOString()
  const users = await prisma.user.findMany()
  return { props: { users, now } }
}

const Page: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <p>{props.now}</p>
    </div>
  )
}

export default Page
