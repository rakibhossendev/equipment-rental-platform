import { headers } from "next/headers";
import { auth } from "../auth";

export async function getJWTTokenServer() {
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  if(!token.token){
    console.error("Error in getJWTTokenServer: No token received");
    return null;
  }
  return token.token
}