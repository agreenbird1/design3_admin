const dayStamp = 60 * 60 * 24 * 1000;
let timeStamp = new Date().getTime();

const days: string[] = [];
for (let index = 0; index < 5; index++) {
  const time = new Date(timeStamp);
  const day =
    time.getFullYear() +
    "-" +
    (time.getMonth() + 1 > 9 ? "" + (time.getMonth() + 1) : "0") +
    (time.getMonth() + 1) +
    "-" +
    (time.getDate() > 9 ? "" + time.getDate() : "0" + time.getDate());
  days.push(day);
  timeStamp -= dayStamp;
}

export { days };
