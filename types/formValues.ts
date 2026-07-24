export type NoteTag = 'Todo' | 'Personal' | 'Work' | 'Shopping' | 'Meeting';

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag | '';
}