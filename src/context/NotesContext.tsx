import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Note } from "../utilities/types";

type NotesProviderProps = {
  children: ReactNode;
};

type NotesContext = {
  setNotes: (prevNotes: Note[]) => void;
  notes: Note[];
};

const NotesContext = createContext({} as NotesContext);

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);

  return (
    <NotesContext.Provider
      value={{
        setNotes,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
