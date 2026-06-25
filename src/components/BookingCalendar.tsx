import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isDateInHighSeason, isDateInBookingSeason } from '../utils/bookingUtils';

const HU_MONTHS = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december'
];

const HU_DAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

interface BookingCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onDateSelect: (date: Date) => void;
  isSelectingCheckOut: boolean;
  blockedDates: Set<string>;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function toISOKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function BookingCalendar({
  checkIn, checkOut, onDateSelect, isSelectingCheckOut, blockedDates
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  function goToPrev() {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  }

  function goToNext() {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  }

  function canGoPrev(): boolean {
    if (displayYear > today.getFullYear()) return true;
    if (displayYear === today.getFullYear() && displayMonth > today.getMonth()) return true;
    return false;
  }

  function renderMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDow = new Date(year, month, 1).getDay();
    const startOffset = firstDow === 0 ? 6 : firstDow - 1;

    const cells: JSX.Element[] = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push(<div key={`e-${i}`} className="aspect-square" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isBlocked = blockedDates.has(toISOKey(year, month, d));
      const isOutOfSeason = !isDateInBookingSeason(date);
      const isUnavailable = isPast || isBlocked || isOutOfSeason;
      const isCI = checkIn ? isSameDay(date, checkIn) : false;
      const isCO = checkOut ? isSameDay(date, checkOut) : false;
      const inRange = checkIn && checkOut && date > checkIn && date < checkOut;
      const inHoverRange = isSelectingCheckOut && checkIn && !checkOut && hoverDate
        && date > checkIn && date <= hoverDate && !isBlocked && !isOutOfSeason;
      const highSeason = isDateInHighSeason(date);
      const isToday = isSameDay(date, today);

      let classes = 'relative w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-150 ';

      if (isOutOfSeason && !isPast) {
        classes += 'bg-gray-50 text-gray-300 cursor-not-allowed';
      } else if (isBlocked && !isPast) {
        classes += 'bg-red-50 text-gray-400 line-through cursor-not-allowed';
      } else if (isPast) {
        classes += 'text-gray-300 cursor-not-allowed';
      } else if (isCI || isCO) {
        classes += 'bg-[#111828] text-white font-semibold shadow-sm';
      } else if (inRange) {
        classes += 'bg-gray-100 text-gray-900 hover:bg-gray-200 cursor-pointer';
      } else if (inHoverRange) {
        classes += 'bg-gray-50 text-gray-700 cursor-pointer';
      } else {
        classes += 'text-gray-700 hover:bg-gray-100 cursor-pointer';
      }

      if (isToday && !isCI && !isCO && !isBlocked && !isOutOfSeason) {
        classes += ' ring-1 ring-gray-300 ring-inset';
      }

      const getTitle = () => {
        if (isOutOfSeason) return 'Csak április 1. és november 1. között foglalható';
        if (isBlocked) return 'Foglalt';
        return undefined;
      };

      cells.push(
        <button
          key={d}
          type="button"
          disabled={isUnavailable}
          onClick={() => !isUnavailable && onDateSelect(date)}
          onMouseEnter={() => !isUnavailable && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
          className={classes}
          aria-label={`${year}. ${HU_MONTHS[month]} ${d}.${isOutOfSeason ? ' — Nem foglalható' : isBlocked ? ' — Foglalt' : ''}`}
          title={getTitle()}
        >
          {d}
          {isBlocked && !isPast && (
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
          )}
          {highSeason && !isPast && !isBlocked && !isOutOfSeason && (
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
          )}
        </button>
      );
    }

    return (
      <div>
        <h3 className="text-center text-base font-medium text-gray-900 mb-3">
          {year}. {HU_MONTHS[month]}
        </h3>
        <div className="grid grid-cols-7 mb-1">
          {HU_DAYS.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells}
        </div>
      </div>
    );
  }

  const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1;
  const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrev}
          disabled={!canGoPrev()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:gap-10">
        {renderMonth(displayYear, displayMonth)}
        {renderMonth(nextYear, nextMonth)}
      </div>

      <div className="md:hidden">
        {renderMonth(displayYear, displayMonth)}
      </div>

      <div className="mt-5 space-y-3">
        <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            Foglalható időszak: <span className="font-medium">április 1. – november 1.</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>Foglalt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Főszezon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#111828]" />
            <span>Kiválasztott</span>
          </div>
          {checkIn && checkOut && (
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-gray-100 border border-gray-200" />
              <span>Tartózkodás</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
