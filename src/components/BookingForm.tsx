import { Minus, Plus, CreditCard, Building2, Wallet, Banknote } from 'lucide-react';

export interface BookingFormData {
  adults: number;
  children: number;
  hasPet: boolean;
  paymentMethod: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
}

interface BookingFormProps {
  data: BookingFormData;
  onChange: (data: BookingFormData) => void;
  disabled: boolean;
}

const PAYMENT_OPTIONS = [
  { value: 'card', label: 'Bankkártya', icon: CreditCard },
  { value: 'transfer', label: 'Banki átutalás', icon: Building2 },
  { value: 'szep', label: 'SZÉP kártya', icon: Wallet },
  { value: 'cash', label: 'Készpénz', icon: Banknote },
];

function NumberStepper({ value, min, max, onChange, label, disablePlus }: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
  disablePlus?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: '#B8B8B8' }}>
        <button
          type="button"
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
          className="px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Minus size={16} />
        </button>
        <span
          className="flex-1 text-center py-3 font-medium text-gray-900 border-x"
          style={{ borderColor: '#B8B8B8' }}
        >
          {value} {value === 1 ? 'fő' : 'fő'}
        </span>
        <button
          type="button"
          onClick={() => value < max && onChange(value + 1)}
          disabled={value >= max || disablePlus}
          className="px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function BookingForm({ data, onChange, disabled }: BookingFormProps) {
  const update = (field: keyof BookingFormData, value: BookingFormData[keyof BookingFormData]) => {
    onChange({ ...data, [field]: value });
  };

  const totalGuests = data.adults + data.children;
  const maxTotalGuests = 6;
  const hasExceededLimit = totalGuests > maxTotalGuests;
  const isAtLimit = totalGuests >= maxTotalGuests;

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <p className="text-sm font-medium text-gray-700 mb-3">
        Maximum 6 fő részére foglalható
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        <NumberStepper
          value={data.adults}
          min={1}
          max={6}
          onChange={(v) => update('adults', v)}
          label="Felnőttek száma *"
          disablePlus={isAtLimit}
        />
        <NumberStepper
          value={data.children}
          min={0}
          max={4}
          onChange={(v) => update('children', v)}
          label="Gyerekek száma"
          disablePlus={isAtLimit}
        />
      </div>
      {hasExceededLimit && (
        <div className="px-3 py-2.5 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-700">
            A maximális befogadóképesség 6 fő.
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Kisállat érkezik?</label>
        <div className="flex gap-3">
          {[false, true].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => update('hasPet', val)}
              className={`flex-1 py-3 border rounded-lg text-sm font-medium transition-all ${
                data.hasPet === val
                  ? 'bg-gray-50 text-gray-900'
                  : 'text-gray-500 hover:border-gray-400'
              }`}
              style={{ borderColor: data.hasPet === val ? '#111828' : '#B8B8B8' }}
            >
              {val ? 'Igen' : 'Nem'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Fizetési mód *</label>
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const selected = data.paymentMethod === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('paymentMethod', opt.value)}
                className={`flex items-center gap-3 p-3.5 border rounded-lg text-sm font-medium transition-all text-left ${
                  selected
                    ? 'bg-gray-50 text-gray-900'
                    : 'text-gray-500 hover:border-gray-400'
                }`}
                style={{ borderColor: selected ? '#111828' : '#B8B8B8' }}
              >
                <Icon size={18} className={selected ? 'text-gray-900' : 'text-gray-400'} />
                {opt.label}
              </button>
            );
          })}
        </div>
        {data.paymentMethod === 'cash' && (
          <div className="mt-3 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              Fontos: a foglaló (50%) kizárólag online bankkártyával, banki átutalással vagy SZÉP-kártyával fizethető. Készpénzes fizetés csak a fennmaradó összeg kiegyenlítésekor lehetséges személyesen.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm font-medium text-gray-900 mb-4">Kapcsolattartási adatok</p>
      </div>

      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-gray-900 mb-2">
          Teljes név *
        </label>
        <input
          type="text"
          id="booking-name"
          required
          value={data.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          style={{ borderColor: '#B8B8B8' }}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-900 mb-2">
            Telefonszám *
          </label>
          <input
            type="tel"
            id="booking-phone"
            required
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+36 20 123 4567"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            style={{ borderColor: '#B8B8B8' }}
          />
        </div>
        <div>
          <label htmlFor="booking-email" className="block text-sm font-medium text-gray-900 mb-2">
            E-mail cím *
          </label>
          <input
            type="email"
            id="booking-email"
            required
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            style={{ borderColor: '#B8B8B8' }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-address" className="block text-sm font-medium text-gray-900 mb-2">
          Lakcím *
        </label>
        <input
          type="text"
          id="booking-address"
          required
          value={data.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="Irányítószám, város, utca, házszám"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          style={{ borderColor: '#B8B8B8' }}
        />
      </div>

      <div>
        <label htmlFor="booking-message" className="block text-sm font-medium text-gray-900 mb-2">
          Megjegyzés
        </label>
        <textarea
          id="booking-message"
          rows={3}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Különleges kérések, kérdések..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gray-900 resize-none transition-colors"
          style={{ borderColor: '#B8B8B8' }}
        />
      </div>
    </div>
  );
}
