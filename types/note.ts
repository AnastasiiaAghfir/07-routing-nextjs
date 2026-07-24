export type NoteTag = 'Todo' | 'Personal' | 'Work' | 'Shopping' | 'Meeting';

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}


