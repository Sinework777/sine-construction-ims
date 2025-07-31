import jsPDF from 'jspdf';

export function exportToPDF() {
  const doc = new jsPDF();
  // PDF generation logic will go here
  doc.save('DailyReport.pdf');
}
