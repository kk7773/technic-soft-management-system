
import { NextResponse } from "next/server";


export async function middleware(req) {

  const token = req.cookies.get('token');

  if (token) {

    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    const permission = JSON.parse(req.cookies.get('permission').value);

    if (!permission.includes("super-admin") && (req.nextUrl.pathname === "/admin" || req.nextUrl.pathname === "/brand-info" || req.nextUrl.pathname === "/service" || req.nextUrl.pathname === "/agreement-type")) {
      return NextResponse.rewrite(new URL('/not-allowed', req.url));
    }


    if ((req.nextUrl.pathname === "/create-proposal" || req.nextUrl.pathname === "/create-proposal/ads") && !(permission.includes("super-admin") || permission.includes("proposal"))) {
      return NextResponse.rewrite(new URL('/not-allowed', req.url));
    }

  } else {
    if (req.nextUrl.pathname === '/') {

    } else {
      return NextResponse.redirect(new URL('/', req.url))
    }

  }

}

export const config = {
  matcher: ['/', '/create-proposal/:path*', '/dashboard', '/brand-info', '/admin', '/service', "/agreement-type", '/agreement/:path*'],
}