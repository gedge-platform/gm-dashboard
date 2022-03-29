const unixCurrentTime = () => Math.ceil(new Date().getTime() / 1000);

const unixStartTime = (interval) =>
    // interval : (10m) -> 10 * 60s, (1h) -> 60 * 60s
    // realtime => 5s
    Math.ceil(unixCurrentTime() - interval * 60);

const unixToTime = (unixTimestamp) => {
    const timestamp = new Date(unixTimestamp * 1000);
    return (
        ("0" + timestamp.getHours()).substring(
            ("0" + timestamp.getHours()).length - 2,
            ("0" + timestamp.getHours()).length
        ) +
        ":" +
        ("0" + timestamp.getMinutes()).substring(
            ("0" + timestamp.getMinutes()).length - 2,
            ("0" + timestamp.getMinutes()).length
        ) +
        ":" +
        ("0" + timestamp.getSeconds()).substring(
            ("0" + timestamp.getSeconds()).length - 2,
            ("0" + timestamp.getSeconds()).length
        )
    );
};

const stepConverter = (time) => {
    if (time < 1) {
        return time * 60 + "s";
    } else if (time < 60) {
        return time + "m";
    } else {
        return time / 60 + "h";
    }
};

const combinationMetrics = (...metrics) => {
    let result = "";

    for (let index = 0; index < metrics.length; index++) {
        if (index === metrics.length - 1) {
            result += metrics[index];
        } else {
            result += metrics[index] + "|";
        }
    }

    return result;
};

export {
    stepConverter,
    unixCurrentTime,
    unixStartTime,
    combinationMetrics,
    unixToTime,
};
