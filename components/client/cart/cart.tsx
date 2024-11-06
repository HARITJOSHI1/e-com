"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCartItem } from "@/lib/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CartProps = {
  cartItem: TCartItem;
};

export default function Cart({ cartItem }: CartProps) {
  const [cart, setCart] = useState(cartItem);
  const router = useRouter();

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart({
      ...cart,
      products: cart.products.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    setCart({
      ...cart,
      products: cart.products.filter((item) => item.id !== id),
    });
  };

  const subtotal = cart.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  useEffect(() => {
    localStorage.setItem("cart-subtotal", total.toFixed(2));
  }, [total]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.products.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Your cart is empty</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.products.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16">
                              <Image
                                src={item.img_url}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full cursor-pointer"
                  onClick={() => {
                    router.push("/checkout");
                  }}
                >
                  <span>Proceed to Checkout</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
