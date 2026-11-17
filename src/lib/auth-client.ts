import { env } from "@/config/env-config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: env.BETTER_AUTH_URL
})

export const {signIn,signOut,signUp,useSession} = authClient