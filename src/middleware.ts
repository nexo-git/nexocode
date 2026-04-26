import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for Cognito session cookie (set by Amplify)
  const hasSession = request.cookies.getAll().some(
    (c) => c.name.startsWith('CognitoIdentityServiceProvider') && c.name.endsWith('idToken')
  )

  // Protect /admin — redirect to / if no session
  if (pathname.startsWith('/admin')) {
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /pedidos — redirect to /login if no session
  if (pathname.startsWith('/pedidos')) {
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/pedidos/:path*'],
}
