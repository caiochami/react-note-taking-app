import { SelectOption } from "../components/CreatableSelect/Select";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  tags: SelectOption[];
  title: string;
  markdown: string;
};
