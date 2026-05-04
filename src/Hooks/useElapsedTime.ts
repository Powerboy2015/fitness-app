import {useEffect, useState} from "react";


/**
 * Starts a timer based of the given start time and updates the amount of seconds since that start time.
 * Updates in realtime.
 * @param _startTime - the time from which the count the seconds Past.
 */
export default function useElapsedTime(_startTime: string | Date) {
    const startTime =
        typeof _startTime === "string"
            ? new Date(_startTime).getTime()
            : _startTime.getTime();

    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        if (isNaN(startTime)) return;

        const update = () => {
            const now = Date.now();
            setElapsedSeconds(Math.floor((now - startTime) / 1000));
        };

        update();

        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    return elapsedSeconds;
}