import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const HU_MONTHS = [
  'januar', 'februar', 'marcius', 'aprilis', 'majus', 'junius',
  'julius', 'augusztus', 'szeptember', 'oktober', 'november', 'december'
];

const HU_MONTHS_DISPLAY = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december'
];

const HU_DAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

interface CancelCalendarProps {
  activeDates: string[];
  selectedForCancel: Set<string>;
  onToggleDate: (dateStr: string) => void;
}

function toISOKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CancelCalendar({
  activeDates,
  selectedForCancel,
  onToggleDate,
}: CancelCalendarProps) {
  const activeDateSet = new Set(activeDates);

  const firstDate = activeDates.length > 0
    ? new Date(activeDates[0] + 'T00:00:00')
    : new Date();

  const [displayMonth, setDisplayMonth] = useState(firstDate.getMonth());
  const [displayYear, setDisplayYear] = useState(firstDate.getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  function renderMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDow = new Date(year, month, 1).getDay();
    const startOffset = firstDow === 0 ? 6 : firstDow - 1;

    const cells: JSX.Element[] = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push(<div key={`e-${i}`} className="aspect-square" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = toISOKey(year, month, d);
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isActive = activeDateSet.has(key);
      const isSelected = selectedForCancel.has(key);

      let classes = 'relative w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-150 ';

      if (isActive && !isPast) {
        if (isSelected) {
          classes += 'bg-red-100 text-red-800 font-semibold ring-2 ring-red-400 ring-inset cursor-pointer hover:bg-red-200';
        } else {
          classes += 'bg-[#111828] text-white font-semibold cursor-pointer hover:bg-gray-700';
        }
      } else if (isActive && isPast) {
        classes += 'bg-gray-200 text-gray-500 cursor-not-allowed';
      } else {
        classes += 'text-gray-300 cursor-default';
      }

      cells.push(
        <button
          key={d}
          type="button"
          disabled={!isActive || isPast}
          onClick={() => isActive && !isPast && onToggleDate(key)}
          className={classes}
          aria-label={`${year}. ${HU_MONTHS[month]} ${d}.${isActive ? (isSelected ? ' — Lemondásra kijelölve' : ' — Foglalt') : ''}`}
        >
          {d}
        </button>
      );
    }

    return (
      <div>
        <h3 className="text-center text-base font-medium text-gray-900 mb-3">
          {year}. {HU_MONTHS_DISPLAY[month]}
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
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-[#111828]" />
          <span>Aktiv foglalt nap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-red-100 ring-2 ring-red-400 ring-inset" />
          <span>Lemondásra kijelölve</span>
        </div>
      </div>
    </div>
  );
}
