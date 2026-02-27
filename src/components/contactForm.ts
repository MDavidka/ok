import { ComponentProps } from '../types';

interface ContactFormProps extends ComponentProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

export function ContactForm({ className, onSubmit }: ContactFormProps): HTMLElement {
  const form = document.createElement('form');
  form.className = `max-w-md mx-auto ${className || ''}`;

  const nameLabel = document.createElement('label');
  nameLabel.className = 'block text-color-text text-sm font-bold mb-2';
  nameLabel.textContent = 'Name:';
  const nameInput = document.createElement('input');
  nameInput.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-color-secondary leading-tight focus:outline-none focus:shadow-outline';
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';
  nameInput.required = true;
  nameLabel.appendChild(nameInput);

  const emailLabel = document.createElement('label');
  emailLabel.className = 'block text-color-text text-sm font-bold mb-2';
  emailLabel.textContent = 'Email:';
  const emailInput = document.createElement('input');
  emailInput.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-color-secondary leading-tight focus:outline-none focus:shadow-outline';
  emailInput.type = 'email';
  emailInput.placeholder = 'Your Email';
  emailInput.required = true;
  emailLabel.appendChild(emailInput);

  const messageLabel = document.createElement('label');
  messageLabel.className = 'block text-color-text text-sm font-bold mb-2';
  messageLabel.textContent = 'Message:';
  const messageTextarea = document.createElement('textarea');
  messageTextarea.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-color-secondary leading-tight focus:outline-none focus:shadow-outline';
  messageTextarea.placeholder = 'Your Message';
  messageTextarea.rows = 4;
  messageTextarea.required = true;
  messageLabel.appendChild(messageTextarea);

  const submitButton = document.createElement('button');
  submitButton.className = 'button mt-4';
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageTextarea.value;
    onSubmit({ name, email, message });
  });

  form.appendChild(nameLabel);
  form.appendChild(emailLabel);
  form.appendChild(messageLabel);
  form.appendChild(submitButton);

  return form;
}