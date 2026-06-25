import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  CalendarDays,
  ShieldX,
  Clock,
  ArrowLeft,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatDateHU } from '../utils/bookingUtils';
import CancelCalendar from '../components/CancelCalendar';

interface BookingDetails {
  booking_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  has_pet: boolean;
  status: string;
  created_at: string;
}

interface LookupResult {
  success: boolean;
  error?: string;
  booking?: BookingDetails;
  active_dates?: string[];
}

interface CancelResult {
  success: boolean;
  error?: string;
  cancelled_count?: number;
  remaining_count?: number;
  new_status?: string;
}

type PageState = 'loading' | 'not_found' | 'expired' | 'loaded' | 'confirming' | 'cancelling' | 'done' | 'error';

export default function CancelBooking() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const initialPageState: PageState = token ? 'loading' : 'not_found';
  const [pageState, setPageState] = useState<PageState>(initialPageState);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [selectedForCancel, setSelectedForCancel] = useState<Set<string>>(new Set());
  const [cancelResult, setCancelResult] = useState<CancelResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.rpc('lookup_booking_by_token', { p_token: token });
      if (cancelled) return;

      if (error) {
        setErrorMessage('Hiba a foglalás betöltésekor.');
        setPageState('error');
        return;
      }

      const result = data as LookupResult;

      if (!result.success) {
        if (result.error === 'token_expired') {
          setPageState('expired');
        } else {
          setPageState('not_found');
        }
        return;
      }

      setBooking(result.booking!);
      setActiveDates(result.active_dates || []);
      setSelectedForCancel(new Set());
      setPageState('loaded');
    })();

    return () => { cancelled = true; };
  }, [token]);

  function handleToggleDate(dateStr: string) {
    setSelectedForCancel(prev => {
      const next = new Set(prev);
      if (next.has(dateStr)) {
        next.delete(dateStr);
      } else {
        next.add(dateStr);
      }
      return next;
    });
  }

  function handleSelectAll() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDates = activeDates.filter(d => new Date(d + 'T00:00:00') >= today);
    setSelectedForCancel(new Set(futureDates));
  }

  function handleDeselectAll() {
    setSelectedForCancel(new Set());
  }

  function handleConfirmStart() {
    if (selectedForCancel.size === 0) return;
    setPageState('confirming');
  }

  function handleConfirmCancel() {
    setPageState('loaded');
  }

  async function handleConfirmProceed() {
    if (!token || selectedForCancel.size === 0) return;

    setPageState('cancelling');

    const datesToCancel = Array.from(selectedForCancel).sort();

    const { data, error } = await supabase.rpc('cancel_booking_dates', {
      p_token: token,
      p_dates: datesToCancel,
    });

    if (error) {
      setErrorMessage('Hiba a lemondás feldolgozásakor. Kérjük, próbálja újra.');
      setPageState('error');
      return;
    }

    const result = data as CancelResult;

    if (!result.success) {
      setErrorMessage(
        result.error === 'token_expired'
          ? 'A lemondási link már lejárt.'
          : 'A foglalás nem található vagy már lemondásra került.'
      );
      setPageState('error');
      return;
    }

    setCancelResult(result);
    setPageState('done');
  }

  const isFullCancel = selectedForCancel.size === activeDates.filter(d => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(d + 'T00:00:00') >= today;
  }).length && selectedForCancel.size > 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl font-light mb-6 opacity-0 animate-fadeInSlide"
              style={{ color: '#111828', animationFillMode: 'forwards' }}
            >
              Foglalás kezelése
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              Foglalásod módosítása vagy lemondása
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {pageState === 'loading' && <LoadingState />}
          {pageState === 'not_found' && <NotFoundState />}
          {pageState === 'expired' && <ExpiredState />}
          {pageState === 'error' && <ErrorState message={errorMessage} />}

          {pageState === 'loaded' && booking && (
            <BookingManager
              booking={booking}
              activeDates={activeDates}
              selectedForCancel={selectedForCancel}
              isFullCancel={isFullCancel}
              onToggleDate={handleToggleDate}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onConfirmStart={handleConfirmStart}
            />
          )}

          {pageState === 'confirming' && booking && (
            <ConfirmDialog
              booking={booking}
              selectedDates={Array.from(selectedForCancel).sort()}
              isFullCancel={isFullCancel}
              totalActive={activeDates.length}
              onCancel={handleConfirmCancel}
              onProceed={handleConfirmProceed}
            />
          )}

          {pageState === 'cancelling' && <CancellingState />}

          {pageState === 'done' && cancelResult && (
            <DoneState result={cancelResult} bookingId={booking?.booking_id || ''} />
          )}
        </div>
      </section>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white shadow-sm p-12 text-center animate-fadeInSlide">
      <Loader2 className="mx-auto mb-4 text-gray-400 animate-spin" size={32} />
      <p className="text-gray-600">Foglalás betöltése...</p>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="bg-white shadow-sm p-12 text-center animate-fadeInSlide">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <ShieldX className="text-gray-400" size={32} />
      </div>
      <h2 className="text-2xl font-light mb-4 text-gray-900">Foglalás nem található</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        A megadott link érvénytelen, vagy a foglalás már lemondásra került.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
      >
        <ArrowLeft size={16} />
        Vissza a főoldalra
      </Link>
    </div>
  );
}

