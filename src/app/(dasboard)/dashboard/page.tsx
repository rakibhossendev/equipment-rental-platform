'use client'
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard Page rendered</h1>
            <Button onClick={() => signOut()}>SignOut</Button>
        </div>
    );
};

export default Dashboard;