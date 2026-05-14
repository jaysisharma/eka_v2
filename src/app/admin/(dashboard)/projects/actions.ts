"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export type ProjectStatus = "PLANNED" | "ONGOING" | "COMPLETED" | "ARCHIVED";

export async function createProject(data: {
  title: string;
  description?: string;
  image?: string;
  status: ProjectStatus;
  tags: string[];
}) {
  try {
    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description as any,
        image: data.image as any,
        status: data.status as any,
        tags: data.tags,
      } as any,
    });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false };
  }
}

export async function updateProjectStatus(id: string, status: ProjectStatus) {
  try {
    await prisma.project.update({
      where: { id },
      data: { status: status as any },
    });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to update project status:", error);
    return { success: false };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false };
  }
}
