"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-brand-dark text-brand-muted border-t border-brand-border">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* LOGO + DESCRIPTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/petiole.png"
              alt="Petiole Logo"
              width={40}
              height={40}
              className="object-contain w-10 h-10"
            />
            <span className="text-2xl font-bold text-brand-gold tracking-wide">
              Petiole
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Premium lifestyle, curated essentials and quality products tailored for
            your everyday comfort.
          </p>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h4 className="text-brand-text font-bold mb-4 text-lg">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-brand-lime transition">Categories</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-brand-lime transition">New Arrivals</Link></li>
            <li><Link href="/best-sellers" className="hover:text-brand-lime transition">Best Sellers</Link></li>
            <li><Link href="/offers" className="hover:text-brand-lime transition">Offers</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h4 className="text-brand-text font-bold mb-4 text-lg">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-brand-lime transition">Help Center</Link></li>
            <li><Link href="/shipping" className="hover:text-brand-lime transition">Shipping Info</Link></li>
            <li><Link href="/returns" className="hover:text-brand-lime transition">Returns & Refunds</Link></li>
            <li><Link href="/contact" className="hover:text-brand-lime transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-brand-text font-bold mb-4 text-lg">Follow Us</h4>
          <div className="flex gap-4">
        
            {/* Instagram */}
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="transition hover:text-brand-lime"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 
                2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 
                2c1.654 0 3 1.346 3 3v10c0 
                1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 
                1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 
                2a3 3 0 110 6 3 3 0 010-6zm4.5-.25a1.25 1.25 
                0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
              </svg>
            </Link>
        
            {/* Facebook */}
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="transition hover:text-brand-lime"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 
                6.478 2 12c0 4.991 3.657 9.128 8.438 
                9.878v-6.992H7.898v-2.886h2.54V9.845c0-2.506 
                1.492-3.89 3.777-3.89 1.094 0 
                2.238.195 2.238.195v2.46h-1.26c-1.243 
                0-1.63.771-1.63 1.562v1.874h2.773l-.443 
                2.886h-2.33V21.88C18.343 21.128 22 
                16.99 22 12z"/>
              </svg>
            </Link>
        
            {/* Twitter (X) */}
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              className="transition hover:text-brand-lime"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.301 
                4.301 0 001.88-2.37 8.59 8.59 0 
               01-2.72 1.04A4.28 4.28 0 0015.5 
                4c-2.37 0-4.29 1.92-4.29 
                4.29 0 .34.04.67.11.98A12.16 
                12.16 0 013 5.15a4.28 4.28 0 
                001.32 5.72 4.22 4.22 0 
                01-1.94-.54v.05c0 2.07 
                1.47 3.8 3.42 4.19a4.32 
                4.32 0 01-1.93.07 4.29 
                4.29 0 004 2.97A8.61 8.61 
                0 012 19.54 12.15 12.15 
                0 008.29 21c7.55 0 11.68-6.26 
                11.68-11.68 0-.18 0-.36-.01-.54A8.18 
                8.18 0 0022.46 6z"/>
              </svg>
            </Link>
        
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-brand-border py-4 text-center text-sm text-brand-muted">
        © {new Date().getFullYear()} Petiole. All rights reserved.
      </div>
    </footer>
  );
}
