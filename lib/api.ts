import axios from "axios";
import type { Note } from '@/types/note';
import type { NoteTag } from "@/types/note";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(
  query?: string,
  page: number = 1
): Promise<NotesResponse> {
    const fetchResponse = await axios.get<NotesResponse>('https://notehub-public.goit.study/api/notes', {
      params: {
        ...(query? { search: query } : {}),
        page
      },
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
         },
    })
    return fetchResponse.data;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
export async function createNote(values: CreateNoteData): Promise<Note> {
  const createResponse = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes', values,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }
    })
  return createResponse.data;
}

export async function deleteNote(id: string): Promise<Note>{
  const deleteResponse = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }
    }
  )
  return deleteResponse.data;
}

export async function fetchNoteById(id:string) {
  const getByIdResponse = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
         },
    }
  )
  return getByIdResponse.data;
}