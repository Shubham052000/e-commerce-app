export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
}
