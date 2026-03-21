function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d;
}

export function getDisabledRanges(bookings = []) {
  return [
    { before: new Date() },
    ...bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })),
  ];
}

export function isDateRangeBooked(startDate, endDate, bookings = []) {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  return bookings.some((booking) => {
    const bookingStart = normalizeDate(booking.dateFrom);
    const bookingEnd = normalizeDate(booking.dateTo);

    return start < bookingEnd && end > bookingStart;
  });
}
