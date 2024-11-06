import Cart from "@/components/client/cart/cart";
import { getHostDetails } from "@/lib/global/getHostDetails";
import { TCartItem } from "@/lib/types";
import React from "react";

const page = async () => {
  const response = await fetch(`${getHostDetails().url}/api/cart`, {
    method: "GET",
    next: {
      tags: ["cart"],
    },
  });

  const cartItems = (await response.json()) as TCartItem;
  return <Cart cartItem={cartItems} />;
};

export default page;
