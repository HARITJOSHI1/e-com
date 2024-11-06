"use client";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/lib/db/schema";
import { GLOBAL_USER_ID } from "@/lib/global/constants";
import { TResponseJson } from "@/lib/types";
import { cartBodySchema } from "@/routes/cart/schema";
import { Heart, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { toast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";

type ProductDetailPageProps = {
  product: TProduct;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const addToCart = async (body: z.infer<typeof cartBodySchema>) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = (await response.json()) as TResponseJson;
      toast({
        title: data.message,
      });

      router.push("/cart");
      router.refresh();
    } else {
      toast({
        title: "Failed to add product to the cart",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={product.img_url}
                alt={`Product image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ₹{
                  i < Math.floor(5)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">5 (245 reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-4 mb-6">
            <Button
              className="flex-1"
              onClick={() =>
                addToCart({
                  quantity,
                  userId: GLOBAL_USER_ID,
                  productId: product.id,
                })
              }
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
