import { University } from '../types';

export const exportToCSV = (universities: University[], userGMAT: number, userGPA: number) => {
  const headers = [
    'University Name',
    'Admission Chance (%)',
    'Average GMAT',
    'Average GPA',
    'Acceptance Rate (%)'
  ];

  const rows = universities.map(u => [
    `"${u.name}"`,
    u.admission_chance.toFixed(1),
    u.program_stats?.avg_gmat ?? 'N/A',
    u.program_stats?.avg_gpa?.toFixed(2) ?? 'N/A',
    u.program_stats?.acceptance_rate ? (u.program_stats.acceptance_rate * 100).toFixed(2) : 'N/A'
  ]);

  const csvContent = "data:text/csv;charset=utf-8,"
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `MBA_Chances_${userGMAT}_${userGPA}_${timestamp}.csv`);
  document.body.appendChild(link); // Required for Firefox

  link.click();
  document.body.removeChild(link);
}; 