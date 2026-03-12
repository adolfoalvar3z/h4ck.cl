const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export function parsePostDate(dateValue: string): Date {
  const direct = new Date(dateValue);
  if (!Number.isNaN(direct.getTime())) {
    return direct;
  }

  const match = dateValue.trim().match(/^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/);
  if (!match) {
    return new Date(0);
  }

  const [, rawMonth, rawDay, rawYear] = match;
  const month = MONTH_MAP[rawMonth.toLowerCase()];
  const day = Number(rawDay);
  const year = Number(rawYear);

  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) {
    return new Date(0);
  }

  return new Date(Date.UTC(year, month, day));
}

export function postTimestamp(dateValue: string): number {
  return parsePostDate(dateValue).getTime();
}

export function sortByPostDateDesc<T extends { data: { date: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => postTimestamp(b.data.date) - postTimestamp(a.data.date));
}

export function toIsoDateString(dateValue: string): string {
  return parsePostDate(dateValue).toISOString();
}
