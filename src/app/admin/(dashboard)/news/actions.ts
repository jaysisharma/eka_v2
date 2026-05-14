"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export async function uploadNewsImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "eka-news",
    });

    return { success: true, url: uploadResponse.secure_url };
  } catch (error) {
    console.error("News image upload failed:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function createNews(data: {
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  isFeatured?: boolean;
}) {
  try {
    await prisma.newsArticle.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        isFeatured: data.isFeatured || false,
      },
    });

    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("[CREATE_NEWS_ERROR]", error);
    return { success: false, error: "Failed to create news article" };
  }
}

export async function updateNews(id: string, data: {
  title?: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  isFeatured?: boolean;
}) {
  try {
    await prisma.newsArticle.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("[UPDATE_NEWS_ERROR]", error);
    return { success: false, error: "Failed to update news article" };
  }
}

export async function deleteNews(id: string) {
  try {
    await prisma.newsArticle.delete({
      where: { id },
    });

    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("[DELETE_NEWS_ERROR]", error);
    return { success: false, error: "Failed to delete news article" };
  }
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  try {
    await prisma.newsArticle.update({
      where: { id },
      data: { isFeatured },
    });

    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("[TOGGLE_FEATURED_ERROR]", error);
    return { success: false, error: "Failed to update featured status" };
  }
}
