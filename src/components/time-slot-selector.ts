// src/components/time-slot-selector.ts
import { ComponentProps, TimeSlot } from '../types';
import { generateTimeSlots } from '../utils';

interface TimeSlotSelectorProps extends ComponentProps {
  onTimeSlotSelect: (time: string) => void;
}

export function TimeSlotSelector({ onTimeSlotSelect, className }: TimeSlotSelectorProps) {
  const timeSlotSelectorElement = document.createElement('div');
  timeSlotSelectorElement.className = `time-slot-selector ${className || ''}`;

  const slots: TimeSlot[] = generateTimeSlots(60 * 9, 60 * 17, 30); // 9:00 to 17:00 in 30 minute intervals

  slots.forEach(slot => {
    const button = document.createElement('button');
    button.textContent = slot.time;
    button.className = `button ${slot.available ? '' : 'bg-muted cursor-not-allowed'}`;

    if (slot.available) {
      button.addEventListener('click', () => {
        onTimeSlotSelect(slot.time);
      });
    } else {
      button.disabled = true;
    }

    timeSlotSelectorElement.appendChild(button);
  });

  return timeSlotSelectorElement;
}