import { auth } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)"],
}

export default auth(req => {
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
