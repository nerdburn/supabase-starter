import { useRouter } from 'next/router'
import { useStore } from 'util/store'
import { createClient } from 'util/supabase/component'
import { useState } from 'react'

const Login = () => {
  const setNotification = useStore((state) => state.setNotification)
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const logIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.log(error)
      setNotification({
        type: 'error',
        text: 'Invalid credentials',
        duration: 2000,
      })
    }
    router.push('/dashboard')
  }

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
    }
    router.push('/dashboard')
  }

  return (
    <main>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={logIn}>
          Log in
        </button>
        <button type="button" onClick={signUp}>
          Sign up
        </button>
      </form>
    </main>
  )
}

Login.Layouts = ['BaseLayout']
export default Login
