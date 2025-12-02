"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WhatsAppButton(): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const phone = "9710506852245";
  const message = encodeURIComponent("Hi! I need help with Petiole Fashion.");

  return (
    <>
      {showTooltip && (
        <div className="fixed bottom-24 right-24 bg-[#25D366] text-white text-sm py-2 px-3 rounded-lg shadow-lg animate-fadeInOut z-50">
           Support
        </div>
      )}

      <Link
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-24 z-50 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="white"
        >
          <path d="M16.027 3C9.383 3 4 8.383 4 15.027c0 2.656.867 5.109 2.34 7.098L4 29l7.098-2.383A12.953 12.953 0 0 0 16.027 27C22.66 27 28 21.66 28 15.027 28 8.383 22.66 3 16.027 3zm0 22.633c-2.352 0-4.527-.727-6.34-2.059l-.453-.324-4.207 1.41 1.41-4.106-.34-.488A10.595 10.595 0 0 1 5.434 15c0-5.867 4.727-10.594 10.594-10.594 5.867 0 10.594 4.727 10.594 10.594-.004 5.867-4.73 10.633-10.594 10.633zm5.84-7.656c-.32-.16-1.883-.93-2.18-1.039-.293-.105-.504-.16-.715.16-.211.32-.82 1.039-1.004 1.25-.183.211-.367.242-.687.082-.32-.16-1.348-.496-2.568-1.582-.949-.848-1.59-1.898-1.777-2.219-.187-.32-.02-.492.14-.652.144-.145.32-.367.48-.551.16-.183.213-.32.32-.535.105-.215.053-.402-.027-.566-.082-.16-.715-1.73-.98-2.375-.258-.625-.52-.539-.715-.547h-.61c-.207 0-.543.078-.82.367-.277.293-1.078 1.055-1.078 2.574 0 1.52 1.105 2.988 1.262 3.199.156.211 2.18 3.32 5.28 4.652 3.105 1.328 3.105.887 3.664.832.558-.051 1.84-.746 2.102-1.469.262-.723.262-1.344.183-1.469-.078-.125-.289-.203-.61-.363z" />
        </svg>
      </Link>
    </>
  );
}
