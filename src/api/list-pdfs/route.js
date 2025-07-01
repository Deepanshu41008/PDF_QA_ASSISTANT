import { sql } from '@vercel/postgres';

async function handler() {
  try {
    // Check if database is configured
    if (!process.env.POSTGRES_URL) {
      return { error: "Database is not configured. Please set POSTGRES_URL in your environment variables." };
    }

    const pdfs = await sql`
      SELECT id, filename, file_url, extracted_text, upload_date
      FROM pdfs 
      ORDER BY upload_date DESC
    `;

    const pdfList = pdfs.map((pdf) => {
      const preview = pdf.extracted_text
        ? pdf.extracted_text.substring(0, 200) +
          (pdf.extracted_text.length > 200 ? "..." : "")
        : "No text content available";

      return {
        id: pdf.id,
        filename: pdf.filename,
        uploadDate: pdf.upload_date,
        textPreview: preview,
        fullTextLength: pdf.extracted_text ? pdf.extracted_text.length : 0,
      };
    });

    return {
      success: true,
      pdfs: pdfList,
      totalCount: pdfList.length,
    };
  } catch (error) {
    return { error: "Failed to retrieve PDFs: " + error.message };
  }
}
export async function POST(request) {
  try {
    const result = await handler();
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}