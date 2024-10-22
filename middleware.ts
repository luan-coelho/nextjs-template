import { auth } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)"],
}

export default auth(req => {
  console.log("middleware.ts", req.url)

  if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
