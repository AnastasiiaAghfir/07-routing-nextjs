'use client';

import NoteList from '@/components/NoteList/NoteList';
import css from '@/app/notes/filter/[...slug]/NotesPage.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { log } from 'console';

type NotesClientProps = {
  tag: string | undefined;
};
export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 3000);
  const { data, error } = useQuery({
    queryKey: ['notes', debouncedQuery, tag, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, tag, currentPage),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  console.log('tag:', tag);
  console.log('currentPage:', currentPage);
  console.log('data:', data);
  console.log(error);
  console.log('TOKEN:', process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onSearch={(value) => {
            setQuery(value);
            setCurrentPage(1);
          }}
        />
        {data && data.totalPages > 0 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {/* Кнопка створення нотатки */}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />{' '}
          </Modal>
        )}
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
