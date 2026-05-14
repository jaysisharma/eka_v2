import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/research", "/events", "/projects", "/news", "/gallery", "/store", "/mentorship", "/typography-playground", "/signup"].includes(nextUrl.pathname)
  const isAuthRoute = ["/login", "/register", "/verify", "/signup", "/forgot-password", "/reset-password", "/verify-otp", "/admin/login"].includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin/login"
  const isResearcherRoute = nextUrl.pathname.startsWith("/researcher")

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    const loginRoute = nextUrl.pathname.startsWith("/admin") ? "/admin/login" : "/login"
    return NextResponse.redirect(new URL(loginRoute, nextUrl))
  }

  // RBAC Enforcement
  if (isLoggedIn) {
    const userRole = (req.auth?.user as any)?.role as string
    
    if (isAdminRoute && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
    
    if (isResearcherRoute && !["RESEARCHER", "ADMIN"].includes(userRole)) {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  return NextResponse.next()
})


export const config = {
  matcher: ["/((?!api/auth|.+\\.[\\w]+$|_next).*)", "/", "/(api(?!/auth)|trpc)(.*)"],
}
