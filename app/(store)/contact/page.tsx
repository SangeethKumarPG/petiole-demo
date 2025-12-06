import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-text">
      <section className="w-full h-[40vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-brand-gold/30 to-brand-lime/20">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-gold drop-shadow-lg">
          Contact Us
        </h1>
        <p className="mt-3 text-brand-muted max-w-2xl">
          Have questions or need help? Our team is here to assist you.
        </p>
      </section>

      <section className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-brand-card border border-brand-border rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-brand-text">Get in Touch</h2>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-brand-muted text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-brand-dark border border-brand-border text-brand-text px-4 py-3 rounded focus:ring-2 focus:ring-brand-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-brand-muted text-sm">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-brand-dark border border-brand-border text-brand-text px-4 py-3 rounded focus:ring-2 focus:ring-brand-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-brand-muted text-sm">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full bg-brand-dark border border-brand-border text-brand-text px-4 py-3 rounded focus:ring-2 focus:ring-brand-lime focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-dark font-semibold py-3 rounded hover:bg-brand-lime transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-brand-gold">Customer Support</h3>
            <p className="text-brand-muted mt-2">We typically reply within 24 hours.</p>
            <p className="text-brand-text font-medium mt-1">support@petiole.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-gold">Our Office</h3>
            <p className="text-brand-muted mt-2">
              Petiole
              <br /> Al Kazana Centre, Near Karama Park, Al Karama Dubai
              <br />
              <a href="tel:+971 4 298 3828" className="text-brand-gold">📞 Phone</a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-gold">Working Hours</h3>
            <p className="text-brand-muted mt-2">
              Monday – Saturday
              <br /> 9:00 AM – 6:00 PM IST
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-gold">Find us on map</h3>
            <div className="mt-4 bg-brand-card border border-brand-border rounded-lg p-4 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3608.775102658877!2d55.303535875383346!3d25.244498777680576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE0JzQwLjIiTiA1NcKwMTgnMjIuMCJF!5e0!3m2!1sen!2sin!4v1764981943873!5m2!1sen!2sin"
                className="w-full h-56 rounded-lg"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <h4 className="text-2xl font-semibold text-brand-gold text-center mt-10 mb-3">Our Shop</h4>
      <div className=" container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden border border-brand-border">
            <div className="aspect-[4/3] relative">
              <Image src="/shop-1.jpg" alt="Shop Image 1" fill className="object-cover" />
            </div>
          </div>

          <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden border border-brand-border">
            <div className="aspect-[4/3] relative">
              <Image src="/shop-2.jpg" alt="Shop Image 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
