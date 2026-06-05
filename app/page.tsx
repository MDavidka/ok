import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function HomePage() {
  const featuredCategories = [
    {
      name: "Latest Flagships",
      description: "Discover the newest and most powerful smartphones.",
      image: "/images/category-flagship.webp", // Placeholder image
      href: "/products?category=flagship",
    },
    {
      name: "Budget Friendly",
      description: "Great performance without breaking the bank.",
      image: "/images/category-budget.webp", // Placeholder image
      href: "/products?category=budget",
    },
    {
      name: "Gaming Phones",
      description: "Unleash your gaming potential on the go.",
      image: "/images/category-gaming.webp", // Placeholder image
      href: "/products?category=gaming",
    },
    {
      name: "Camera Focused",
      description: "Capture life's moments with stunning clarity.",
      image: "/images/category-camera.webp", // Placeholder image
      href: "/products?category=camera",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full bg-cover bg-center flex items-center justify-center text-center p-4"
          style={{ backgroundImage: "url('/images/hero-banner.webp')" }} // Placeholder image
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
          <div className="relative z-10 text-white max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Experience the Future in Your Hand
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mt-2">
              Explore the latest smartphones with cutting-edge technology and stunning designs.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link href="/products">Shop All Phones</Link>
            </Button>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="container py-12 md:py-16 lg:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Card key={category.name} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <Link href={category.href}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardHeader className="relative z-10 pt-4 pb-2">
                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300">{category.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-200">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-4">
                    <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black">
                      View Category
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Promotional Banners Section */}
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner 1 */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden flex items-center p-6 md:p-8">
              <div className="relative z-10 text-white space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold">Limited Time Offer!</h3>
                <p className="text-lg">Get up to 20% off on selected models.</p>
                <Button variant="secondary" asChild>
                  <Link href="/products?sale=true">Shop Sale</Link>
                </Button>
              </div>
              <Image
                src="/images/promo-banner-1.webp" // Placeholder image
                alt="Limited Time Offer"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 opacity-30"
              />
            </div>

            {/* Banner 2 */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg overflow-hidden flex items-center justify-end text-right p-6 md:p-8">
              <div className="relative z-10 text-white space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold">New Arrivals Daily</h3>
                <p className="text-lg">Be the first to own the latest tech.</p>
                <Button variant="secondary" asChild>
                  <Link href="/products?new=true">Discover More</Link>
                </Button>
              </div>
              <Image
                src="/images/promo-banner-2.webp" // Placeholder image
                alt="New Arrivals"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 opacity-30"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="container py-12 md:py-16 lg:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Our Top Picks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => ( // Display first 4 products as featured
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}