"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

export default function HeroSection(): JSX.Element {
  const slides: ReadonlyArray<string> = [
    "/carousel-1.jpg",
    "/carousel-2.jpg",
    "/carousel-3.jfif",
    "/carousel-4.jpg",
  ];

  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[95vh] rounded-lg overflow-hidden mb-10 bg-brand-dark font-sans">
      {/* Hidden SEO Block */}
      <div className="sr-only">
        <h1>Best Boutique in Dubai – Trendy Women’s Fashion | Petiole Fashion</h1>
        <p>
          Explore premium women’s clothing, designer dresses, co-ords, party wear,
          western wear, and exclusive boutique outfits at Petiole Fashion—one of
          the best fashion boutiques in Dubai offering curated looks for every
          occasion.
        </p>
      </div>

      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full z-10"
      >
        {slides.map((src: string, idx: number) => (
          <SwiperSlide key={idx} className="z-10 bg-brand-dark">
            <div className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[95vh] bg-brand-dark">
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10"></div>

              <Image
                src={src}
                alt="Boutique Hero Slide"
                fill
                priority={idx === 0}
                className="object-cover object-center transition-all duration-700"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Visible Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 text-white max-w-xl drop-shadow-xl z-30">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Effortless Style, Every Day
        </h1>

        <p className="mt-4 text-base sm:text-lg text-brand-muted">
          Discover curated fashion essentials crafted for elegance and comfort.
        </p>

        <Link
          href="/categories/new-arivals"
          className="mt-6 bg-brand-lime text-brand-dark font-bold px-6 py-3 rounded-lg hover:bg-brand-limeDark transition w-fit"
        >
          Shop New Arrivals →
        </Link>
      </div>
    </section>
  );
}
