import { useRouter } from 'next/router'
import { createClient } from 'util/supabase/component'

export const useLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error('Logout error', error)
    }
  }

  return { handleLogout }
}
