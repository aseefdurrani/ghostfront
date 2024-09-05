import { NextRequest, NextResponse } from 'next/server';

// List of unprotected routes
const publicRoutes = ['/', '/about', '/waitlist', '/dashboard'];

// Middleware to protect all routes except the ones in publicRoutes
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = url.searchParams.get('token');
  const validToken = process.env.AUTH_TOKEN;

  // Allow access to static files, images, and Next.js internals
  if (
    url.pathname.startsWith('/_next') || // Allow Next.js internals
    url.pathname.startsWith('/static') || // Allow static assets
    url.pathname.startsWith('/public') || // Allow public directory assets
    url.pathname.startsWith('/images') || // Allow image directory
    url.pathname === '/favicon.ico' || // Allow favicon
    url.pathname.endsWith('.png') || // Allow PNG images
    url.pathname.endsWith('.jpg') || // Allow JPG images
    url.pathname.endsWith('.jpeg') || // Allow JPEG images
    url.pathname.endsWith('.svg') // Allow SVG images
  ) {
    return NextResponse.next();
  }

  // Check if the route is public
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // If the token is not valid, redirect to home
  if (!token || token !== validToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes
  matcher: ['/:path*'], // Apply to all paths
};
