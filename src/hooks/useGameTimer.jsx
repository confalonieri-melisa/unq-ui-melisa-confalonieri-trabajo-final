import { useEffect, useState } from "react"

export const useGameTimer = () => {
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }, [timeoutId]);

    const setTimer = (callback, delay) => {
        if(timeoutId) clearTimeout(timeoutId);

        const id = setTimeout(callback, delay);
        setTimeoutId(id);
        return id;
    }

    const clearTimer = () => {
        if(timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }

    return { setTimer, clearTimer }
}