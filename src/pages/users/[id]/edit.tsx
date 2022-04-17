import { prisma, User } from '@/prisma'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  user: User
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const now = new Date().toISOString()
  if (!ctx.params || typeof ctx.params.id !== 'string') throw new Error('400')
  const user = await prisma.user.findUnique({ where: { id: +ctx.params.id } })
  if (!user) throw new Error('404')
  return { props: { user, now } }
}

const Page: NextPage<Props> = ({ user }) => {
  const [name, setName] = React.useState(user.name || '')
  const [email, setEmail] = React.useState(user.email)
  const router = useRouter()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const body = JSON.stringify({ name, email })
        fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          body,
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then(({ user }: { user: User }) => {
            router.push(`/users/${user.id}`)
          })
          .catch((err) => {
            console.log(err)
          })
      }}
    >
      <h1>Update User</h1>
      <section>
        <label>
          Name：
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.currentTarget.value)
            }}
          />
        </label>
      </section>
      <section>
        <label>
          Email：
          <input
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value)
            }}
          />
        </label>
      </section>
      <hr />
      <section>
        <button>submit</button>
      </section>
    </form>
  )
}

export default Page
