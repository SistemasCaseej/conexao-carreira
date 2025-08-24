"use cliente"

import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {verifySession} from "@/dal/session/dal";

export function WithAuthentication(WrappedComponent, allowedRoles) {
    return function WithAuthentication(props){
        const [session, setSession] = useState(null);

        useEffect(() => {
            async function checkSession(){
                const sess = await verifySession();

                if (!sess) {
                    redirect("/candidate-login");

                }

                if(allowedRoles.length > 0 && !allowedRoles.includes(session.userId)){
                    redirect("/dashboard");
                }

                setSession(sess);
            }
            checkSession()
        }, [session]);


        return <WrappedComponent {...props}/>
    }

}