"use client";

import { TProduct } from "@/lib/db/schema";
import { FEATURED_PRODUCTS_COUNT } from "@/lib/global/constants";
import Banner from "./banner";
import SingleProduct from "./single-product";

type ShowProductsProps = {
  products: TProduct[];
};

export default function ShowProducts({ products }: ShowProductsProps) {
  return (
    <div className="flex flex-col gap-8 py-8">
      <section className="container">
        <Banner />
      </section>

      <section className="container">
        <h2 className="mb-4 text-2xl font-bold">
          {products.length === FEATURED_PRODUCTS_COUNT
            ? "Featured products"
            : "All products"}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => {
            return <SingleProduct key={product.id} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
