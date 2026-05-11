import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, filename: string = 'Document_ScopeFlow.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }
  
  // Briefly add a print-friendly class if needed, but we'll rely on the element's existing styles
  const originalStyle = element.style.cssText;
  element.style.background = 'white';
  element.style.padding = '40px'; // ensure padding isn't cut off
  
  // Use html2canvas to capture the element as an image
  const canvas = await html2canvas(element, { 
    scale: 2, 
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });
  
  // Restore original styles
  element.style.cssText = originalStyle;
  
  const imgData = canvas.toDataURL('image/jpeg', 0.98); // Use JPEG for smaller file size, high quality
  
  // Calculate A4 dimensions (210x297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Calculate image height based on A4 width
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add subsequent pages if the content overflows
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save(filename);
}

