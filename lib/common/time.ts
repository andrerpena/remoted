export function timeAgo(date: Date, now: Date = new Date()) {
  var seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  var interval = Math.floor(seconds / (60 * 60 * 24 * 30 * 12));

  if (interval >= 1) {
    return interval + "y";
  }

  interval = Math.floor(seconds / (60 * 60 * 24 * 30));
  if (interval >= 1) {
    return interval + "m";
  }

  // days
  interval = Math.floor(seconds / (60 * 60 * 24));
  if (interval >= 1) {
    return interval + "d";
  }

  // hours
  interval = Math.floor(seconds / (60 * 60));
  if (interval >= 1) {
    return interval + "h";
  }

  // minutes
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + "min";
  }
  return Math.floor(seconds) + "s";
}

export interface TimeBucket<T> {
  title: string;
  data: Array<T>;
}

export function getTimeDifferenceInDays(
  recentDate: Date,
  olderDate: Date
): number {
  const timeDiff = Math.abs(recentDate.getTime() - olderDate.getTime());
  return timeDiff / (1000 * 3600 * 24);
}

export function bucketize<T>(
  items: Array<T>,
  getDate: (data: T) => Date,
  now: Date = new Date()
): Array<TimeBucket<T>> {
  const bucket24Hours: TimeBucket<T> = {
    title: "Remote jobs today",
    data: []
  };
  const bucketLast7Days: TimeBucket<T> = {
    title: "Remote jobs this week",
    data: []
  };
  const bucketLast30Days: TimeBucket<T> = {
    title: "Remote jobs this month",
    data: []
  };
  const bucketOlder: TimeBucket<T> = {
    title: "Older",
    data: []
  };
  if (items) {
    for (let item of items) {
      const date = getDate(item);
      const difference = getTimeDifferenceInDays(now, date);
      if (difference <= 1) {
        bucket24Hours.data.push(item);
        continue;
      }
      if (difference <= 7) {
        bucketLast7Days.data.push(item);
        continue;
      }
      if (difference <= 30) {
        bucketLast30Days.data.push(item);
        continue;
      }
      bucketOlder.data.push(item);
    }
  }
  const result: Array<TimeBucket<T>> = [];
  if (bucket24Hours.data.length) {
    result.push(bucket24Hours);
  }
  if (bucketLast7Days.data.length) {
    result.push(bucketLast7Days);
  }
  if (bucketLast30Days.data.length) {
    result.push(bucketLast30Days);
  }
  if (bucketOlder.data.length) {
    result.push(bucketOlder);
  }
  return result;
}
