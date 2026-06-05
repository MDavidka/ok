import Image from "next/image";
import { Product } from "@/data/products";

type iPhoneCardProps = {
  product: Product;
};

export default function iPhoneCard({ product }: iPhoneCardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition duration-500 hover:scale-105">
      <Image
        className="w-full h-48 object-cover"
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={300}
        priority
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{product.name}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
