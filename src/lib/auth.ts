import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "customer";
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    role: user.user_metadata?.role ?? "customer",
  };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out failed:", error.message);
    throw error;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthenticated: no active session found.");
  }
  return user;
}
