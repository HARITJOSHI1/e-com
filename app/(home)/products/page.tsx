import ShowProducts from "@/components/client/product/show-products";
import { TProduct } from "@/lib/db/schema";
import { PRODUCT_REVALIDATE_TIME } from "@/lib/global/constants";
import { getHostDetails } from "@/lib/global/getHostDetails";
import React from "react";

const page = async () => {
  const response = await fetch(`${getHostDetails().url}/api/products`, {
    cache: "default",
    next: {
      revalidate: PRODUCT_REVALIDATE_TIME,
    },
  });

  const products = (await response.json()) as TProduct[];

  return <ShowProducts products={products} />;
};

export default page;
