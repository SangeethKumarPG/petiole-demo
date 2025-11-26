"use client";

export default function NewsletterBanner() {
  return (
    <section className="bg-brand-card border-t border-brand-border py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-brand-text">
          Join the Petiole Club
        </h2>

        <p className="text-brand-muted mt-2">
          Be the first to hear about new drops, deals & exclusive offers.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded bg-brand-dark text-brand-text border border-brand-border"
          />

          <button className="bg-brand-lime text-brand-dark font-semibold px-5 py-2 rounded hover:bg-brand-limeDark transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
