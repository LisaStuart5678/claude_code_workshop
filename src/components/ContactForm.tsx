"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type SubmissionRecord = {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // BUG: no validation. Submits even when name, email, and message
  // are all empty. An empty record gets added to submissions.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const record: SubmissionRecord = {
      name: form.name,
      email: form.email,
      message: form.message,
      submittedAt: new Date().toLocaleTimeString(),
    };

    setSubmissions([...submissions, record]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Contact Us
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in all fields and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {submitted ? "Submitted!" : "Send Message"}
          </button>
        </form>
      </div>

      {/* Shows submissions so the bug is visible — empty records appear here */}
      {submissions.length > 0 && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Submissions log (demo only):
          </h2>
          <div className="flex flex-col gap-2">
            {submissions.map((s, i) => (
              <div
                key={i}
                className={`text-xs rounded-lg px-4 py-3 border ${
                  !s.name && !s.email && !s.message
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-green-50 border-green-200 text-green-700"
                }`}
              >
                {!s.name && !s.email && !s.message ? (
                  <span className="font-medium">
                    ⚠ Empty submission accepted at {s.submittedAt}
                  </span>
                ) : (
                  <span>
                    ✓ {s.name || "(no name)"} · {s.email || "(no email)"} ·{" "}
                    {s.submittedAt}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
