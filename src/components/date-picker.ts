// src/components/date-picker.ts
import { ComponentProps } from '../types';
import { formatDate } from '../utils';

interface DatePickerProps extends ComponentProps {
  onDateSelect: (date: Date) => void;
}

export function DatePicker({ onDateSelect, className }: DatePickerProps) {
  const datePickerElement = document.createElement('div');
  datePickerElement.className = `date-picker ${className || ''}`;

  const today = new Date();
  const displayDate = document.createElement('p');
  displayDate.textContent = formatDate(today);
  datePickerElement.appendChild(displayDate);

  const selectButton = document.createElement('button');
  selectButton.textContent = 'Select Date';
  selectButton.className = 'button';
  selectButton.addEventListener('click', () => {
      const selectedDate = new Date(prompt("Enter date (YYYY-MM-DD):") || "");
      if (!isNaN(selectedDate.getTime())) {
          displayDate.textContent = formatDate(selectedDate);
          onDateSelect(selectedDate);
      }
  });
  datePickerElement.appendChild(selectButton);

  return datePickerElement;
}