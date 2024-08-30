import Head from 'next/head'
import { useStore } from 'util/store'
import Link from 'next/link'

const Index = () => {
  const setNotification = useStore((state) => state.setNotification)

  return (
    <>
      <Head>
        <title>Supabase Starter</title>
      </Head>
      <h2>Home</h2>
      <button
        onClick={() =>
          setNotification({
            type: 'success',
            text: 'This is a notification',
            duration: 2000,
          })
        }
      >
        Show Notification
      </button>
      <p>
        <Link href="/login">Login</Link>
      </p>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
