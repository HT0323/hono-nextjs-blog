export const convertToJST = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo", // 日本時間
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Intl.DateTimeFormat("ja-JP", options).format(date);
};