function ExpiredState() {
  return (
    <div className="bg-white shadow-sm p-12 text-center animate-fadeInSlide">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
        <Clock className="text-amber-500" size={32} />
      </div>
      <h2 className="text-2xl font-light mb-4 text-gray-900">Lejárt lemondási link</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Ez a lemondási link már lejárt. Az érkezés dátumának napjáig volt érvényes.
        Kérjük, vegye fel velünk a kapcsolatot telefonon vagy e-mailben.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
      >
        <ArrowLeft size={16} />
        Vissza a főoldalra
      </Link>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="bg-white shadow-sm p-12 text-center animate-fadeInSlide">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle className="text-red-500" size={32} />
      </div>
      <h2 className="text-2xl font-light mb-4 text-gray-900">Hiba tortent</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {message || 'Ismeretlen hiba tortent. Kerjuk, probald ujra kesobb.'}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
      >
        <ArrowLeft size={16} />
        Vissza a főoldalra
      </Link>
    </div>
  );
}

function BookingManager({
  booking,
  activeDates,
  selectedForCancel,
  isFullCancel,
  onToggleDate,
  onSelectAll,
  onDeselectAll,
  onConfirmStart,
}: {
  booking: BookingDetails;
  activeDates: string[];
  selectedForCancel: Set<string>;
  isFullCancel: boolean;
  onToggleDate: (d: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onConfirmStart: () => void;
}) {
  return (
    <div className="space-y-6 animate-fadeInSlide">
      <div className="bg-white shadow-sm p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Foglalási azonosító</p>
            <p className="font-mono font-medium text-gray-900">{booking.booking_id}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <InfoRow label="Vendég neve" value={booking.guest_name} />
          <InfoRow label="E-mail" value={booking.guest_email} />
          <InfoRow
            label="Érkezés"
            value={formatDateHU(new Date(booking.check_in + 'T00:00:00'))}
          />
          <InfoRow
            label="Távozás"
            value={formatDateHU(new Date(booking.check_out + 'T00:00:00'))}
          />
          <InfoRow
            label="Vendégek"
            value={`${booking.adults} felnőtt${booking.children > 0 ? `, ${booking.children} gyerek` : ''}`}
          />
          <InfoRow label="Aktív éjszakák" value={`${activeDates.length} éjszaka`} />
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <CalendarDays size={20} className="text-gray-400" />
          <p className="text-sm font-medium text-gray-900">
            Válaszd ki a lemondani kívánt napokat
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          Kattints az aktív (sötét) napokra a kijelöléshez. Már elmúlt napok nem mondhatók le.
        </p>

        <CancelCalendar
          activeDates={activeDates}
          selectedForCancel={selectedForCancel}
          onToggleDate={onToggleDate}
        />

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-4 py-2 text-xs font-medium rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#B8B8B8', color: '#111828' }}
          >
            Összes kijelölése
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            disabled={selectedForCancel.size === 0}
            className="px-4 py-2 text-xs font-medium rounded-lg border transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: '#B8B8B8', color: '#111828' }}
          >
            Kijelölés törlése
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 md:p-8">
        {selectedForCancel.size > 0 && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: isFullCancel ? '#fef2f2' : '#fffbeb' }}>
            <p className="text-sm font-medium" style={{ color: isFullCancel ? '#991b1b' : '#92400e' }}>
              {isFullCancel
                ? `Teljes lemondás: Az összes aktív nap (${selectedForCancel.size} éjszaka) lemondásra kerül.`
                : `Részleges lemondás: ${selectedForCancel.size} éjszaka lemondása a ${activeDates.length} aktívból.`
              }
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onConfirmStart}
          disabled={selectedForCancel.size === 0}
          className="w-full py-4 font-medium transition-all flex items-center justify-center border-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: selectedForCancel.size > 0 ? '#dc2626' : '#d1d5db',
            color: selectedForCancel.size > 0 ? '#ffffff' : '#6b7280',
            borderColor: selectedForCancel.size > 0 ? '#dc2626' : '#d1d5db',
          }}
          onMouseEnter={(e) => {
            if (selectedForCancel.size > 0) {
              e.currentTarget.style.backgroundColor = '#b91c1c';
              e.currentTarget.style.borderColor = '#b91c1c';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedForCancel.size > 0) {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.borderColor = '#dc2626';
            }
          }}
        >
          {selectedForCancel.size === 0
            ? 'Válassz legalább egy napot a lemondáshoz'
            : `Kiválasztott napok lemondása (${selectedForCancel.size})`
          }
        </button>
      </div>
    </div>
  );
}

