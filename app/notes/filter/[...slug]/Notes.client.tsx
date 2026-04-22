"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create note</button>

      <SearchBox onSearch={debouncedSearch} />

      <NoteList notes={data.notes} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onChange={setPage}
      />

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}