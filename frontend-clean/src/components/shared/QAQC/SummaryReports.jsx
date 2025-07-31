import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

export default function SummaryReports() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Compliance Rate (%)',
        data: [85, 90, 88, 92],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Open NCRs',
        data: [5, 3, 4, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  function exportPDF() {
    // TODO: Implement PDF export logic
    alert('PDF Exported!');
  }

  function exportExcel() {
    // TODO: Implement Excel export logic
    alert('Excel Exported!');
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4">Summary Reports</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Compliance Trends</h3>
          <Line data={data} options={options} />
        </div>
        <div>
          <h3 className="font-semibold">Open NCRs</h3>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={exportPDF}>⬇ Export PDF</button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition" onClick={exportExcel}>⬇ Export Excel</button>
      </div>
    </div>
  );
}
