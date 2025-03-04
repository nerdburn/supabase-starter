import { useRouter } from 'next/router'
import Link from 'next/link'

const Success = () => {
  const router = useRouter()
  const { message } = router.query

  return (
    <main>
      <h2>Success!</h2>
      <p>{message || 'Your account has been confirmed successfully.'}</p>
      <p>
        <Link href="/login">Log in</Link>
      </p>
    </main>
  )
}

Success.Layouts = ['BaseLayout']
export default Success
