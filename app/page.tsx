import iPhoneCard from "@/components/iPhoneCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
        Our Latest iPhones
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <iPhoneCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
