import createClient from 'util/supabase/api'

function stringOrFirstString(item) {
  return Array.isArray(item) ? item[0] : item
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).appendHeader('Allow', 'GET').end()
    return
  }

  // Log all query parameters for debugging
  console.log('Confirm endpoint called with query params:', req.query)
  
  const queryParams = req.query
  const code = stringOrFirstString(queryParams.code)
  const type = stringOrFirstString(queryParams.type) || 'signup'
  
  console.log('Extracted code:', code)
  console.log('Extracted type:', type)

  let next = '/error?message=Missing+required+parameters'

  if (code) {
    const supabase = createClient(req, res)
    console.log('Calling supabase.auth.exchangeCodeForSession with code')
    
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('Exchange code response data:', data)
      
      if (error) {
        console.error('Exchange code error:', error)
        next = `/error?message=${encodeURIComponent(error.message)}`
      } else {
        console.log('Code exchange successful, checking user session')
        
        // Check if the user is authenticated after verification
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session after verification:', session ? 'Session exists' : 'No session')
        
        if (session) {
          // User is authenticated, redirect to dashboard
          next = '/dashboard'
        } else {
          // User is verified but not authenticated, redirect to login
          next = '/success?message=Email+confirmed+successfully'
        }
        
        console.log('Redirecting to:', next)
      }
    } catch (e) {
      console.error('Exception during code exchange:', e)
      next = `/error?message=${encodeURIComponent(e.message)}`
    }
  } else {
    console.error('Missing required parameter: code is undefined')
  }

  console.log('Final redirect destination:', next)
  res.redirect(next)
}
