export function formatPrice(price) {
  return `LKR ${(Math.floor(price * 100) / 100).toFixed(2)}`;
}

export function formatQuantity(quantity) {
  if (quantity === 0) {
    return 'Out of Stock';
  }
  return `Stock: ${quantity}`;
}
