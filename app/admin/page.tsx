"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message || "Upload failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#0a0a0a] text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center w-full max-w-md">
        <div className="flex flex-col gap-4 w-full p-8 border rounded-lg bg-[#111] border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold text-center">
            Upload Pricing Configuration
          </h2>
          <p className="text-sm text-gray-400 text-center">
            Upload your configuration file to initialize the system.
          </p>

          <form onSubmit={handleUpload} className="flex flex-col gap-4 mt-4">
            <input
              type="file"
              name="config"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900/30 file:text-blue-400 hover:file:bg-blue-900/50 text-sm text-gray-300"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-white text-black h-10 px-4 text-sm font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              {loading ? "Uploading..." : "Upload Configuration"}
            </button>
          </form>

          {message && (
            <div
              className={`p-3 rounded text-sm mt-2 text-center ${
                message.includes("Error") || message.includes("failed")
                  ? "bg-red-900/30 text-red-400 border border-red-900/50"
                  : "bg-green-900/30 text-green-400 border border-green-900/50"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
