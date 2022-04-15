import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies, setCookie } from 'nookies'

type Props = {
  now: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const now = new Date().toISOString()
  const cookies = parseCookies({ req: ctx.req })
  if (!cookies.myValue) {
    setCookie(ctx, 'myValue', now, {
      maxAge: 10,
      path: '/',
      httpOnly: true,
    })
  }
  ctx.res.setHeader('Cache-Control', 'no-store')
  return { props: { now } }
}

const Page: NextPage<Props> = ({ now }) => {
  return (
    <div>
      <h1>{now}</h1>
    </div>
  )
}

export default Page
