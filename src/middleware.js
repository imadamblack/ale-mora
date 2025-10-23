import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl
  const res = NextResponse.next()

  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  let utm = {}

  if (url.searchParams.get('fbclid')) {
    res.cookies.set('_fbc', url.searchParams.get('fbclid'), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  utmParams.forEach(param => {
    const value = url.searchParams.get(param)
    if (value) {
      utm = {...utm, [param]: value}
    }
  })

  res.cookies.set('utm', utm, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return res;
}

export const config = {
  matcher: [
    '/', '/survey'
  ],
}
