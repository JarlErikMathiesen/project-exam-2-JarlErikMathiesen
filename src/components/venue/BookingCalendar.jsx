import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;

  .rdp-root {
    --rdp-day-width: 28px;
    --rdp-day-height: 28px;
    margin: 0;
  }

  .rdp-day_button {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .rdp-month_grid {
    width: 100%;
  }

  @media (min-width: 480px) {
    .rdp-root {
      --rdp-day-width: 44px;
      --rdp-day-height: 44px;
      width: auto;
    }

    .rdp-day_button {
      width: 44px;
      height: 44px;
      font-size: 0.875rem;
    }

    .rdp-month_grid {
      width: auto;
    }
  }
`;

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
    <CalendarWrapper>
      <DayPicker
        mode="range"
        selected={{ from: dateFrom, to: dateTo }}
        onSelect={handleSelect}
        disabled={disabledRanges}
      />
    </CalendarWrapper>
  );
}
