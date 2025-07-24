import { NextResponse, NextRequest } from 'next/server';

    const publicRoutes = [
     { path : '/candidate-login', whenAuthenticated: 'redirect' },
     { path : '/candidate-registration', whenAuthenticated: 'redirect' },
        { path : '/admin/pending-users', whenAuthenticated: 'next' },
        { path : '/', whenAuthenticated: 'next' },

 ]

 const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/candidate-login'


export function middleware(request) {

    //     const path = request.nextUrl.pathname;
    //     const publicRoute = publicRoutes.find(route => route.path === path);
    //
    //     const authToken = request.cookies.get('session');
    //
    //  if(!authToken && publicRoute){
    //      return NextResponse.next();
    //  }
    //
    // if(!authToken && !publicRoute){
    //      const redirectUrl = request.nextUrl.clone()
    //
    //      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    //
    //      return NextResponse.redirect(redirectUrl);
    //  }
    //
    //  if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
    //
    //      const redirectUrl = request.nextUrl.clone()
    //      redirectUrl.pathname = '/dashboard';
    //
    //      return NextResponse.redirect(redirectUrl);
    //  }
    //
    //  if(authToken && !publicRoute){
    //      return NextResponse.next()
    //  }

     return NextResponse.next()
 }


 export const config = {
     matcher: [
         /*
          * Intercepta todas as rotas exceto:
         * - /_next
          * - /favicon.ico
          * - /sitemap.xml
          * - /robots.txt
          * - /api (você pode decidir se quer interceptar a API ou não)
          */
         '/((?!_next|favicon.ico|sitemap.xml|robots.txt|api).*)',
     ],
}