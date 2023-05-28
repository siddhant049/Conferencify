import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PDFWriter = () => {
  const [inputText, setInputText] = useState('');
  const [pdfBytes, setPdfBytes] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const generatePDF = async () => {
    console.log('1');
    // Load the existing PDF template
    const existingPdfBytes = await fetch('../img/template.pdf').then((res) => res.arrayBuffer());
    console.log('2');
    // var bytes = new Uint8Array(existingPdfBytes);  
    // console.log('5'); 
    // Create a new PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    console.log('3');

    // Add a new page to the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const newPage = pdfDoc.insertPage(1, [width, height]);
    console.log('4');

    // Set up the font and font size for the text
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 24;

    // Add text to the new page
    newPage.drawText(inputText, {
      x: 50,
      y: height - 50,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Save the modified PDF as a new file
    const modifiedPdfBytes = await pdfDoc.save();

    // Set the modified PDF bytes in state
    setPdfBytes(modifiedPdfBytes);
  };

  const downloadPDF = () => {
    if (pdfBytes) {
      const pdfDataUri = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfDataUri;
      downloadLink.download = 'generated_pdf.pdf';
      downloadLink.click();
    }
  };

  return (
    <div>
      <h1>PDF Writer</h1>
      <input type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text" />
      <button onClick={generatePDF}>Generate PDF</button>
      <button onClick={downloadPDF} disabled={!pdfBytes}>
        Download PDF
      </button>
    </div>
  );
};

export default PDFWriter;
