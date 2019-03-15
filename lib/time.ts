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
