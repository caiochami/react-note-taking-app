import { useNavigate } from "react-router-dom";
import { NoteForm } from "../components/NoteForm";
import { Note, NoteData } from "../utilities/types";
import { useNotes } from "../context/NotesContext";

export function Create() {
  const { setNotes } = useNotes();

  const navigate = useNavigate();

  function createNote(noteData: NoteData): void {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...noteData, id: crypto.randomUUID() },
    ]);

    navigate("/");
  }
  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Note
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <NoteForm onSubmit={createNote} />
    </div>
  );
}
