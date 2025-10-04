import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function calculateSavings(years, monthly, rate = 0.12) {
  const simple = [];
  const compound = [];
  let totalSimple = 0;
  let totalCompound = 0;

  for (let i = 1; i <= years; i++) {
    totalSimple += monthly * 12;
    totalCompound = (totalCompound + monthly * 12) * (1 + rate);
    simple.push(totalSimple);
    compound.push(totalCompound);
  }

  return { simple, compound };
}

export default function SavingsChart({ age = 40, monthly = 2500 }) {
  const years = 65 - parseInt(age);
  const { simple, compound } = calculateSavings(years, monthly);
  const labels = Array.from({ length: years }, (_, i) => parseInt(age) + i);

  const data = {
    labels,
    datasets: [
      {
        data: simple,
        borderColor: '#999999',
        backgroundColor: '#999999',
        tension: 0.3,
      },
      {
        data: compound,
        borderColor: '#4ade80', // verde claro
        backgroundColor: '#4ade80',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {legend: {display: false,},},
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          color: '#666',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}
