import Link from 'next/link'
import { LogoutForm } from 'components/forms/logout'
import { useStore } from 'util/store'
import { useIsLoggedIn } from 'hooks/use-is-logged-in'

export const TopNav = () => {
  const setModal = useStore((state) => state.setModal)
  const { isLoggedIn } = useIsLoggedIn()

  console.log('is logged in?', isLoggedIn)
  
  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link> |{' '}
            </li>
            <li>
              <LogoutForm submitButton={{variation: 'text'}} onSuccess={() => window.location.href = '/' } />
            </li>
          </>
        ) : null}
        {(!isLoggedIn) ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  )
}
