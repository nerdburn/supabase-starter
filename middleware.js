import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request) {
  const authenticatedRoutes = ['/dashboard', '/settings']
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name, options) => {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const nextUrlPathname = request.nextUrl.pathname
  const isAuthenticatedRoute = authenticatedRoutes.includes(nextUrlPathname)

  const isLoggedIn = !!session

  if (!isLoggedIn && isAuthenticatedRoute) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(`${request.nextUrl.origin}/login`, 302)
  }

  if (nextUrlPathname === '/login' && isLoggedIn) {
    // Redirect authenticated users to the dashboard page if they try to access the login page
    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`, 302)
  }

  return NextResponse.next()
}
