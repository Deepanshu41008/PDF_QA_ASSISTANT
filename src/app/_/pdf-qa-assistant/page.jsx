"use client";
import React from "react";
import Header from "../../../components/Header";

function MainComponent() {
  const [activeTab, setActiveTab] = React.useState("upload");
  const [pdfs, setPdfs] = React.useState([]);
  const [selectedPdf, setSelectedPdf] = React.useState(null);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [fileUrl, setFileUrl] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [setupMode, setSetupMode] = React.useState(false);

  // Load PDFs on component mount
  React.useEffect(() => {
    loadPdfs();
  }, []);

  const setupDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/setup-database", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setError(null);
        loadPdfs(); // Try loading PDFs again
        setSetupMode(false);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to setup database");
    } finally {
      setLoading(false);
    }
  };

  const loadPdfs = async () => {
    try {
      const response = await fetch("/api/list-pdfs", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Failed to load PDFs: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setPdfs(data.pdfs);
      } else {
        setError(data.error || "Failed to load PDFs");
      }
    } catch (err) {
      console.error(err);
      setError("Could not load PDFs");
    }
  };

  // Handle file upload from device
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      const response = await fetch("/api/upload-pdf-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        await loadPdfs();
        setActiveTab("chat");
        setSelectedPdf({ id: data.pdfId, filename: data.filename });
        setError(null);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlUpload = async () => {
    if (!fileUrl.trim()) {
      setError("Please enter a file URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl: fileUrl.trim(),
          fileName: fileName.trim() || "uploaded-pdf.pdf",
        }),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        await loadPdfs();
        setActiveTab("chat");
        setSelectedPdf({ id: data.pdfId, filename: data.filename });
        setFileUrl("");
        setFileName("");
        setError(null);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!selectedPdf || !question.trim()) {
      setError("Please select a PDF and enter a question");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      const response = await fetch("/api/ask-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfId: selectedPdf.id,
          question: question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Question failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setAnswer(data.answer);
        setQuestion("");
        loadHistory(selectedPdf.id);
      } else {
        setError(data.error || "Failed to get answer");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get answer: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (pdfId) => {
    try {
      const response = await fetch("/api/get-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to load history: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectPdf = (pdf) => {
    setSelectedPdf(pdf);
    setAnswer("");
    setQuestion("");
    loadHistory(pdf.id);
    setActiveTab("chat");
  };

  const deletePdf = async (pdfId) => {
    if (!confirm("Are you sure you want to delete this PDF and all its history?")) return;

    try {
      const response = await fetch("/api/delete-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfId }),
      });
      const data = await response.json();
      if (data.success) {
        loadPdfs();
        setActiveTab("library");
        setSelectedPdf(null);
      } else {
        setError(data.error || "Failed to delete PDF");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete PDF");
    }
  };

  const clearHistory = async (pdfId) => {
    if (!confirm("Are you sure you want to clear the history for this PDF?")) return;

    try {
      const response = await fetch("/api/clear-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfId }),
      });
      const data = await response.json();
      if (data.success) {
        setHistory([]);
        setAnswer("");
      } else {
        setError(data.error || "Failed to clear history");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to clear history");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <i className="fas fa-file-pdf text-red-500 mr-3"></i>
            PDF Q&A Assistant
          </h1>
          <p className="text-gray-600">
            Upload PDFs and ask questions about their content
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border dark:border-gray-700">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "upload"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <i className="fas fa-upload mr-2"></i>Upload
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "chat"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <i className="fas fa-comments mr-2"></i>Chat
            </button>
            <button
              onClick={() => setActiveTab("library")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "library"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <i className="fas fa-book mr-2"></i>Library
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            {error.includes("Database is not configured") || error.includes("Could not load PDFs") ? (
              <div className="mt-2">
                <button 
                  onClick={() => setSetupMode(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Setup Database
                </button>
              </div>
            ) : null}
          </div>
        )}

        {setupMode && (
          <div className="bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-200 px-4 py-3 rounded relative mb-4">
            <p className="mb-2">Click the button below to automatically create the required database tables:</p>
            <button 
              onClick={setupDatabase}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm"
            >
              {loading ? "Setting up..." : "Create Database Tables"}
            </button>
            <button 
              onClick={() => setSetupMode(false)}
              className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Upload a PDF</h2>

            {/* File Upload */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Upload from Device</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  {loading ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i>Uploading...</>
                  ) : (
                    <><i className="fas fa-upload mr-2"></i>Choose PDF File</>
                  )}
                </label>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Select a PDF file from your device (Max 10MB)
                </p>
              </div>
            </div>

            {/* URL Upload */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Upload from URL</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://example.com/document.pdf"
                  className="flex-grow p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Optional: file name"
                  className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={handleUrlUpload}
                  disabled={loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <><i className="fas fa-link mr-2"></i>Upload from URL</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            {!selectedPdf ? (
              <div className="text-center">
                <p className="text-lg">Please select a PDF from the Library to start chatting.</p>
                <button onClick={() => setActiveTab("library")} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Go to Library
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Chat with: {selectedPdf.filename}</h2>

                {/* Current Answer */}
                {answer && (
                  <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-bold text-lg">Answer:</h3>
                    <p className="whitespace-pre-wrap">{answer}</p>
                  </div>
                )}

                {/* Question Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                    placeholder="Ask a question..."
                    className="flex-grow p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <button
                    onClick={askQuestion}
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors flex items-center justify-center"
                  >
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-paper-plane mr-2"></i>Ask</>}
                  </button>
                </div>

                {/* History */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">History</h3>
                    {history.length > 0 && (
                      <button onClick={() => clearHistory(selectedPdf.id)} className="text-sm text-red-500 hover:underline">
                        <i className="fas fa-trash-alt mr-1"></i>Clear History
                      </button>
                    )}
                  </div>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {history.length > 0 ? (
                      history.map((item, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="font-semibold">Q: {item.question}</p>
                          <p>A: {item.answer}</p>
                        </div>
                      ))
                    ) : (
                      <p>No history yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Library Tab */}
        {activeTab === "library" && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">PDF Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfs.map((pdf) => (
                <div key={pdf.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div onClick={() => selectPdf(pdf)}>
                    <h3 className="font-bold text-lg truncate">{pdf.filename}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}</p>
                    <p className="text-sm mt-2 italic">{pdf.textPreview}</p>
                  </div>
                  <button onClick={() => deletePdf(pdf.id)} className="text-sm text-red-500 hover:underline mt-4">
                    <i className="fas fa-trash-alt mr-1"></i>Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        <p>PDF Q&A Assistant &copy; 2025</p>
      </footer>
    </div>
  );
}

export default MainComponent;