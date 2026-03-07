import { ComponentProps } from './types';

export function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function createProps(className: string | undefined): ComponentProps {
  return { className };
}