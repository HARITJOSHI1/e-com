import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/global/spinner";
import React, { Suspense } from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <Suspense fallback={<LoadingSpinner />}>
        <Image
          src="/assets/summer.jpg"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
      </Suspense>
      <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-40 p-8">
        <div className="max-w-lg text-white">
          <h1 className="mb-4 text-4xl font-bold">Summer Sale</h1>
          <p className="mb-6">
            Get up to 50% off on selected items. Limited time offer!
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/80">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
