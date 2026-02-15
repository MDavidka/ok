import { formatDate } from '../utils';

export function renderAbout(container: HTMLElement): void {
  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'py-20 px-6 md:px-12 lg:px-24';

  aboutSection.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-semibold mb-6">About Me</h2>
      <p class="text-color-text-light leading-relaxed mb-4">
        Hello! My name is [Your Name] and I enjoy creating things that live on the internet.
        My interest in web development started back in [Year] when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
      </p>
      <p class="text-color-text-light leading-relaxed mb-4">
        Fast-forward to today, and I’ve had the privilege of working at a small startup and a large corporation. My main focus these days is building accessible, inclusive products and digital experiences at [Company].
      </p>
      <p class="text-color-text-light leading-relaxed mb-4">
        I'm also passionate about [mention your passions, e.g., open source, teaching, writing].
      </p>
      <p class="text-color-text-light leading-relaxed">
        Here are a few technologies I've been working with recently:
      </p>
      <ul class="grid grid-cols-2 gap-2 mt-4">
        <li><span class="text-color-primary">&#8227;</span> TypeScript</li>
        <li><span class="text-color-primary">&#8227;</span> React</li>
        <li><span class="text-color-primary">&#8227;</span> Tailwind CSS</li>
        <li><span class="text-color-primary">&#8227;</span> Node.js</li>
        <li><span class="text-color-primary">&#8227;</span> Next.js</li>
        <li><span class="text-color-primary">&#8227;</span> GraphQL</li>
      </ul>
    </div>
  `;

  container.appendChild(aboutSection);
}