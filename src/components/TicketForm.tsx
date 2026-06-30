"use client";

import { useState } from "react";
import { createTicket } from "../api/tickets";

export default function TicketForm() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // BUG: handleSubmit does not check that subject and description
  // are non-empty before calling createTicket. A user can submit
  // a completely blank ticket.
  async function handleSubmit() {
    try {
      await createTicket({ subject, description });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  if (submitted) {
    return <p className="text-green-600">Your ticket has been submitted.</p>;
  }

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h2 className="text-xl font-semibold">Submit a Support Ticket</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <textarea
        placeholder="Describe your issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
