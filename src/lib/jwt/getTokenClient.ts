import { authClient } from "../auth-client";

export async function getJWTTokenClient() {
    try{
        const {data,error} = await authClient.token();
        if(error){
            console.error("Error in getJWTTokenClient:", error);
            return null;
        }
        return data?.token;
    }catch(error){
        console.error("Error in getJWTTokenClient:", error);
        return null;
    }
}