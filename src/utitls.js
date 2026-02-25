function parseDDMMYYYY(dateStr) {
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
}

function formatDDMMYYYY(date) {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    `${pad(date.getDate())}/` +
    `${pad(date.getMonth() + 1)}/` +
    `${date.getFullYear()} ` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:` +
    `${pad(date.getSeconds())}`
  );
}

function getRandomTimeInAllowedRange() {
  const ranges = [
    { start: 6 * 60, end: 10 * 60 }, // 06:00 – 10:00
    { start: 18 * 60, end: 23 * 60 + 50 }, // 18:00 – 23:50
  ];

  const chosen = ranges[Math.floor(Math.random() * ranges.length)];
  const totalMinutes =
    chosen.start + Math.floor(Math.random() * (chosen.end - chosen.start + 1));

  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return { hour, minute };
}

export function generateDateStrings(count = 25) {
  const start = parseDDMMYYYY("02/04/2025 16:01:32");
  const end = parseDDMMYYYY("20/02/2026 16:01:32");

  if (start >= end) {
    throw new Error("Start date must be before end date");
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  const results = [];

  for (let i = 0; i < count; i++) {
    const randomTime = startTime + Math.random() * (endTime - startTime);

    const date = new Date(randomTime);

    const { hour, minute } = getRandomTimeInAllowedRange();
    date.setHours(hour, minute, Math.floor(Math.random() * 60), 0);

    results.push(date);
  }

  // Ensure increasing order
  results.sort((a, b) => a - b);

  return results.map(formatDDMMYYYY);
}
