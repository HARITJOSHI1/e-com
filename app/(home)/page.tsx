import React from "react";
import ShowProducts from "@/components/client/product/show-products";
import { getHostDetails } from "@/lib/global/getHostDetails";
import { TProduct } from "@/lib/db/schema";

const page = async () => {
  const response = await fetch(`${getHostDetails().url}/api/products`, {
    cache: "default",
    next: {
      revalidate: 15,
    },
  });

  const products = (await response.json()) as TProduct[];
  return <ShowProducts products={products.slice(0, 4)} />;
};

export default page;
