import { useEffect, useMemo, useRef } from "react";

/**
 * Retourne une version "debounced" de `callback` : l'appel n'est exécuté
 * qu'après `delay` ms sans nouvel appel. Le timer est annulé au démontage.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => unknown,
  delay: number
): (...args: Args) => void {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return useMemo(
    () =>
      (...args: Args) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          void callbackRef.current(...args);
        }, delay);
      },
    [delay]
  );
}
