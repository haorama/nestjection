export function performanceNow(startTime?: any) {
    let time = process.hrtime();

    if (startTime) {
        const end = process.hrtime(startTime);

        return (end[0]* 1000000000 + end[1]) / 1000000;

    }

    return (time[0]* 1000000000 + time[1]) / 1000000;
}