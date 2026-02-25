/**
 * UTILS
 */

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
const p = prompt("Number of bill 3500 - 4000");
const BILL_COUNT = p || 30;

function randomBetween3500And4000() {
  return +(Math.random() * (4000 - 3200) + 3200).toFixed(2);
}

const PRICE = 95.69;
const VoucherNumber = Array.from(
  { length: 25 },
  randomBetween495380And844875,
).sort();

const VoucherId = Array.from({ length: 25 }, () =>
  Math.random().toString(36).slice(2, 10),
);

function randomBetween495380And844875() {
  const min = 495380;
  const max = 844875;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dateString = generateDateStrings(BILL_COUNT);

const data = Array.from({ length: BILL_COUNT }, (i, index) => {
  const fuel = randomBetween3500And4000().toFixed(2);
  const returnAmt = (4000 - fuel).toFixed(2);
  return {
    fuel,
    returnAmt,
    volume: (fuel / PRICE).toFixed(2),
    voucherNumber: VoucherNumber[index],
    voucherId: VoucherId[index],
    date: dateString[index],
  };
});

console.log("Got", data);

function createElement(data) {
  console.log(data);

  const billEl = document.querySelector("#page_0").cloneNode(true);
  console.log(billEl);

  const dateEl = billEl.querySelector(
    "#page_0 > div.pdf24_view > div > div:nth-child(8) > span",
  );
  dateEl.innerText = `${data.date}  `;

  const volumeEl = billEl.querySelector(
    "#page_0 > div.pdf24_view > div > div:nth-child(23) > span",
  );
  volumeEl.innerText = `${data.volume} `;

  const voucherIdEl = billEl.querySelector(
    `#page_0 > div.pdf24_view > div > div:nth-child(9) > span`,
  );

  voucherIdEl.innerText = `${data.voucherId} `;

  const voucherNumberEl = billEl.querySelector(
    "#page_0 > div.pdf24_view > div > div:nth-child(17) > span",
  );
  voucherNumberEl.innerText = `${data.voucherNumber} `;

  const fuelEl = billEl.querySelector(
    "#page_0 > div.pdf24_view > div > div:nth-child(29) > span",
  );
  fuelEl.innerText = `${data.fuel} `;

  const refundEl = billEl.querySelector(
    "#page_0 > div.pdf24_view > div > div:nth-child(30) > span",
  );

  refundEl.innerText = `${data.returnAmt} `;
  document.body.appendChild(billEl);
}

data.forEach((d) => createElement(d));
