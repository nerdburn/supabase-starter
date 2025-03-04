import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Error = () => {
  const router = useRouter()
  const { message } = router.query
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    if (router.isReady) {
      setQueryParams(router.query)
    }
  }, [router.isReady, router.query])

  return (
    <main>
      <h2>Error</h2>
      <p>{message || 'An error occurred during the process.'}</p>
      
      {process.env.NODE_ENV === 'development' && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Debug Information</h3>
          <pre>{JSON.stringify(queryParams, null, 2)}</pre>
        </div>
      )}
      
      <p style={{ marginTop: '20px' }}>
        <Link href="/">Return to Home</Link>
      </p>
    </main>
  )
}

Error.Layouts = ['BaseLayout']
export default Error
