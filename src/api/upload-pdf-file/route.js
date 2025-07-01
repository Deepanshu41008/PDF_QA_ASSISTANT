import { sql } from '@vercel/postgres';

async function handler(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const fileName = formData.get('fileName') || 'uploaded-file.pdf';

    if (!file) {
      return { error: "No file provided" };
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return { error: "Document processing service is not configured. Please set GEMINI_API_KEY in your environment variables." };
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Check file size (10MB limit)
    if (pdfBuffer.length > 10 * 1024 * 1024) {
      return { error: "File size exceeds 10MB limit" };
    }

    const extractTextPrompt = `Please extract all the text content from this PDF file. Return only the extracted text without any additional commentary or formatting.`;

    // Convert buffer to base64 for API
    const base64Pdf = pdfBuffer.toString('base64');

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
                  text: extractTextPrompt,
                },
                {
                  inline_data: {
                    mime_type: "application/pdf",
                    data: base64Pdf,
                  },
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
      return { error: `Text extraction failed: ${response.status}` };
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      return { error: "No text could be extracted from this PDF" };
    }

    const extractedText = result.candidates[0]?.content?.parts?.[0]?.text;

    if (!extractedText || extractedText.trim() === "") {
      return { error: "No readable text found in the PDF" };
    }

    // Save to database
    const insertResult = await sql`
      INSERT INTO pdfs (filename, file_url, extracted_text)
      VALUES (${fileName}, 'uploaded-file', ${extractedText})
      RETURNING id, filename
    `;

    const newPdf = insertResult[0];

    return {
      success: true,
      pdfId: newPdf.id,
      filename: newPdf.filename,
      message: "PDF uploaded and processed successfully",
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload and process PDF: " + error.message };
  }
}

export async function POST(request) {
  try {
    const result = await handler(request);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
