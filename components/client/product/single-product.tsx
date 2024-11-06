import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { TProduct } from "@/lib/db/schema";

type Props = {
  product: TProduct;
};

const SingleProduct = ({ product }: Props) => {
  const router = useRouter();
  return (
    <Card
      key={product.id}
      className="cursor-pointer"
      onClick={() => {
        router.push(`/products/${product.id}`);
      }}
    >
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image
            src={product.img_url}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>
          <span className="line-clamp-2">{product.description}</span>
          <span className="font-semibold mt-2 inline-block text-xl">
          ₹{product.price}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" className="text-sm font-medium">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleProduct;
