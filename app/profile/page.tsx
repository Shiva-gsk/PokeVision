// app/profile/page.tsx
import { auth } from "@/auth"
import ProfilePageClient from "@/components/pages/Profile"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    return <div>You must be logged in to view this page.</div>
  }

  return <ProfilePageClient session={session} />
}