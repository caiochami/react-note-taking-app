import { useNotes } from "../context/NotesContext";

export function Index() {
  const { notes } = useNotes();
  return <div>{notes.map((note) => note.id)}</div>;
}
