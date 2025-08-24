import { NextResponse} from 'next/server';


    const publicRoutes = [
     { path : '/candidate-login', whenAuthenticated: 'redirect' },
     { path : '/candidate-registration', whenAuthenticated: 'redirect' },
        { path : '/', whenAuthenticated: 'redirect' },

 ]

 const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/candidate-login'


export async function middleware(request) {

    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);

    const authToken = request.cookies.get('session')?.value;

    if (!authToken && publicRoute) {
        return NextResponse.next();
    }

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {

        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/dashboard';

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && !publicRoute)   {
        return NextResponse.next();
    }

    return NextResponse.next()

}


 export const config = {
     matcher: [
         '/((?!_next|favicon.ico|sitemap.xml|robots.txt|api).*)',
     ],
}