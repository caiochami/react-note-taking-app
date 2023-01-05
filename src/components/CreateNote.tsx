import { SelectOption } from "./CreatableSelect/Select";
import { NoteForm } from "./NoteForm";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  tags: SelectOption[];
  title: string;
  markdown: string;
};

export function CreateNote() {
  return (
    <div>
      <div>Create Note</div>

      <NoteForm onSubmit={(event) => console.log(event)} />
    </div>
  );
}
