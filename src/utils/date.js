/**
 * Normalizes a date by setting its time to noon (12:00:00.000).
 * This avoids timezone-related off-by-one errors when comparing dates.
 *
 * @param {Date|string|number} date - The date to normalize.
 * @returns {Date} A new Date object set to 12:00:00.000 on the given day.
 */
function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d;
}

/**
 * Builds an array of disabled date ranges for a date picker,
 * including all dates before today and any already-booked ranges.
 *
 * @param {Array<{dateFrom: Date|string, dateTo: Date|string}>} [bookings=[]] - List of existing bookings.
 * @returns {Array<{before: Date}|{from: Date, to: Date}>} Disabled ranges compatible with a date picker's `disabled` prop.
 */
export function getDisabledRanges(bookings = []) {
  return [
    { before: new Date() },
    ...bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })),
  ];
}

/**
 * Checks whether a proposed date range overlaps with any existing booking.
 * Uses an overlap condition: two ranges overlap if one starts before the other ends.
 *
 * @param {Date|string|number} startDate - The start of the proposed range.
 * @param {Date|string|number} endDate - The end of the proposed range.
 * @param {Array<{dateFrom: Date|string, dateTo: Date|string}>} [bookings=[]] - List of existing bookings to check against.
 * @returns {boolean} `true` if the range overlaps with at least one booking, `false` otherwise.
 */
export function isDateRangeBooked(startDate, endDate, bookings = []) {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  return bookings.some((booking) => {
    const bookingStart = normalizeDate(booking.dateFrom);
    const bookingEnd = normalizeDate(booking.dateTo);

    return start < bookingEnd && end > bookingStart;
  });
}
