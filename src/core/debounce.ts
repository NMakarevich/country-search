export default function debounce<T extends unknown[]>(
  func: (...args: T) => Promise<unknown[]>,
  delay: number
): (...args: T) => Promise<unknown[]> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(func(...args));
      }, delay);
    });
  };
}
