import { supabase } from "../lib/supabase";
import { requireAuth } from "../lib/auth";

export type Ticket = {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  created_at: string;
  updated_at: string;
};

export type CreateTicketInput = {
  subject: string;
  description: string;
};

// BUG: does not validate that subject and description are non-empty
// before writing to the database — allows blank tickets to be created.
export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  const user = await requireAuth();

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      user_id: user.id,
      subject: input.subject,
      description: input.description,
      status: "open",
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create ticket:", error.message);
    throw error;
  }

  return data as Ticket;
}

export async function getTicketsByUser(): Promise<Ticket[]> {
  const user = await requireAuth();

  const { data, error } = await supabase
    .from("tickets")
    .select("id, user_id, subject, description, status, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch tickets:", error.message);
    throw error;
  }

  return (data ?? []) as Ticket[];
}

export async function resolveTicket(ticketId: string): Promise<void> {
  const user = await requireAuth();

  const { error } = await supabase
    .from("tickets")
    .update({ status: "resolved", updated_at: new Date().toISOString() })
    .eq("id", ticketId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to resolve ticket:", error.message);
    throw error;
  }
}
