import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          About Syra Phones
        </h1>

        {/* Our Story Section */}
        <section className="mb-12 md:mb-16">
          <Card className="p-6 md:p-8">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-2xl md:text-3xl font-semibold">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-0 text-muted-foreground space-y-4">
              <p>
                Founded in 2023, Syra Phones began with a simple vision: to make cutting-edge smartphone technology accessible to everyone. In a world increasingly connected through mobile devices, we saw an opportunity to curate a selection of the best phones, from budget-friendly options to the latest flagships, ensuring quality and performance for every user.
              </p>
              <p>
                What started as a small online venture quickly grew, fueled by our passion for innovation and a commitment to customer satisfaction. We believe that a great phone can enhance daily life, connect us to loved ones, and empower us to achieve more. That belief drives us to constantly seek out the newest trends, the most reliable brands, and the best value for our customers.
              </p>
              <p>
                Today, Syra Phones is more than just a store; it's a community for tech enthusiasts and everyday users alike. We're proud of our journey and excited for the future, continuing to evolve and bring you the best in mobile technology.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission Section */}
        <section className="mb-12 md:mb-16">
          <Card className="p-6 md:p-8">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-2xl md:text-3xl font-semibold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-0 text-muted-foreground space-y-4">
              <p>
                Our mission at Syra Phones is to be the most trusted and comprehensive destination for mobile technology. We aim to empower our customers by providing a diverse range of high-quality smartphones, accessories, and expert advice, all while ensuring an exceptional shopping experience. We are dedicated to transparency, affordability, and staying ahead of the curve in the fast-paced world of mobile innovation.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Values Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-xl font-semibold">Customer Focus</CardTitle>
              </CardHeader>
              <CardContent className="px-0 py-0 text-muted-foreground">
                <p>
                  We put our customers at the heart of everything we do, striving to exceed expectations with personalized service and support.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-xl font-semibold">Innovation</CardTitle>
              </CardHeader>
              <CardContent className="px-0 py-0 text-muted-foreground">
                <p>
                  We embrace technological advancements and continuously update our offerings to bring you the latest and greatest in mobile.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-xl font-semibold">Integrity</CardTitle>
              </CardHeader>
              <CardContent className="px-0 py-0 text-muted-foreground">
                <p>
                  We operate with honesty and transparency, building trust through ethical practices and reliable products.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}