"use server";

import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  sizes?: string[];
}) {
  try {
    await prisma.storeProduct.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category || "General",
        images: data.image ? [data.image] : [],
        sizes: data.sizes || [],
      },
    });
    revalidatePath("/admin/store");
    return { success: true };
  } catch (error) {
    console.error("Save failed:", error);
    return { success: false, error: "Could not save product." };
  }
}

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "eka-store",
    });

    return { success: true, url: uploadResponse.secure_url };
  } catch (error) {
    console.error("Store image upload failed:", error);
    return { success: false };
  }
}

export async function updateProduct(id: string, data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  sizes?: string[];
}) {
  try {
    await prisma.storeProduct.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category || "General",
        ...(data.image && { images: [data.image] }),
        sizes: data.sizes || [],
      },
    });
    revalidatePath("/admin/store");
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error: "Could not update product." };
  }
}

export async function updateStock(id: string, stock: number) {
  try {
    await prisma.storeProduct.update({
      where: { id },
      data: { stock },
    });
    revalidatePath("/admin/store");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.storeProduct.delete({
      where: { id },
    });
    revalidatePath("/admin/store");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
