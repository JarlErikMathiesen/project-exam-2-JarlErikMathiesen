import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function BookingCalendar({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  disabledRanges,
}) {
  function handleSelect(range) {
    setDateFrom(range?.from);
    setDateTo(range?.to);
  }

  return (
    <DayPicker
      mode="range"
      selected={{ from: dateFrom, to: dateTo }}
      onSelect={handleSelect}
      disabled={disabledRanges}
    />
  );
}
