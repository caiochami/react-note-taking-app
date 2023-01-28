import { FormEvent, useRef, useState } from "react";
import { Input } from "./Input";
import { Select, SelectOption } from "./CreatableSelect/Select";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteData } from "../utilities/types";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const [tags, setTags] = useLocalStorage("TAGS", []);

  const titleRef = useRef<HTMLInputElement>(null);

  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [multipleSelectValue, setMultipleSelectValue] = useState<
    SelectOption[]
  >([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: multipleSelectValue,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <Input
            innerRef={titleRef}
            required
            name="title"
            label="Title"
            placeholder="Title"
          />
        </div>
        <div>
          <Select
            label="Tags"
            name="tags"
            multiple
            options={tags}
            onCreate={(newTag: SelectOption) => setOptions([newTag, ...tags])}
            onChange={(value: SelectOption[]): void =>
              setMultipleSelectValue(value)
            }
            value={multipleSelectValue}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            innerRef={markdownRef}
            name="body"
            label="Body"
            placeholder="Body"
          />
        </div>
        <div className="flex justify-end gap-2 border-t pt-2 sm:col-span-2">
          <Button size="xs" color="default">
            Cancel
          </Button>
          <Button size="xs" type="submit" color="primary">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
