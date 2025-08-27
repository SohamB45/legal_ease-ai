import { PDFExtract } from 'pdf.js-extract';

export interface ParsedDocument {
  content: string;
  metadata: {
    pages: number;
    title?: string;
  };
}

export async function parseDocument(buffer: Buffer, contentType: string): Promise<ParsedDocument> {
  try {
    if (contentType === 'application/pdf') {
      return await parsePDF(buffer);
    } else if (contentType === 'text/plain') {
      return {
        content: buffer.toString('utf-8'),
        metadata: { pages: 1 }
      };
    } else {
      throw new Error('Unsupported file type. Please upload PDF or text files only.');
    }
  } catch (error) {
    console.error('Document parsing failed:', error);
    throw new Error('Unable to parse document. Please ensure the file is not corrupted and try again.');
  }
}

async function parsePDF(buffer: Buffer): Promise<ParsedDocument> {
  const pdfExtract = new PDFExtract();
  
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err: any, data: any) => {
      if (err) {
        reject(new Error('Failed to extract text from PDF. The file may be corrupted or password-protected.'));
        return;
      }

      if (!data || !data.pages) {
        reject(new Error('No readable content found in PDF. The document may be scanned or image-based.'));
        return;
      }

      let content = '';
      data.pages.forEach((page: any) => {
        if (page.content) {
          page.content.forEach((item: any) => {
            if (item.str) {
              content += item.str + ' ';
            }
          });
        }
        content += '\n';
      });

      if (content.trim().length === 0) {
        reject(new Error('No text content could be extracted from this PDF. Please try a text-based PDF.'));
        return;
      }

      resolve({
        content: content.trim(),
        metadata: {
          pages: data.pages.length,
          title: data.meta?.info?.Title
        }
      });
    });
  });
}
