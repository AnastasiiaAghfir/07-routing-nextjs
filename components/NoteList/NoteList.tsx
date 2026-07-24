import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList(props: NoteListProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
        }
    })


    return (
        <ul className={css.list}>
            {props.notes.map((note) => 
            {return (
                <li className={css.listItem} key={note.id}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                    <button className={css.button} onClick={() => deleteMutation.mutate(note.id)}>Delete</button>
                </div>
            </li>
            )}
            )}
            
        </ul>

    )
}