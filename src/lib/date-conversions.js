export const convertToTimeAgo = (dateStr) => {
  const dateCreated = new Date(dateStr).getTime();
  const dateNow = Date.now();
  const diffInMinutes = (dateNow - dateCreated) / (1000 * 60);

  switch (true) {
    case diffInMinutes < 1:
      return "Just now";

    case diffInMinutes < 60:
      return `${diffInMinutes.toFixed()} minutes ago`;

    case diffInMinutes < 60 * 24:
      return `${(diffInMinutes / 60).toFixed()} hours ago`;

    default:
      return new Date(dateStr).toLocaleString("en-US", {
        dateStyle: "medium",
      });
  }
};

export const convertToLocaleDate = (dateStr) => {
  return new Date(dateStr).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const convertToHtmlDateValue = (dateTimeStr) => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const dateParts = new Date(dateTimeStr).toDateString().split(" ");

  return `${dateParts[3]}-${months[dateParts[1]]}-${dateParts[2]}`;
};
