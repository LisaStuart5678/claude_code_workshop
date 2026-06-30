import { describe, it, expect } from "vitest";

// This test validates that the contact form rejects empty submissions.
// It is currently FAILING deliberately — used in the Claude Code hook demo
// to show Claude catching a test failure and proposing a fix.

describe("ContactForm validation", () => {
  it("rejects a submission when all fields are empty", () => {
    const name = "";
    const email = "";
    const message = "";

    // This represents the validation logic that should exist in handleSubmit.
    // Currently the form has no validation — so this test fails.
    const isValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

    expect(isValid).toBe(true); // FAILS — isValid is false because fields are empty
  });

  it("accepts a submission when all fields are filled", () => {
    const name = "Lisa Stuart";
    const email = "lisa@example.com";
    const message = "I need help with my account.";

    const isValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

    expect(isValid).toBe(true); // PASSES
  });
});
