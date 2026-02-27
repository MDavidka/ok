// src/components/reservation-form.ts
import { ComponentProps } from '../types';
import { DatePicker } from './date-picker';
import { TimeSlotSelector } from './time-slot-selector';

interface ReservationFormProps extends ComponentProps { }

export function ReservationForm({ className }: ReservationFormProps) {
  const reservationFormElement = document.createElement('div');
  reservationFormElement.className = `reservation-form ${className || ''}`;

  let selectedDate: Date | null = null;
  let selectedTime: string | null = null;

  const handleDateSelect = (date: Date) => {
    selectedDate = date;
    console.log('Selected Date:', date);
  };

  const handleTimeSlotSelect = (time: string) => {
    selectedTime = time;
    console.log('Selected Time:', time);
  };

  const datePicker = DatePicker({ onDateSelect: handleDateSelect });
  const timeSlotSelector = TimeSlotSelector({ onTimeSlotSelect: handleTimeSlotSelect });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Make Reservation';
  submitButton.className = 'button';
  submitButton.addEventListener('click', () => {
    if (selectedDate && selectedTime) {
      alert(`Reservation confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}`);
    } else {
      alert('Please select a date and time.');
    }
  });

  reservationFormElement.appendChild(datePicker);
  reservationFormElement.appendChild(timeSlotSelector);
  reservationFormElement.appendChild(submitButton);

  return reservationFormElement;
}