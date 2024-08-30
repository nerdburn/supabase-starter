import { useUser } from 'hooks/useUser'
import { createClient } from 'util/supabase/component'
import { useLogout } from 'hooks/useLogout'

const DashboardIndex = () => {
  const supabase = createClient()
  const { data: user, isLoading } = useUser()
  console.log(user)
  const { handleLogout } = useLogout()

  return (
    <>
      <h2>Dashboard</h2>
      <p>
        You should see this page if you're logged in as a regular user or admin.
      </p>
      <p>Logged in as: {isLoading ? 'Loading...' : user.email}</p>
      <p>
        <a onClick={() => handleLogout()}>Log out</a>
      </p>
    </>
  )
}

DashboardIndex.Layouts = ['BaseLayout']
export default DashboardIndex
