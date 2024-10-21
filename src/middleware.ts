import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/clerk/webhook(.*)'
])

export default clerkMiddleware((auth, request) => {
  const { userId } = auth()
  console.log('userid', userId);

  // Redirect authenticated users away from the sign-in and sign-up pages
  if (isPublicRoute(request) && userId) {
    console.log('here public');
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protect non-public routes
  if (!isPublicRoute(request) && !userId) {
    console.log('here private');
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Proceed to the route if authenticated or on a public route
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
