
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description: "The ultimate iPhone experience with a titanium design, A17 Pro chip, and the most advanced camera system.",
    price: 1199,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch-naturaltitanium?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1692845702708",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "Incredible performance with the A17 Pro chip, a customizable Action Button, and a powerful camera system.",
    price: 999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1692845702068",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    description: "Dynamic Island, 48MP Main camera, and USB-C. All in a durable color-infused glass and aluminum design.",
    price: 799,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1692845699703",
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    description: "A larger display with Dynamic Island, a 48MP Main camera, and USB-C. All in a durable color-infused glass and aluminum design.",
    price: 899,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1692845700877",
  },
];
