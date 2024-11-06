import ProductDetailPage from "@/components/client/product/product-details";
import { TProduct } from "@/lib/db/schema";
import { PRODUCT_REVALIDATE_TIME } from "@/lib/global/constants";
import { getHostDetails } from "@/lib/global/getHostDetails";
import React from "react";

type ProductDetailPageProps = {
  params: {
    id: number;
  };
};

const page = async ({ params }: ProductDetailPageProps) => {
  const response = await fetch(
    `${getHostDetails().url}/api/products/${params.id}`,
    {
      cache: "default",
      next: {
        revalidate: PRODUCT_REVALIDATE_TIME,
      },
    }
  );
  const product = (await response.json()) as TProduct;
  return <ProductDetailPage product={product} />;
};

export default page;
