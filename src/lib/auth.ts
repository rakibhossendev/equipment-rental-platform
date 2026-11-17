import { env } from "@/config/env-config";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGODB_DATABASE_URL as string);
const db = client.db("equipment-rental-platform-db");

export const auth = betterAuth({
    database: mongodbAdapter(db,{client}),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: ["admin","customer","owner"],
                input: false,
                defaultValue: "customer"
            }
        }
    }
})
