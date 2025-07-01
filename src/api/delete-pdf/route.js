import { sql } from '@vercel/postgres';

async function handler({ pdfId }) {
  if (!pdfId) {
    return { error: "PDF ID is required" };
  }

  try {
    // Delete all QA sessions for this PDF first
    await sql`
      DELETE FROM qa_sessions 
      WHERE pdf_id = ${pdfId}
    `;

    // Delete the PDF
    await sql`
      DELETE FROM pdfs 
      WHERE id = ${pdfId}
    `;

    return {
      success: true,
      message: "PDF and all related data deleted successfully"
    };
  } catch (error) {
    console.error("Delete PDF error:", error);
    return { error: "Failed to delete PDF: " + error.message };
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
