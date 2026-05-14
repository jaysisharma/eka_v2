import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import NewsForm from "../../news-form";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const article = await prisma.newsArticle.findUnique({
    where: { id: params.id }
  });

  if (!article) {
    notFound();
  }

  return <NewsForm initialData={article} isEditing={true} />;
}
