import { PriceTag } from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Flowmazon",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
}
