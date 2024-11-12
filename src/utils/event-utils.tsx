let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Các ngày trong tuần",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Ngày hiện tại",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
