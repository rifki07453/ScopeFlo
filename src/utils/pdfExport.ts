import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, filename: string = 'Statement_of_Work.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }
  
  // Use html2canvas to capture the element as an image
  const canvas = await html2canvas(element, { 
    scale: 2, 
    useCORS: true,
    logging: false
  });
  
  const imgData = canvas.toDataURL('image/png');
  
  // Calculate A4 dimensions (210x297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  // Create an explicit multi-page behavior if it's too long?
  // MVP: just fit as one long page or standard single A4 scaled.
  // We'll let it scale down to fit the height, or span into multiple pages.
  // For simplicity and clean single-SOW generation, just add it.
  
  // If height > A4 height, we might want multipage, but a single long stream is okay for now.
  // Actually standard SOW might just fit in one or two pages. Let's do simple continuous.
  let heightLeft = pdfHeight;
  let position = 0;
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save(filename);
}
