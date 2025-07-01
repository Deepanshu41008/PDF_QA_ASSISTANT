import { sql } from '@vercel/postgres';

async function handler({ pdfId }) {
  if (!pdfId) {
    return { error: "PDF ID is required" };
  }

  try {
    const pdfResult = await sql`
      SELECT id, filename 
      FROM pdfs 
      WHERE id = ${pdfId}
    `;

    if (pdfResult.length === 0) {
      return { error: "PDF not found" };
    }

    const pdf = pdfResult[0];

    const qaHistory = await sql`
      SELECT id, question, answer, created_at
      FROM qa_sessions 
      WHERE pdf_id = ${pdfId}
      ORDER BY created_at DESC
    `;

    return {
      success: true,
      pdfId: pdf.id,
      pdfFilename: pdf.filename,
      history: qaHistory,
      totalQuestions: qaHistory.length,
    };
  } catch (error) {
    return { error: "Failed to retrieve history: " + error.message };
  }
}
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await handler(data);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}