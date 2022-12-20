export default function timeSort (dateArray: any[]) {

  // FORMAT FOR SORTING:
    // "MM/DD/YYYY, HH:MM:SS AM/PM"

  const sortedArray = dateArray.sort((date1, date2): number => {

    // sorts by year first
    if (yearRef(date1) < yearRef(date2)) {
      return -1;
    } else if (yearRef(date1) > yearRef(date2)) {
      return 1;
    };

    // sorts by month second
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) < monthRef(date2)
    ) {
      return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) > monthRef(date2)
      ) {
        return 1;
    };

    // sorts by day third
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) < dayRef(date2)
    ) {
      return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) < dayRef(date2)
      ) {
        return 1;
    };

    // sorts by time of day fourth
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === "AM" && timeOfDayRef(date2) === "PM"
      ) {
        return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === "PM" && timeOfDayRef(date2) === "AM"
      ) {
        return 1;
    };

    // sorts by hour fifth
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) < hourRef(date2)
    ) {
      return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) > hourRef(date2)
      ) {
        return 1;
    };

    // sorts by minute sixth
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) === hourRef(date2)
      && minuteRef(date1) < minuteRef(date2)
    ) {
      return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) === hourRef(date2)
      && minuteRef(date1) > minuteRef(date2)
      ) {
        return 1;
    }

    // sorts by second seventh
    if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) === hourRef(date2)
      && minuteRef(date1) === minuteRef(date2)
      && secondsRef(date1) < secondsRef(date2)
    ) {
      return -1;
    } else if (yearRef(date1) === yearRef(date2)
      && monthRef(date1) === monthRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && dayRef(date1) === dayRef(date2)
      && timeOfDayRef(date1) === timeOfDayRef(date2)
      && hourRef(date1) === hourRef(date2)
      && minuteRef(date1) === minuteRef(date2)
      && secondsRef(date1) > secondsRef(date2)
      ) {
        return 1;
    };

    return 0;
  });

  return sortedArray;
};

const yearRef = function (date: any): number {
  return Number(date.split('/')[0]);
};

const monthRef = function (date: any): number {
  return Number(date.split('/')[1]);
};

const dayRef = function (date: any): number {
  return Number(date.split('/')[2].split(',')[0]);
};

const timeOfDayRef = function (date: any): string {
  return date.slice(-2);
};

const hourRef = function (date: any): number {
  return Number(date.split(',')[1].split(':')[0]);
};

const minuteRef = function (date: any): number {
  return Number(date.split(',')[1].split(':')[1]);
};

const secondsRef = function (date: any): number {
  return Number(date.split(',')[1].split(':')[2].split(' ')[0]);
};