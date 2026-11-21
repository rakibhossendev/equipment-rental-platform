import { env } from "@/config/env-config";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { client, db } from "./mongodb";

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: [ "admin", "customer", "owner" ],
                input: false,
                defaultValue: "customer"
            }
        }
    },
    plugins: [ jwt() ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        }
    },
    socialProviders: {
        google: {
            clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
        }
    }
});
