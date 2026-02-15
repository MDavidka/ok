import '../style.css';

export function renderHero(container: HTMLElement): void {
  container.innerHTML = `
    <section class="bg-gray-900 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm [Your Name]
            </h1>
            <p class="text-lg mb-6">
              I'm a passionate frontend developer specializing in creating
              modern and user-friendly web applications.
            </p>
            <a
              href="#"
              class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View My Work
            </a>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/500"
              alt="Your Image"
              class="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  `;
}