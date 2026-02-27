import { TimeSlot } from './types';

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

export function generateTimeSlots(startTime: number, endTime: number, interval: number): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];
  for (let i = startTime; i < endTime; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    timeSlots.push({ time, available: true });
  }
  return timeSlots;
}