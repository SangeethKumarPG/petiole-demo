import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Orders() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const orders = await getMyOrders(userId);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                    <p className="text-sm text-gray-600 break-all">
                      Order #{order.orderNumber}
                    </p>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-bold text-lg">
                        {formatCurrency(
                          order.totalPrice ?? 0,
                          order.currency ?? undefined
                        )}
                      </p>
                    </div>
                  </div>

                  {order.amountDiscount ? (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-red-700 font-medium mb-1">
                        Discount Applied:{" "}
                        {formatCurrency(
                          order.amountDiscount,
                          order.currency ?? undefined
                        )}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Original Subtotal:{" "}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.amountDiscount,
                          order.currency ?? undefined
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm font-semibold text-gray-600 mb-4">
                    Items in this order
                  </p>

                  <div className="space-y-4">
                    {order.products?.map((item, idx) => {
                      const product = item.product;

                      let displayImage: string | null = null;

                      if (product?.variants?.length) {
                        const variant = product.variants.find(
                          (v) => v.colorName === item.selectedColor
                        );
                        if (variant?.colorImage)
                          displayImage = imageUrl(variant.colorImage).url();
                      }

                      if (!displayImage && product?.image)
                        displayImage = imageUrl(product.image).url();

                      return (
                        <div
                          key={`${order.orderNumber}-${idx}`}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3"
                        >
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            {displayImage && (
                              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={displayImage}
                                  alt={product?.name ?? "Product"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-sm sm:text-base">
                                {product?.name}
                              </p>

                              <p className="text-sm text-gray-600">
                                Color: {item.selectedColor || "N/A"}
                              </p>

                              <p className="text-sm text-gray-600">
                                Size: {item.selectedSize || "N/A"}
                              </p>

                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="font-medium text-right">
                            {product?.price && item.quantity
                              ? formatCurrency(
                                  product.price * item.quantity,
                                  order.currency ?? undefined
                                )
                              : "N/A"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {order.shippingAddress ? (
                  <div className="px-4 py-4 sm:px-6 sm:py-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Shipping Address
                    </p>

                    <div className="text-sm text-gray-700 space-y-1">
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.street1}</p>
                      {order.shippingAddress.street2 && (
                        <p>{order.shippingAddress.street2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>
                      <p>
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </p>
                      <p>📞 {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
