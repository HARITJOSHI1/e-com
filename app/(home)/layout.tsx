import Navigation from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">E-com</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/products">Products</Link>
            </nav>
          </div>
          <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2  disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:text-accent-foreground h-10 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:ring-offset-0 md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 md:w-[300px] lg:w-[300px]"
                />
              </div>
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Shopping Cart</span>
                </Link>
              </Button>
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
              <Button variant="default" className="hidden md:inline-flex ml-2">
                Sign Up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              Built by Harit Joshi.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default layout;
