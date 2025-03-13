import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(new URL('/auth?error=callback_failed', request.url));
      }

      if (data.session) {
        // Redirect to dashboard with session established
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // If no code or session, redirect to auth
    return NextResponse.redirect(new URL('/auth', request.url));
  } catch (e) {
    console.error("Callback error:", e);
    return NextResponse.redirect(new URL('/auth?error=callback_error', request.url));
  }
}
