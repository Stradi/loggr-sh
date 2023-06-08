const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
  localeMatcher: "best fit",
  style: "narrow",
});

export function relativeDate(date) {
  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) * 0.001);
  const cutoffs = [
    60, // 1 minute
    3600, // 1 hour
    86400, // 1 day
    604_800, // 1 week
    2_592_000, // 1 month
    Infinity,
  ];

  const units = ["second", "minute", "hour", "day", "week", "month"];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );
  const divisor = cutoffs[unitIndex - 1] ?? 1;

  return relativeTimeFormatter.format(
    Math.floor(deltaSeconds / divisor),
    units[unitIndex]
  );
}
