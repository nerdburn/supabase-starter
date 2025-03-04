import Head from 'next/head'
import Link from 'next/link'

const Index = () => {
  return (
    <>
      <Head>
        <title>Supabase Starter</title>
      </Head>
      <h1>Supabase Starter</h1>
      <p>
        <Link href="/login">Login</Link>
      </p>
      <p>
        <Link href="/signup">Sign up</Link>
      </p>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
