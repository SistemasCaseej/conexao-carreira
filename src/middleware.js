import { NextResponse} from 'next/server';
import {verifySession} from "@/dal/session/dal";


    const publicRoutes = [
     { path : '/candidate-login', whenAuthenticated: 'redirect' },
     { path : '/candidate-registration', whenAuthenticated: 'redirect' },
        { path : '/', whenAuthenticated: 'redirect' },

 ]

 const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/candidate-login'


export async function middleware(request) {

    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);

    const session = await verifySession();
    const isAuth = session?.isAuth;

    const jobRoutes = ["/dashboard/new-job", "/dashboard/jobs"];

    if(publicRoute){
        if(isAuth && publicRoute.whenAuthenticated === 'redirect'){
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = '/dashboard';

            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    if(!isAuth){
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if(isAuth){
        if(request.nextUrl.pathname === "/admin/manage-companies" && session.role !== 'Admin'){
            const redirectUrl = request.nextUrl.clone();

            redirectUrl.pathname = '/dashboard';
            return NextResponse.redirect(redirectUrl)
        }

        if (jobRoutes.includes(request.nextUrl.pathname) && !["Admin", "Employee"].includes(session.role)) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/dashboard";
            return NextResponse.redirect(redirectUrl);
        }

    }

    return NextResponse.next()

}


 export const config = {
     matcher: [
         '/((?!_next|favicon.ico|sitemap.xml|robots.txt|api).*)',
     ],
}