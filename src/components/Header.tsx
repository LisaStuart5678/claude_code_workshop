"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, signOut, AuthUser } from "../lib/auth";

export default function Header() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => console.error("Failed to load user:", err))
      .finally(() => setLoading(false));
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <span className="text-lg font-semibold text-navy-900">Meridian Portal</span>
      <nav className="flex items-center gap-4">
        {loading ? null : user ? (
          <>
            <span className="text-sm text-gray-600">{user.email}</span>
            <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">
              Sign out
            </button>
          </>
        ) : (
          <a href="/login" className="text-sm text-blue-600 hover:underline">Sign in</a>
        )}
      </nav>
    </header>
  );
}
