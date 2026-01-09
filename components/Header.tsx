"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { PackageIcon, TrolleyIcon, UserIcon, MenuIcon } from "@sanity/icons";
import { useBasketStore } from "@/lib/store/store";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Header(): JSX.Element {
  const { user } = useUser();
  const router = useRouter();

  const [colorQuery, setColorQuery] = useState<string>("");

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleColorSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmedColor = colorQuery.trim();

    if (!trimmedColor) {
      return;
    }

    router.push(`/search/color?color=${encodeURIComponent(trimmedColor)}`);
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-3 bg-brand-dark border-b border-brand-border">
      <div className="flex w-full justify-between items-center gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Petiole.png"
            alt="Petiole Logo"
            width={40}
            height={40}
            className="object-contain w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-2xl font-bold text-brand-gold tracking-wide">
            Petiole
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-brand-gold font-semibold">
          <Link href="/" className="hover:text-brand-lime transition">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-brand-lime transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-brand-lime transition">
            Contact Us
          </Link>
          <Link href="/categories/new-arrivals" className="hover:text-brand-lime transition">
            New Arrivals
          </Link>
          <Link
            href="/categories/topcollections"
            className="hover:text-brand-lime transition"
          >
            Top Collections
          </Link>
        </nav>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-3">
          {/* COLOR SEARCH (DESKTOP) */}
          <form
            onSubmit={handleColorSearch}
            className="hidden md:flex items-center bg-white rounded overflow-hidden"
          >
            <input
              type="text"
              value={colorQuery}
              onChange={(event) => setColorQuery(event.target.value)}
              placeholder="Search by color"
              className="px-3 py-2 text-sm text-brand-dark outline-none w-32 lg:w-40"
            />
            <button
              type="submit"
              className="bg-brand-gold text-brand-dark text-sm font-semibold px-3 py-2 hover:bg-brand-lime transition"
            >
              Go
            </button>
          </form>

          {/* BASKET */}
          <Link
            href="/basket"
            className="
              relative flex items-center gap-2
              bg-brand-gold text-brand-dark
              font-bold py-2 px-4 rounded
              hover:bg-brand-lime transition
            "
          >
            <TrolleyIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-brand-gold text-white
                  rounded-full w-6 h-6 flex items-center justify-center text-xs
                "
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* ORDERS */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="
                  flex items-center gap-2
                  bg-brand-gold text-brand-dark
                  font-bold py-2 px-4 rounded
                  hover:bg-brand-lime transition
                "
              >
                <PackageIcon className="w-6 h-6" />
              </Link>
            </SignedIn>

            {/* USER BUTTON OR SIGN IN */}
            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button
                  className="
                    bg-brand-gold text-brand-dark 
                    font-semibold py-2 px-4 rounded 
                    hover:bg-brand-lime transition
                    flex items-center gap-2
                  "
                >
                  <UserIcon className="w-5 h-5" />
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger className="md:hidden bg-brand-gold text-brand-dark p-2 rounded hover:bg-brand-lime transition">
              <MenuIcon className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-brand-dark text-brand-gold p-6"
            >
              <nav className="flex flex-col gap-4 text-lg font-semibold">
                <Link href="/">Home</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/newarrivals">New Arrivals</Link>
                <Link href="/topcollections">Top Collections</Link>

                {/* MOBILE COLOR SEARCH */}
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const trimmed = colorQuery.trim();
                    if (!trimmed) return;
                    router.push(
                      `/search/color?color=${encodeURIComponent(trimmed)}`
                    );
                  }}
                  className="flex md:hidden items-center gap-2 bg-white rounded px-3 py-2 mt-2"
                >
                  <input
                    type="text"
                    value={colorQuery}
                    onChange={(event) => setColorQuery(event.target.value)}
                    placeholder="Search by color"
                    className="flex-1 text-brand-dark outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-brand-gold text-brand-dark px-3 py-1 text-sm font-semibold rounded hover:bg-brand-lime transition"
                  >
                    Go
                  </button>
                </form>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
