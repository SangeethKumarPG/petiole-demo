import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | Petiole Fashion",
  description:
    "Read Petiole Fashion&apos;s shopping, shipping and return policies.",
};

export default function PoliciesPage(): JSX.Element {
  return (
    <div className="bg-brand-dark min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-10 text-brand-text">
        <h1 className="text-3xl font-bold text-brand-gold mb-6">
          Petiole Fashion &ndash; Shopping Policies
        </h1>

        <div className="space-y-6 leading-relaxed">
          <p>
            Just a quick note on our online shopping policies to help you shop
            confidently with Petiole Fashion:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Once your order is placed, we are unable to cancel or return it,
              so please choose carefully before checking out.
            </li>
            <li>
              If you receive a damaged item, don&rsquo;t worry. Please ensure you
              record an unboxing video, as it is required for any return due to
              damage.
            </li>
            <li>
              Colors may vary slightly due to lighting, but we always aim to
              show the true beauty of our designs.
            </li>
          </ul>

          <p className="font-semibold">
            🛒 Place your orders only at{" "}
            <a
              href="https://www.petiolefashion.com"
              className="text-brand-gold underline"
              target="_blank"
              rel="noreferrer"
            >
              www.petiolefashion.com
            </a>
          </p>

          <div className="space-y-1">
            <p>
              📞 Got questions? Feel free to DM us:{" "}
              <strong>050 685 2245</strong>
            </p>
            <p>
              ☎️ Customer care number: <strong>+971 4 298 3828</strong>
            </p>
          </div>

          <p>
            If you&rsquo;re unsure about anything, you&apos;re always welcome to
            visit our store before placing your order.
          </p>

          <p className="font-semibold">
            Thanks for being part of the Petiole family 💖
          </p>

          <hr className="my-8 border-brand-border" />

          <h2 className="text-2xl font-bold text-brand-gold mb-4">
            Shipping &amp; Returns
          </h2>

          <p>
            We do not accept returns or refunds for our products except in the
            following cases:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Major damage</li>
            <li>Wrong item sent</li>
            <li>Size different from what you ordered</li>
          </ul>

          <p className="mt-4">
            For all such cases, a{" "}
            <strong className="text-brand-gold">
              360º unboxing video is mandatory
            </strong>
            . Return requests without video proof will not be accepted.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              The video must clearly show the unopened package and the address
              label.
            </li>
            <li>
              No replacement or refund will be processed without valid video
              evidence.
            </li>
            <li>
              You must raise a return request through our support platforms
              (call/website support portal) within{" "}
              <strong>24 hours of receiving your order</strong>.
            </li>
            <li>Discounted items are final and cannot be returned or exchanged.</li>
            <li>Once a product is dispatched, returns are not accepted.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
