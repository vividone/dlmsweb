import type { NextRequest } from 'next/server'
import { isExpired } from "react-jwt"
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("access_token")?.value

  if ((!currentUser || isExpired(currentUser)) && (request.nextUrl.pathname.startsWith("/account") || request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/borrow-page"))) {
    return Response.redirect(new URL('/sign-in', request.url))
  } 

}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}