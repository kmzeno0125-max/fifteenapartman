import { Ambulance, Shield, Flame, Phone } from 'lucide-react';

interface EmergencyNumbersProps {
  variant?: 'default' | 'compact';
}

export default function EmergencyNumbers({ variant = 'default' }: EmergencyNumbersProps) {
  const emergencyContacts = [
    {
      icon: Ambulance,
      title: 'Mentők',
      number: '104',
      color: 'text-red-600'
    },
    {
      icon: Shield,
      title: 'Rendőrség',
      number: '107',
      color: 'text-blue-600'
    },
    {
      icon: Flame,
      title: 'Tűzoltóság',
      number: '105',
      color: 'text-orange-600'
    },
    {
      icon: Phone,
      title: 'Egységes segélyhívó',
      number: '112',
      color: 'text-gray-700'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 p-6 border-l-4 border-gray-300">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Segélyhívó telefonszámok</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="flex flex-col items-center p-3 bg-white border hover:border-gray-900 transition-all group"
                style={{ borderColor: '#C0BFC0' }}
              >
                <div className="mb-2">
                  <Icon size={24} className={`${contact.color} group-hover:scale-110 transition-transform`} />
                </div>
                <p className="text-xs text-gray-600 text-center mb-1">{contact.title}</p>
                <p className="text-lg font-semibold text-gray-900">{contact.number}</p>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm p-8 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 text-center">
          Segélyhívó telefonszámok
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Sürgős helyzetben azonnal hívható ingyenes vonalak
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="flex flex-col items-center p-6 bg-gray-50 border hover:border-gray-900 hover:shadow-md transition-all group"
                style={{ borderColor: '#C0BFC0' }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 border group-hover:scale-110 transition-transform" style={{ borderColor: '#C0BFC0' }}>
                  <Icon size={32} className={contact.color} />
                </div>
                <h3 className="text-sm font-medium text-gray-700 text-center mb-2">
                  {contact.title}
                </h3>
                <p className="text-3xl font-semibold text-gray-900">
                  {contact.number}
                </p>
              </a>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-center">
          <p className="text-sm text-gray-700">
            <strong>Fontos:</strong> Minden hívás ingyenes és bármilyen telefonról elérhető
          </p>
        </div>
      </div>
    </div>
  );
}
