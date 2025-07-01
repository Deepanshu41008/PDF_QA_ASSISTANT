import { sql } from '@vercel/postgres';

async function handler({ pdfId }) {
  if (!pdfId) {
    return { error: "PDF ID is required" };
  }

  try {
    // Delete all QA sessions for this PDF
    await sql`
      DELETE FROM qa_sessions 
      WHERE pdf_id = ${pdfId}
    `;

    return {
      success: true,
      message: "History cleared successfully"
    };
  } catch (error) {
    console.error("Clear history error:", error);
    return { error: "Failed to clear history: " + error.message };
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
