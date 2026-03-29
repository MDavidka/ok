import { ComponentProps } from '../types';
import '../style.css';

interface ReservationFormProps extends ComponentProps { }

export const ReservationForm = ({ className }: ReservationFormProps) => {
    return `
        <section class="${className}">
            <div class="container mx-auto py-8">
                <h2 class="text-3xl font-bold mb-4 text-center">Make a Reservation</h2>
                <p>Placeholder for reservation functionality. Integrate with a backend service for complete functionality.</p>
            </div>
        </section>
    `;
};