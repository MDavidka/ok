import { ComponentProps } from '../types';
import { formatDate } from '../utils';

export interface BlogPostProps extends ComponentProps {
  title: string;
  date: Date;
  content: string;
  imageUrl?: string;
  author?: string;
}

export function renderBlogPost(props: BlogPostProps, container: HTMLElement): void {
  const blogPost = document.createElement('div');
  blogPost.className = `card mb-8 ${props.className || ''}`;

  if (props.imageUrl) {
    const image = document.createElement('img');
    image.src = props.imageUrl;
    image.alt = props.title;
    image.className = 'w-full h-64 object-cover rounded-t-[var(--radius-md)]';
    blogPost.appendChild(image);
  }

  const content = document.createElement('div');
  content.className = 'p-4';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-2';
  title.textContent = props.title;
  content.appendChild(title);

  const date = document.createElement('p');
  date.className = 'text-[var(--color-muted)] text-sm mb-2';
  date.textContent = formatDate(props.date);
  content.appendChild(date);

  if (props.author) {
    const author = document.createElement('p');
    author.className = 'text-[var(--color-muted)] text-sm mb-2';
    author.textContent = `By ${props.author}`;
    content.appendChild(author);
  }

  const blogContent = document.createElement('p');
  blogContent.className = 'text-base';
  blogContent.textContent = props.content;
  content.appendChild(blogContent);

  blogPost.appendChild(content);
  container.appendChild(blogPost);
}