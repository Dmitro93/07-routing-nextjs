import axios from "axios";
import type { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> {
  const params = new URLSearchParams();

  params.append("page", String(page));

  if (search) params.append("search", search);
  if (tag) params.append("tag", tag);

  const res = await fetch(`${BASE_URL}/notes?${params.toString()}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers,
  });

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers,
  });

  return res.data;
};