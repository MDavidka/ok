export default function Home() {
  const features = [
    { title: "Fast", description: "Built on Next.js for instant loads and great SEO." },
    { title: "Beautiful", description: "A polished, responsive design out of the box." },
    { title: "Yours", description: "Fully editable — describe a change and Syra builds it." },
  ]
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <span className="rounded-full border px-4 py-1 text-sm text-muted-foreground">Powered by Syra</span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Your new website is ready to build
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Describe what you want and Syra will generate the pages, content and functionality for you.
        </p>
        <div className="flex gap-3">
          <a href="#features" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            Explore features
          </a>
          <a href="/contact" className="rounded-md border px-6 py-3 text-sm font-medium">
            Get in touch
          </a>
        </div>
      </section>
      <section id="features" className="border-t px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border bg-card p-6 text-card-foreground">
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="mt-auto border-t px-6 py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} — built with Syra
      </footer>
    </main>
  )
}
