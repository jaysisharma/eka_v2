"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MediaType, MediaCategory } from "@prisma/client";

export async function addMedia(data: {
  url: string;
  caption?: string;
  type: MediaType;
  category: MediaCategory;
}) {
  try {
    await prisma.galleryMedia.create({
      data: {
        url: data.url,
        caption: data.caption,
        type: data.type,
        category: data.category,
      },
    });
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to add media:", error);
    return { success: false };
  }
}

import cloudinary from "@/lib/cloudinary";

export async function uploadMedia(formData: FormData, category: string, caption?: string) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "eka-gallery",
    });

    const type: MediaType = file.type.startsWith("video") ? "VIDEO" : "IMAGE";

    await prisma.galleryMedia.create({
      data: {
        url: uploadResponse.secure_url,
        caption: caption || file.name,
        type: type,
        category: category,
      },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true, url: uploadResponse.secure_url };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return { success: false };
  }
}

export async function updateMediaCaption(id: string, caption: string) {
  try {
    await prisma.galleryMedia.update({
      where: { id },
      data: { caption },
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to update media caption:", error);
    return { success: false };
  }
}

export async function deleteMedia(id: string) {
  try {
    await prisma.galleryMedia.delete({
      where: { id },
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete media:", error);
    return { success: false };
  }
}
