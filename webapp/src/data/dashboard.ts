import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const cryptoAssets = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 1.245,
    value: 2850.32,
    change: 2.5,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    id: '2',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.085,
    value: 3420.15,
    change: -1.2,
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    id: '3',
    name: 'Polygon',
    symbol: 'MATIC',
    amount: 1500,
    value: 1250.00,
    change: 5.8,
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  },
];

export const challengers = [
  {
    id: '1',
    name: 'Dirty Energy',
    image: '/assets/energy-crisis.webp',
    weight: 0.85,
    days: 14,
    score: 245,
  },
  {
    id: '2',
    name: 'Wasteful Materials',
    image: '/assets/waste-management.webp',
    weight: 0.50,
    days: 7,
    score: 180,
  },
  {
    id: '3',
    name: 'Ownership / Property',
    image: '/assets/decentralized-economy.webp',
    weight: 0.15,
    days: 3,
    score: 95,
  },
  {
    id: '4',
    name: 'Bad Habits',
    image: '/assets/sustainable-living.webp',
    weight: 0.35,
    days: 10,
    score: 150,
  },
];

export interface Activity {
  id: string;
  title: string;
  description: string;
  points: number;
  iconType: 'chat' | 'question' | 'activity' | 'truth';
}

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Statements',
    description: 'Dirty energy throws knives with statements. Pick the right ones and be fast!',
    points: 60,
    iconType: 'chat',
  },
  {
    id: '2',
    title: 'Questions',
    description: 'Lifecycle of materials: Right choices improve the environment, wrong choices turn it ugly.',
    points: 35,
    iconType: 'question',
  },
  {
    id: '3',
    title: 'Activities',
    description: '"Bad Habits" is chasing you around while challenges create an engaging story.',
    points: 85,
    iconType: 'activity',
  },
  {
    id: '4',
    title: 'Truth and Task',
    description: 'Connect with nature through honest ownership and sharing. Work together to transform your neighborhood.',
    points: 55,
    iconType: 'truth',
  },
];

export const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Points Growth',
      data: [12000, 15000, 18000, 16500, 21000, 21533.10],
      fill: true,
      borderColor: '#627eea',
      backgroundColor: 'rgba(98, 126, 234, 0.1)',
      tension: 0.4,
    },
  ],
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#9ca3af',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#9ca3af',
      },
    },
  },
};