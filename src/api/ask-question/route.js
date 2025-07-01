import { sql } from '@vercel/postgres';

async function handler({ pdfId, question }) {
  if (!pdfId || !question) {
    return { error: "PDF ID and question are required" };
  }

  // Check if API key is configured
  if (!process.env.GEMINI_API_KEY) {
    return { error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables." };
  }

  try {
    const pdfResult = await sql`
      SELECT id, filename, extracted_text 
      FROM pdfs 
      WHERE id = ${pdfId}
    `;

    if (pdfResult.length === 0) {
      return { error: "PDF not found" };
    }

    const pdf = pdfResult[0];

    if (!pdf.extracted_text || pdf.extracted_text.trim() === "") {
      return { error: "No text content available for this PDF" };
    }

    const prompt = `Based on the following PDF content, please answer the question accurately and concisely.

PDF Content:
${pdf.extracted_text}

Question: ${question}

Please provide a clear and helpful answer based only on the information in the PDF content above.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Service error:", errorText);
      return { error: `Service error: ${response.status}` };
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      return { error: "No response generated from service" };
    }

    const answer = result.candidates[0]?.content?.parts?.[0]?.text;

    if (!answer || answer.trim() === "") {
      return { error: "Empty response from service" };
    }

    await sql`
      INSERT INTO qa_sessions (pdf_id, question, answer)
      VALUES (${pdfId}, ${question}, ${answer})
    `;

    return {
      success: true,
      answer: answer,
      pdfFilename: pdf.filename,
    };
  } catch (error) {
    return { error: "Failed to process question: " + error.message };
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