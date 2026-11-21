import { env } from "@/config/env-config";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins"
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: env.BETTER_AUTH_URL,
    plugins: [
        jwtClient(),
        inferAdditionalFields<typeof auth>()
    ]
})

export const { signIn, signOut, signUp, useSession } = authClient