/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ROUTER } from './constants';

function decodeJwt(token: string): any | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

function isJwtExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return true;
  return payload.exp * 1000 < Date.now();
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwtToken')?.value;

  // If the user is on a page that requires login but does not have a token → redirect to /login
  const isProtectedPath =
    pathname.startsWith('/leave-applications') ||
    pathname.startsWith('/dashboard');

  if (isProtectedPath && !token) {
    const loginUrl = new URL(ROUTER.LOGIN, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and access /login, it will redirect to /leave-applications
  if (pathname === ROUTER.LOGIN && token && !isJwtExpired(token)) {
    const leaveApplicationsUrl = new URL(ROUTER.DASHBOARD, request.url);
    return NextResponse.redirect(leaveApplicationsUrl);
  }

  return NextResponse.next();
}

// Only apply Middleware to routes want to handle
export const config = {
  matcher: ['/login', '/leave-applications/:path*', '/dashboard/:path*'],
};
