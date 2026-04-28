export function addToCart(current: string[], item: string) { return Array.from(new Set([...current, item])) }
export function removeFromCart(current: string[], item: string) { return current.filter((x) => x !== item) }
