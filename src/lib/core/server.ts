import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/dist/client/components/navigation";


export async function requireRole(role: string) {
    const getSession = await auth.api.getSession({
        headers: await headers()
    });

    if(!getSession || getSession.user.role != role){
        redirect("/unauthorized");
    }
}