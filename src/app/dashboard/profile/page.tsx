
import { Card, CardContent } from "@/components/ui/card";
import { profileData } from "@/lib/action/users/profile-data";
import ProfileForm from "../_components/profile/ProfileForm";

export default async function ProfilePage() {
  const user = await profileData();

  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="glass-card">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">
              {user.name}
            </h2>

            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reusable Form */}
      <ProfileForm user={user} />
    </div>
  );
}