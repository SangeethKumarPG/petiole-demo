"use client";

import AddtoBasketButton from "@/components/AddtoBasket";
import { imageUrl } from "@/lib/imageUrl";
import { useBasketStore } from "@/lib/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { formatCurrency } from "@/lib/formatCurrency"; // ✅ Added

type ShippingAddress = {
  fullName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export default function BasketPage() {
  const groupedItems = useBasketStore((s) => s.getGroupedItems());
  const getTotalPrice = useBasketStore.getState().getTotalPrice;

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => setIsClient(true), []);
  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  const updateAddress = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof ShippingAddress) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const requiredFields: (keyof ShippingAddress)[] = [
    "fullName",
    "street1",
    "city",
    "state",
    "postalCode",
    "country",
    "phone",
  ];

  const isAddressValid = () =>
    requiredFields.every((f) => {
      const value = address[f] ?? "";
      return value.toString().trim().length > 0;
    });

  const handleCheckout = async () => {
    if (!isSignedIn) return;

    if (!isAddressValid()) {
      const t: Record<string, boolean> = {};
      requiredFields.forEach((f) => (t[f] = true));
      setTouched(t);
      return;
    }

    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? address.fullName,
        customerEmail: user?.emailAddresses?.[0]?.emailAddress ?? "unknown",
        clerkUserId: user?.id ?? "unknown",
        shipping_fullName: address.fullName,
        shipping_street1: address.street1,
        shipping_street2: address.street2 ?? "",
        shipping_city: address.city,
        shipping_state: address.state,
        shipping_postalCode: address.postalCode,
        shipping_country: address.country,
        shipping_phone: address.phone,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch {
      alert("Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = groupedItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = getTotalPrice();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems.map((item, idx) => {
            const product = item.product;
            const variant = product.variants?.find(
              (v) => v.colorName === product.selectedColor
            );

            const imageSrc = variant?.colorImage
              ? imageUrl(variant.colorImage).url()
              : product.image
              ? imageUrl(product.image).url()
              : "/placeholder.png";

            return (
              <div
                key={idx}
                className="mb-4 p-4 border rounded flex flex-col sm:flex-row justify-between bg-white shadow-sm"
              >
                <div
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() =>
                    router.push(`/product/${product.slug?.current}`)
                  }
                >
                  <div className="relative w-24 h-24 mr-4">
                    <Image
                      src={imageSrc}
                      alt={product?.name ?? "Product"}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Color: {product.selectedColor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Size: {product.selectedSize}
                    </p>

                    {/* ✅ price formatting updated */}
                    <p className="text-sm font-bold mt-2">
                      {formatCurrency((product.price ?? 0) * item.quantity)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0">
                  <AddtoBasketButton product={product} disabled={false} />
                </div>
              </div>
            );
          })}
        </div>

        <aside className="w-full lg:w-80 p-6 bg-white border rounded shadow-sm">
          <h3 className="text-xl font-semibold">Order Summary</h3>

          <div className="mt-4">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>{totalItems}</span>
            </p>

            {/* ✅ price formatting updated */}
            <p className="flex justify-between text-2xl font-bold border-t pt-2 mt-2">
              <span>Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </p>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Shipping Address</h4>

          <div className="grid gap-3">
            <InputField
              label="Full Name *"
              value={address.fullName}
              error={touched.fullName && !address.fullName}
              onChange={(v) => updateAddress("fullName", v)}
              onBlur={() => markTouched("fullName")}
            />
            <InputField
              label="Street Address *"
              value={address.street1}
              error={touched.street1 && !address.street1}
              onChange={(v) => updateAddress("street1", v)}
              onBlur={() => markTouched("street1")}
            />
            <InputField
              label="Apartment / Suite (optional)"
              value={address.street2 ?? ""}
              onChange={(v) => updateAddress("street2", v)}
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="City *"
                value={address.city}
                error={touched.city && !address.city}
                onChange={(v) => updateAddress("city", v)}
                onBlur={() => markTouched("city")}
              />
              <InputField
                label="State *"
                value={address.state}
                error={touched.state && !address.state}
                onChange={(v) => updateAddress("state", v)}
                onBlur={() => markTouched("state")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Postal Code *"
                value={address.postalCode}
                error={touched.postalCode && !address.postalCode}
                onChange={(v) => updateAddress("postalCode", v)}
                onBlur={() => markTouched("postalCode")}
              />
              <InputField
                label="Country *"
                value={address.country}
                error={touched.country && !address.country}
                onChange={(v) => updateAddress("country", v)}
                onBlur={() => markTouched("country")}
              />
            </div>

            <InputField
              label="Phone *"
              value={address.phone}
              error={touched.phone && !address.phone}
              placeholder="+971 5X XXX XXXX"
              onChange={(v) => updateAddress("phone", v)}
              onBlur={() => markTouched("phone")}
            />
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={!isAddressValid() || isLoading}
              className={`mt-6 w-full px-4 py-2 rounded text-white ${
                !isAddressValid() || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-600 hover:bg-lime-700"
              }`}
            >
              {isLoading ? "Processing…" : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-6 w-full bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </aside>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  placeholder?: string;
  error?: boolean;
  onChange: (v: string) => void;
  onBlur?: () => void;
}) {
  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full p-2 border rounded text-sm ${
          error ? "border-rose-500" : ""
        }`}
      />
      {error && (
        <p className="text-xs text-rose-600 mt-1">This field is required.</p>
      )}
    </div>
  );
}
