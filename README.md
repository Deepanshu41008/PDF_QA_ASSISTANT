This is a [Next.js](https://nextjs.org/) project built on React and TailwindCSS for PDF document analysis and Q&A.

## Getting Started

### Prerequisites

Before running the application, you need:
1. **Node.js** (version 18 or higher)
2. **PostgreSQL database** (local or cloud-hosted)
3. **Document processing API key** (for text extraction)

### Environment Setup

1. Copy the environment example file and configure your API keys:
   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local` and add your configuration:
   ```
   GEMINI_API_KEY=your_service_api_key_here
   POSTGRES_URL=postgresql://username:password@localhost:5432/pdf_qa_db
   ```
   
   - Get an API key for document processing service
   - Set up a PostgreSQL database and update the connection URL

### Database Setup

This application requires PostgreSQL. You'll need to create the following tables:

```sql
CREATE TABLE pdfs (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_url TEXT,
    extracted_text TEXT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qa_sessions (
    id SERIAL PRIMARY KEY,
    pdf_id INTEGER REFERENCES pdfs(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Installation

Install the dependencies:
```bash
npm install
```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the code in `src`. The page auto-updates as you edit the file.

To learn more, take a look at the following resources:

- [React Documentation](https://react.dev/) - learn about React
- [TailwindCSS Documentation](https://tailwindcss.com/) - learn about TailwindCSS
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.