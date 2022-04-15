import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

type Props = {
  now: string;
  data: { title: string }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const now = new Date().toISOString()
  const data = await fetch(
    'https://hacker-news.firebaseio.com/v0/item/31000386.json'
  ).then((res) => {
    console.log('succeed data fetch.')
    return res.json()
  })
  return { props: { now, data }, revalidate: 10 }
}

const Page: NextPage<Props> = ({ now, data }) => {
  return (
    <div className={styles.container}>
      <h1>{now}</h1>
      <h2>{data.title}</h2>
      <hr />
      <Link href='/users'><a>users</a></Link>
    </div>
  )
}

export default Page
