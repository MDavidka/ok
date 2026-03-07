import { ComponentProps } from '../types';
import '../style.css';

interface OrderFormProps extends ComponentProps { }

export const OrderForm = ({ className }: OrderFormProps) => {
    return `
        <section class="${className}">
            <div class="container mx-auto py-8">
                <h2 class="text-3xl font-bold mb-4 text-center">Order Online</h2>
                <p>Placeholder for online ordering functionality.  Integrate with a backend service for complete functionality.</p>
            </div>
        </section>
    `;
};