import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "../../product-form";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const product = await prisma.storeProduct.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-10">
      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
