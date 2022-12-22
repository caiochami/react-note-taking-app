import { Form } from "react-router-dom";
import { Input } from "./Input";
import { TagSelector } from "./TagSelector/TagSelector";
import { Textarea } from "./Textarea";

export function NoteForm() {
  return (
    <Form>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <Input name="title" label="Title" placeholder="Title" />
        </div>
        <div>
          <TagSelector name="tags" />
        </div>
        <div className="sm:col-span-2">
          <Textarea name="body" label="Body" placeholder="Body" />
        </div>
      </div>
    </Form>
  );
}
