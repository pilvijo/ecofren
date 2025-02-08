import { Line } from 'react-chartjs-2';
import { chartData, chartOptions } from '../../data/dashboard';

interface PointsChartProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

export default function PointsChart({ selectedPeriod, setSelectedPeriod }: PointsChartProps) {
  const periods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <section className="rounded-xl bg-[#1a1b2e] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold mb-4 sm:mb-0">Points Growth</h2>
        <div className="flex items-center space-x-2 overflow-x-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedPeriod === period
                  ? 'bg-[#627eea] text-white'
                  : 'bg-[#2a2b3e] text-gray-400 hover:bg-[#3a3b4e]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}