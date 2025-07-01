"use client";
import React from "react";

function MainComponent() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <i className="fas fa-file-pdf text-red-500 mr-3"></i>
              PDF Q&A Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Upload PDFs and ask questions about their content using AI
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <i className="fas fa-react mr-1"></i>React
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <i className="fas fa-database mr-1"></i>PostgreSQL
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <i className="fas fa-brain mr-1"></i>Google Gemini AI
              </span>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-list mr-2"></i>Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a
              href="#overview"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              1. Overview
            </a>
            <a
              href="#features"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              2. Features
            </a>
            <a
              href="#prerequisites"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              3. Prerequisites
            </a>
            <a
              href="#installation"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              4. Installation
            </a>
            <a
              href="#environment"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              5. Environment Variables
            </a>
            <a
              href="#database"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              6. Database Setup
            </a>
            <a
              href="#configuration"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              7. API Configuration
            </a>
            <a
              href="#running"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              8. Running the Application
            </a>
            <a href="#usage" className="text-blue-600 hover:text-blue-800 py-1">
              9. Usage Examples
            </a>
            <a
              href="#troubleshooting"
              className="text-blue-600 hover:text-blue-800 py-1"
            >
              10. Troubleshooting
            </a>
          </div>
        </div>

        {/* Overview */}
        <div
          id="overview"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-info-circle mr-2"></i>Overview
          </h2>
          <p className="text-gray-700 mb-4">
            The PDF Q&A Assistant is a web application that allows users to
            upload PDF documents and ask questions about their content. The
            application uses AI to analyze the PDF text and provide intelligent
            answers based on the document content.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Key Components:
            </h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Frontend: React with Tailwind CSS</li>
              <li>• Backend: Node.js API functions</li>
              <li>• Database: PostgreSQL for storing PDFs and Q&A history</li>
              <li>• AI: Google Gemini API for question answering</li>
              <li>• File Storage: Built-in upload system</li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div
          id="features"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-star mr-2"></i>Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <i className="fas fa-upload text-green-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">PDF Upload</h3>
                  <p className="text-sm text-gray-600">
                    Upload PDFs from device or URL
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-search text-blue-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">Text Extraction</h3>
                  <p className="text-sm text-gray-600">
                    Automatic text extraction from PDFs
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-comments text-purple-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">AI Q&A</h3>
                  <p className="text-sm text-gray-600">
                    Ask questions about PDF content
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <i className="fas fa-history text-orange-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">Q&A History</h3>
                  <p className="text-sm text-gray-600">
                    Track previous questions and answers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-book text-red-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">PDF Library</h3>
                  <p className="text-sm text-gray-600">
                    Manage uploaded documents
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-mobile-alt text-teal-500 mr-3 mt-1"></i>
                <div>
                  <h3 className="font-medium">Responsive Design</h3>
                  <p className="text-sm text-gray-600">
                    Works on mobile and desktop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div
          id="prerequisites"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-clipboard-check mr-2"></i>Prerequisites
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Required Software:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Node.js (version 16 or higher)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  npm or yarn package manager
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  PostgreSQL database (version 12 or higher)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Required Accounts:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Google Cloud account with Gemini API access
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div
          id="installation"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-download mr-2"></i>Installation
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                1. Clone the Repository
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                git clone https://github.com/your-username/pdf-qa-assistant.git
                <br />
                cd pdf-qa-assistant
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                2. Install Dependencies
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                npm install
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Or if you prefer yarn:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                yarn install
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div
          id="environment"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-cog mr-2"></i>Environment Variables
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Create a{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file
              in the root directory with the following variables:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              # Database Configuration
              <br />
              DATABASE_URL=postgresql://username:password@localhost:5432/pdf_qa_db
              <br />
              <br />
              # Google Gemini AI API
              <br />
              GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
              <br />
              <br />
              # Application Settings
              <br />
              PORT=3000
              <br />
              NODE_ENV=development
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">
                <i className="fas fa-exclamation-triangle mr-2"></i>Important
                Notes:
              </h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>
                  • Replace database credentials with your actual PostgreSQL
                  details
                </li>
                <li>• Get your Gemini API key from Google AI Studio</li>
                <li>• Never commit your .env file to version control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Database Setup */}
        <div
          id="database"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-database mr-2"></i>Database Setup
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                1. Create Database
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                createdb pdf_qa_db
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                2. Create Tables
              </h3>
              <p className="text-gray-700 mb-2">
                Run the following SQL commands to create the required tables:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                -- PDFs table
                <br />
                CREATE TABLE pdfs (<br />
                &nbsp;&nbsp;id SERIAL PRIMARY KEY,
                <br />
                &nbsp;&nbsp;filename VARCHAR(255) NOT NULL,
                <br />
                &nbsp;&nbsp;file_url TEXT NOT NULL,
                <br />
                &nbsp;&nbsp;extracted_text TEXT,
                <br />
                &nbsp;&nbsp;upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                <br />
                );
                <br />
                <br />
                -- Q&A Sessions table
                <br />
                CREATE TABLE qa_sessions (<br />
                &nbsp;&nbsp;id SERIAL PRIMARY KEY,
                <br />
                &nbsp;&nbsp;pdf_id INTEGER REFERENCES pdfs(id) ON DELETE
                CASCADE,
                <br />
                &nbsp;&nbsp;question TEXT NOT NULL,
                <br />
                &nbsp;&nbsp;answer TEXT NOT NULL,
                <br />
                &nbsp;&nbsp;created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                <br />
                );
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div
          id="configuration"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-plug mr-2"></i>API Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Google Gemini API Setup
              </h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    1
                  </span>
                  Visit{" "}
                  <a
                    href="https://ai.google.dev/"
                    className="text-blue-600 hover:underline"
                  >
                    Google AI Studio
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    2
                  </span>
                  Sign in with your Google account
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    3
                  </span>
                  Create a new API key
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    4
                  </span>
                  Copy the API key to your .env file
                </li>
              </ol>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                API Endpoints:
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm font-mono">
                <li>• POST /api/upload-pdf - Upload and process PDF</li>
                <li>• POST /api/list-pdfs - Get all uploaded PDFs</li>
                <li>• POST /api/ask-question - Ask question about PDF</li>
                <li>• POST /api/get-history - Get Q&A history for PDF</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Running the Application */}
        <div
          id="running"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-play mr-2"></i>Running the Application
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Development Mode
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                npm run dev
              </div>
              <p className="text-sm text-gray-600 mt-2">
                The application will start on{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  http://localhost:3000
                </code>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Production Mode
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                npm run build
                <br />
                npm start
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                <i className="fas fa-check-circle mr-2"></i>Success Indicators:
              </h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Server starts without errors</li>
                <li>• Database connection is established</li>
                <li>• Web interface loads at localhost:3000</li>
                <li>• PDF upload functionality works</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div
          id="usage"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-book-open mr-2"></i>Usage Examples
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                1. Upload a PDF
              </h3>
              <div className="bg-gray-50 border rounded-lg p-4">
                <ol className="space-y-2 text-gray-700">
                  <li>• Navigate to the Upload tab</li>
                  <li>• Choose "Upload from Device" or "Upload from URL"</li>
                  <li>• Select your PDF file or enter a URL</li>
                  <li>• Wait for processing to complete</li>
                </ol>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                2. Ask Questions
              </h3>
              <div className="bg-gray-50 border rounded-lg p-4">
                <ol className="space-y-2 text-gray-700">
                  <li>• Go to the Chat tab</li>
                  <li>• Select a PDF from the left panel</li>
                  <li>• Type your question in the text area</li>
                  <li>• Click "Ask Question" to get an AI response</li>
                </ol>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                3. Example Questions
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="space-y-2 text-blue-800">
                  <li>• "What is the main topic of this document?"</li>
                  <li>• "Summarize the key findings in chapter 3"</li>
                  <li>• "What are the recommendations mentioned?"</li>
                  <li>• "List all the authors cited in this paper"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div
          id="troubleshooting"
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <i className="fas fa-wrench mr-2"></i>Troubleshooting
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-red-600 mb-2">Common Issues:</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-gray-900">
                    Database Connection Error
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Check your DATABASE_URL in .env file and ensure PostgreSQL
                    is running
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-gray-900">
                    Gemini API Error
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Verify your GOOGLE_GEMINI_API_KEY is correct and has proper
                    permissions
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-gray-900">
                    PDF Upload Fails
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Ensure the file is a valid PDF and check file size limits
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-gray-900">
                    Text Extraction Issues
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Some PDFs may be image-based or encrypted, limiting text
                    extraction
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-green-600 mb-2">Getting Help:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Check the browser console for error messages</li>
                <li>• Review server logs for backend issues</li>
                <li>• Ensure all environment variables are set correctly</li>
                <li>• Test database connectivity separately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <p className="text-gray-600 mb-4">
            <i className="fas fa-heart text-red-500 mr-2"></i>
            Built with React, PostgreSQL, and Google Gemini AI
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/pdf-qa-assistant"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <i className="fas fa-rocket mr-2"></i>
              Launch Application
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;