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
  return bookings.some((booking) => {
    const bookingStart = new Date(booking.dateFrom);
    const bookingEnd = new Date(booking.dateTo);

    return startDate < bookingEnd && endDate > bookingStart;
  });
}
