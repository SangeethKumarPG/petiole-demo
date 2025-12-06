export function getFinalPrice(product: { price?: number; discountPercentage?: number }) {
  const price = product.price ?? 0;
  const discount = product.discountPercentage ?? 0;

  if (!discount || discount <= 0) return price;

  return Number((price - price * (discount / 100)).toFixed(2));
}
