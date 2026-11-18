import { toast } from "sonner";
import { redirect } from "next/dist/client/components/navigation";
import { signIn } from "../auth-client";

const handleGoogleSignUp = async () => {
    try{
        const data = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        });

        if(data?.error){
            toast.error(data.error.message || "Failed to sign in with Google");
            return;
        }

        toast.success("Signed in with Google successfully!");
        redirect("/dashboard");
    }catch(error){
        console.error("Error during Google sign-up:", error);
    }
}

export default handleGoogleSignUp;