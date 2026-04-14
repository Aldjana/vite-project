import { FaEnvelope, FaUsers } from 'react-icons/fa';
import Header from '../components/Header';

const DashboardPage = () => {
  const cards = [
    {
      id: 1,
      bgColor: 'bg-purple-500',
      icon: <FaEnvelope className="text-white text-xl" />,
      number: '125',
      title: 'Formulaires',
      description: 'Je ne sais pas quoi mettre',
    },
    {
      id: 2,
      bgColor: 'bg-teal-500',
      initial: 'P',
      number: '40',
      title: 'Messages',
      description: 'Je ne sais pas quoi mettre',
    },
    {
      id: 3,
      bgColor: 'bg-yellow-400',
      icon: <FaUsers className="text-white text-xl" />,
      number: '600',
      title: 'Utilisateurs',
      description: 'Je ne sais pas quoi mettre',
    },
    {
      id: 4,
      bgColor: 'bg-red-500',
      icon: <FaEnvelope className="text-white text-xl" />,
      number: '25',
      title: 'E-mails',
      description: 'Je ne sais pas quoi mettre',
    },
    {
      id: 5,
      bgColor: 'bg-purple-500',
      initial: 'P',
      number: '40',
      title: 'Hôtels',
      description: 'Je ne sais pas quoi mettre',
    },
    {
      id: 6,
      bgColor: 'bg-blue-500',
      icon: <FaUsers className="text-white text-xl" />,
      number: '02',
      title: 'Entités',
      description: 'Je ne sais pas quoi mettre',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <Header title="Dashboard" />
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:p-6 lg:p-8">
          <h2 className="mb-5 text-base font-medium text-gray-600 sm:mb-6 sm:text-lg">
            Bienvenue sur RED Product
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 shrink-0 ${card.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <div className="text-white flex items-center justify-center">
                      {card.icon || (
                        <span className="font-bold text-lg leading-none">{card.initial}</span>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-2xl font-bold text-gray-900 leading-tight">{card.number}</p>
                    <p className="text-sm font-medium text-gray-600 mt-1">{card.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
