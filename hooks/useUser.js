import { useQuery } from '@tanstack/react-query'
import { createClient } from 'util/supabase/component'

const getUser = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export const useUser = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUser,
  })
}
