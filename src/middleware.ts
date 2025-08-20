import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ar', req.url));
  }

  return intlMiddleware(req);
}

 
export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};