import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we'll modify
    const res = NextResponse.next();
    
    // Create the Supabase client
    const supabase = createMiddlewareClient({ req: request, res });
    
    // Refresh the session - this is crucial
    const { data: { session }, error } = await supabase.auth.getSession();

    console.log("Middleware - Session Check:", {
      path: request.nextUrl.pathname,
      hasSession: !!session,
      sessionUser: session?.user?.email
    });

    // Handle protected routes
    if (!session && (
      request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin')
    )) {
      console.log("Middleware - Redirecting to auth (no session)");
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Handle auth page when already logged in
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      console.log("Middleware - Redirecting to dashboard (has session)");
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Set the session cookie
    if (session) {
      res.cookies.set('supabase-auth-token', session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
    }

    return res;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth',
    '/auth/:path*'
  ]
};
