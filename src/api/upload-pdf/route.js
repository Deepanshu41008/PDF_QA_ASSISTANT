import { sql } from '@vercel/postgres';

async function handler({ fileUrl, fileName }) {
  if (!fileUrl) {
    return { error: "File URL is required" };
  }

  // Check if API key is configured
  if (!process.env.GEMINI_API_KEY) {
    return { error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables." };
  }

  try {
    // Validate that it's a PDF URL (basic check)
    if (!fileUrl.toLowerCase().includes(".pdf") && !fileUrl.includes("pdf")) {
      return { error: "URL must point to a PDF file" };
    }

    // Try to fetch the PDF to validate it exists and get content
    let response;
    try {
      response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (fetchError) {
      return {
        error:
          "Could not access the PDF at the provided URL: " + fetchError.message,
      };
    }

    // Get the PDF content as array buffer
    const pdfBuffer = await response.arrayBuffer();

    // Use Google Gemini to extract text from the PDF
    const extractTextPrompt = `Please extract all the text content from this PDF file. Return only the extracted text without any additional commentary or formatting.`;

    // Convert buffer to base64 for Gemini API
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    const geminiResponse = await fetch(
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

    let extractedText = "Could not extract text from PDF";

    if (geminiResponse.ok) {
      const geminiResult = await geminiResponse.json();
      extractedText =
        geminiResult.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No text could be extracted from this PDF";
    } else {
      // Fallback: create a basic description
      extractedText = `PDF file uploaded from: ${fileUrl}. Text extraction failed, but the file is available for processing.`;
    }

    const filename = fileName || "uploaded-pdf-" + Date.now() + ".pdf";

    // Insert into database using the sql template
    const result = await sql`
      INSERT INTO pdfs (filename, file_url, extracted_text)
      VALUES (${filename}, ${fileUrl}, ${extractedText})
      RETURNING id, filename, extracted_text
    `;

    const pdf = result[0];
    const preview =
      pdf.extracted_text.substring(0, 200) +
      (pdf.extracted_text.length > 200 ? "..." : "");

    return {
      success: true,
      pdfId: pdf.id,
      filename: pdf.filename,
      textPreview: preview,
      fullTextLength: pdf.extracted_text.length,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Upload failed: " + error.message };
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