function ConfirmDialog({
  booking,
  selectedDates,
  isFullCancel,
  totalActive,
  onCancel,
  onProceed,
}: {
  booking: BookingDetails;
  selectedDates: string[];
  isFullCancel: boolean;
  totalActive: number;
  onCancel: () => void;
  onProceed: () => void;
}) {
  return (
    <div className="animate-fadeInSlide">
      <div className="bg-white shadow-sm p-8 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-gray-900">Lemondás megerősítése</h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: isFullCancel ? '#fef2f2' : '#fffbeb' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: isFullCancel ? '#991b1b' : '#92400e' }}>
            {isFullCancel ? 'Teljes foglalás lemondása' : 'Részleges lemondás'}
          </p>
          <p className="text-sm" style={{ color: isFullCancel ? '#b91c1c' : '#a16207' }}>
            {isFullCancel
              ? 'A teljes foglalás törölve lesz. Ez a művelet nem vonható vissza.'
              : `${selectedDates.length} éjszaka lemondása a ${totalActive} aktívból. A fennmaradó napok érvényesek maradnak.`
            }
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Foglalás: {booking.booking_id}</p>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map(d => (
              <span
                key={d}
                className="px-3 py-1.5 bg-red-50 text-red-800 text-xs font-medium rounded-lg"
              >
                {formatDateHU(new Date(d + 'T00:00:00'))}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 font-medium border-2 rounded-lg transition-all hover:bg-gray-50"
            style={{ borderColor: '#B8B8B8', color: '#111828' }}
          >
            Mégsem
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="flex-1 py-3.5 font-medium border-2 rounded-lg transition-all text-white"
            style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
              e.currentTarget.style.borderColor = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.borderColor = '#dc2626';
            }}
          >
            {isFullCancel ? 'Teljes lemondás véglegesítése' : 'Lemondás véglegesítése'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CancellingState() {
  return (
    <div className="bg-white shadow-sm p-12 text-center animate-fadeInSlide">
      <Loader2 className="mx-auto mb-4 text-gray-400 animate-spin" size={32} />
      <p className="text-gray-600">Lemondás feldolgozása...</p>
    </div>
  );
}

function DoneState({ result, bookingId }: { result: CancelResult; bookingId: string }) {
  const isFullCancel = result.new_status === 'cancelled';

  return (
    <div className="bg-white shadow-sm p-8 md:p-12 text-center animate-fadeInSlide">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircle className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-light mb-4 text-gray-900">
        {isFullCancel ? 'Foglalás lemondva' : 'Napok sikeresen lemondva'}
      </h2>
      <p className="text-gray-600 mb-2 max-w-md mx-auto">
        {isFullCancel
          ? 'A teljes foglalás sikeresen lemondásra került. A kiválasztott dátumok újra elérhetők.'
          : `${result.cancelled_count} éjszaka sikeresen lemondva. ${result.remaining_count} éjszaka továbbra is aktív.`
        }
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Foglalási azonosító: <span className="font-mono font-medium text-gray-700">{bookingId}</span>
      </p>

      <div className="bg-gray-50 p-6 rounded-lg max-w-sm mx-auto space-y-3 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Lemondott napok:</span>
          <span className="font-medium text-red-700">{result.cancelled_count}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Fennmaradó napok:</span>
          <span className="font-medium text-gray-900">{result.remaining_count}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Új státusz:</span>
          <span className="font-medium text-gray-900">
            {result.new_status === 'cancelled' ? 'Lemondva' : 'Részben lemondva'}
          </span>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-8 px-8 py-3 font-medium transition-all border-2 rounded-lg"
        style={{ backgroundColor: '#111828', color: '#C6C6C6', borderColor: '#111828' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#C6C6C6';
          e.currentTarget.style.color = '#111828';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#111828';
          e.currentTarget.style.color = '#C6C6C6';
        }}
      >
        Vissza a főoldalra
      </Link>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: '#fffbeb', text: '#92400e', label: 'Függőben' },
    confirmed: { bg: '#f0fdf4', text: '#166534', label: 'Visszaigazolva' },
    partially_cancelled: { bg: '#fef2f2', text: '#991b1b', label: 'Részben lemondva' },
  };

  const c = config[status] || { bg: '#f3f4f6', text: '#374151', label: status };

  return (
    <span
      className="px-3 py-1 text-xs font-medium rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {c.label}
    </span>
  );
}
