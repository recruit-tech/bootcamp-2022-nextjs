import { User } from '@/prisma'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Page: NextPage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const router = useRouter()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        // [3] 保持した入力値を stringify し、body を作成
        const body = JSON.stringify({ name, email })
        // [4] /pages/api/users に、POST リクエストを送る
        fetch('/api/users', {
          method: 'POST',
          body,
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then(({ user }: { user: User }) => {
            // [10] 作成成功した場合、ユーザー詳細画面に遷移する
            router.push(`/users/${user.id}`)
          })
          .catch((err) => {
            console.log(err)
          })
      }}
    >
      <h1>Create User</h1>
      <section>
        <label>
          Name：
          <input
            type="text"
            value={name}
            onChange={(event) => {
              // [1] 入力された氏名を、状態に保持
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
              // [2] 入力されたメアドを、状態に保持
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
