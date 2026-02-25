import { generateDateStrings } from "./utitls";

const BILL_COUNT = 2;

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
