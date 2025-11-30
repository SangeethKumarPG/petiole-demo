"use client";

import Image from "next/image";

export default function AboutPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-brand-dark text-brand-text">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about-hero.png"
          alt="About Petiole Boutique"
          fill
          priority
          className="object-cover opacity-40"
        />

        <h1 className="relative z-10 text-4xl sm:text-6xl font-bold text-brand-gold drop-shadow-lg">
          About Petiole
        </h1>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-16 px-6 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <Image
            src="/about-mission.png"
            alt="Our Story"
            width={600}
            height={500}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-brand-gold">Our Story</h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            Petiole was born from a passion for effortless style — a belief that
            luxury should feel natural, comfortable, and deeply personal.
          </p>
          <p className="text-brand-text leading-relaxed">
            We curate modern Indian fashion that blends tradition with
            contemporary elegance. Every product is hand-picked to bring out
            your individuality, your grace, and your presence.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-card py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-gold mb-10">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="p-6 bg-brand-dark rounded-lg border border-brand-border">
              <h3 className="text-xl font-semibold text-brand-text mb-3">
                Quality
              </h3>
              <p className="text-brand-muted">
                Every piece is carefully selected to ensure premium
                craftsmanship and lasting comfort.
              </p>
            </div>

            <div className="p-6 bg-brand-dark rounded-lg border border-brand-border">
              <h3 className="text-xl font-semibold text-brand-text mb-3">
                Authenticity
              </h3>
              <p className="text-brand-muted">
                A blend of modern aesthetics and timeless Indian
                heritage—curated with honesty.
              </p>
            </div>

            <div className="p-6 bg-brand-dark rounded-lg border border-brand-border">
              <h3 className="text-xl font-semibold text-brand-text mb-3">
                You First
              </h3>
              <p className="text-brand-muted">
                We design experiences around your comfort, confidence, and
                unique personal style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/*<section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-brand-gold mb-10">Meet the Team</h2>

        <div className="flex flex-col sm:flex-row justify-center gap-10">
          <div className="flex flex-col items-center">
            <Image
              src="/team-member-1.png"
              alt="Founder"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg"
            />
            <h3 className="text-xl mt-4 font-semibold">Aaradhya Menon</h3>
            <p className="text-brand-muted text-sm">Founder & Creative Director</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/team-member-2.png"
              alt="Co-Founder"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-lg"
            />
            <h3 className="text-xl mt-4 font-semibold">Riya Nair</h3>
            <p className="text-brand-muted text-sm">Brand Stylist</p>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="bg-brand-gold py-12 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">
          Join the Petiole Family
        </h2>
        <p className="text-brand-dark text-lg mb-6">
          Be the first to know about new arrivals, exclusive collections, and
          offers.
        </p>

        <a
          href="/newsletter"
          className="bg-brand-dark text-brand-gold px-6 py-3 rounded-lg font-semibold hover:bg-brand-card transition"
        >
          Subscribe Now
        </a>
      </section>
    </main>
  );
}
