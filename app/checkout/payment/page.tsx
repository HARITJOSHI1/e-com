import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <div className="container py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center">Payment Successful</CardTitle>
          <CardDescription className="text-center">
            Your order has been placed successfully
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="font-semibold">Order Number: #12345</p>
            <p>Thank you for your purchase!</p>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$1099.98</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$1109.98</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
