const HU_MONTHS = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december'
];

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function isDateInHighSeason(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  if (month >= 5 && month <= 7) return true;
  if (month === 4 && day >= 31) return true;
  return false;
}

export function isDateInBookingSeason(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  if (month > 3 && month < 10) return true;
  if (month === 3 && day >= 1) return true;
  if (month === 10 && day === 1) return true;
  return false;
}

export function overlapsHighSeason(checkIn: Date, checkOut: Date): boolean {
  const year = checkIn.getFullYear();
  const hsStart = new Date(year, 4, 31);
  const hsEnd = new Date(year, 7, 31);
  const lastNight = new Date(checkOut);
  lastNight.setDate(lastNight.getDate() - 1);
  return checkIn <= hsEnd && lastNight >= hsStart;
}

export function validateBookingDates(checkIn: Date | null, checkOut: Date | null): string | null {
  if (!checkIn || !checkOut) return null;

  if (!isDateInBookingSeason(checkIn)) {
    return 'Csak április 1. és november 1. között foglalható.';
  }

  if (!isDateInBookingSeason(checkOut)) {
    return 'Csak április 1. és november 1. között foglalható.';
  }

  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return 'A távozás dátuma az érkezés után kell legyen.';
  if (overlapsHighSeason(checkIn, checkOut) && nights < 4) {
    return 'Főszezonban (május 31. \u2013 augusztus 31.) minimum 4 éjszaka foglalható.';
  }
  return null;
}

export function formatDateHU(date: Date): string {
  return `${date.getFullYear()}. ${HU_MONTHS[date.getMonth()]} ${date.getDate()}.`;
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function hasBlockedDatesInRange(
  checkIn: Date,
  checkOut: Date,
  blockedDates: Set<string>
): boolean {
  const current = new Date(checkIn);
  while (current <= checkOut) {
    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    if (blockedDates.has(key)) return true;
    current.setDate(current.getDate() + 1);
  }
  return false;
}

export function generateBookingId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `BN-${y}${m}${d}-${random}`;
}

interface WebhookPayload {
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  has_pet: boolean;
  payment_method: string;
  guest_name: string;
  guest_address: string;
  guest_phone: string;
  guest_email: string;
  message: string;
  booking_id: string;
  cancel_url: string;
}

export async function sendBookingWebhook(
  payload: WebhookPayload,
  supabaseUrl: string,
  supabaseAnonKey: string
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = `${supabaseUrl}/functions/v1/send-booking-webhook`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook response error:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Webhook call failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Webhook hívás sikertelen' };
  }
}
