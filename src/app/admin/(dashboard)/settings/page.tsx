import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminSettingsForm from "./settings-form";

export default async function AdminSettings() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      role: true,
      interests: true,
      updatedAt: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  // Calculate Clearance Level
  const roleLevels: Record<string, number> = {
    "ADMIN": 5,
    "RESEARCHER": 4,
    "ACADEMIC_PREMIUM": 3,
    "PREMIUM": 2,
    "USER": 1,
    "GUEST": 0
  };
  
  const clearanceLevel = roleLevels[user.role] || 0;

  return <AdminSettingsForm initialUser={{...user, clearanceLevel}} />;
}
