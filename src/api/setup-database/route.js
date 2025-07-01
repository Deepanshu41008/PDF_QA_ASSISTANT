import { sql } from '@vercel/postgres';

async function handler() {
  try {
    // Check if database is configured
    if (!process.env.POSTGRES_URL) {
      return { error: "Database is not configured. Please set POSTGRES_URL in your environment variables." };
    }

    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS pdfs (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        file_url TEXT,
        extracted_text TEXT,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS qa_sessions (
        id SERIAL PRIMARY KEY,
        pdf_id INTEGER REFERENCES pdfs(id),
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return {
      success: true,
      message: "Database tables created successfully"
    };
  } catch (error) {
    console.error("Database setup error:", error);
    return { error: "Failed to setup database: " + error.message };
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
