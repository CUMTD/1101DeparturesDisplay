import { MutableRefObject, useEffect, useRef } from 'react';
export function useInterval<T extends Function>(callback: T, updateInterval: number, deps?: ReadonlyArray<any>) {
    const savedCallback: MutableRefObject<T | undefined> = useRef<T>();
    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick(): void {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        const id = window.setInterval(tick, updateInterval);
        tick();

        return () => clearInterval(id);
    }, [updateInterval, ...(deps || [])]);
}
