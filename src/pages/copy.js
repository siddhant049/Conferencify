import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfTextExtractor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    const maxPages = pdf.numPages;
    let text = '';

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join('\n');
      text += pageText;
    }

    setExtractedText(text);
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      {pdfFile && (
        <div>
          <p>PDF file selected: {pdfFile.name}</p>
          <p>Extracted text:</p>
          <textarea value={extractedText} rows='10' cols='50' readOnly />
        </div>
      )}
    </div>
  );
};

export default PdfTextExtractor;
