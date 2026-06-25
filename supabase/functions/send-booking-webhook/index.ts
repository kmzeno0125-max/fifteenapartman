import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/JzvNNrRsK0tXIgnR26XH/webhook-trigger/bJZReEAGLjGPsgGxlG7J";
const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

interface BookingData {
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

function isValidCancelUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
      parsed.pathname === '/cancel-booking' &&
      !!parsed.searchParams.get('token')
    );
  } catch {
    return false;
  }
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}.`;
}

function translatePaymentMethod(method: string): string {
  switch (method) {
    case 'transfer':
      return 'Banki átutalás';
    case 'card':
      return 'Bankkártyás fizetés';
    case 'szep':
      return 'SZÉP kártya';
    case 'cash':
      return 'Készpénz';
    default:
      return 'Egyéb';
  }
}

function buildPayload(data: BookingData) {
  return {
    foglalasi_azonosito: data.booking_id,
    erkezes_datuma: formatDate(data.check_in),
    tavozas_datuma: formatDate(data.check_out),
    ejszakak_szama: `${data.nights} éjszaka`,
    felnott_fo: `${data.adults} fő`,
    gyermek_fo: data.children === 0 ? 'Nincs' : `${data.children} fő`,
    kisallattal_erkezik: data.has_pet ? 'Igen' : 'Nem',
    fizetesi_mod: translatePaymentMethod(data.payment_method),
    vendeg_nev: data.guest_name,
    vendeg_lakcim: data.guest_address,
    vendeg_email: data.guest_email,
    vendeg_telefon: data.guest_phone,
    uzenet: data.message || 'Nincs',
    leadva: formatDate(new Date().toISOString()),
    lemondasi_link: data.cancel_url,
  };
}

async function sendWithRetry(payload: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`Webhook sent successfully on attempt ${attempt}`);
        return { success: true };
      }

      console.error(`Webhook attempt ${attempt} failed with status ${response.status}`);
    } catch (error) {
      console.error(`Webhook attempt ${attempt} error:`, error);
    }

    if (attempt < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return { success: false, error: 'Webhook delivery failed after all retries' };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: BookingData = await req.json();

    console.log("Received booking data for webhook:", data.booking_id);

    if (!data.guest_name || !data.guest_name.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing guest_name' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (!data.guest_address || !data.guest_address.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing guest_address' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (!data.guest_email || !data.guest_email.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing guest_email' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (!data.guest_phone || !data.guest_phone.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing guest_phone' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (!data.cancel_url || !isValidCancelUrl(data.cancel_url)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or missing cancel_url' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const payload = buildPayload(data);

    console.log("Sending webhook payload for booking:", data.booking_id);

    const result = await sendWithRetry(payload);

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: result.success ? 200 : 500,
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
