import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface ProductDetailPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.brand}</p>
            <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-lg leading-relaxed text-gray-700">{product.description}</p>

            {/* Specifications */}
            <div className="border-t border-b py-4">
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                <li><strong className="font-medium">Display:</strong> {product.specs.display}</li>
                <li><strong className="font-medium">Processor:</strong> {product.specs.processor}</li>
                <li><strong className="font-medium">RAM:</strong> {product.specs.ram}</li>
                <li><strong className="font-medium">Storage:</strong> {product.specs.storage}</li>
                <li><strong className="font-medium">Camera:</strong> {product.specs.camera}</li>
                <li><strong className="font-medium">Battery:</strong> {product.specs.battery}</li>
              </ul>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full sm:w-auto">
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
