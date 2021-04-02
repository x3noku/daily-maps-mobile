export const translateTimeFromUTC = (timeUTC: any) => {
    //получения дубликата информации о дате
    const dateUTC = timeUTC.substr(0, 11); // string
    const anotherTimeUTC = timeUTC.substr(13, 7); // string
    // перевод времени из string в number
    timeUTC = Number(timeUTC.substr(11, 2)); // number
    // определение разницы часовых поясов
    const localTimeZoneHours = timeUTC - new Date().getTimezoneOffset() / 60; // number
    // получение дня недели UTC
    let nextDayDate = dateUTC.substr(8, 2); // string
    nextDayDate = Number(nextDayDate); // number
    if (localTimeZoneHours > 23) {
        nextDayDate += 1;
        nextDayDate = String(nextDayDate);
        return (
            dateUTC.substr(0, 8) +
            nextDayDate +
            dateUTC.substr(10, 1) +
            '0' +
            (localTimeZoneHours - 24) +
            anotherTimeUTC
        );
    }
    if (localTimeZoneHours < 10) {
        if (localTimeZoneHours < 0) {
            nextDayDate -= 1;
            nextDayDate = String(nextDayDate);
            return (
                dateUTC.substr(0, 8) + nextDayDate + dateUTC.substr(10, 1) + (24 + localTimeZoneHours) + anotherTimeUTC
            );
        }
        return dateUTC + '0' + localTimeZoneHours + anotherTimeUTC;
    } else {
        return dateUTC + localTimeZoneHours + anotherTimeUTC;
    }
};
