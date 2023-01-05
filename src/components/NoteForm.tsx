import { FormEvent, useRef, useState } from "react";
import { Input } from "./Input";
import { Select, SelectOption } from "./CreatableSelect/Select";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { NoteData } from "./CreateNote";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const [options, setOptions] = useState<SelectOption[]>([
    {
      label: "Tag One",
      value: "Tag One",
    },
    {
      label: "Tag Two",
      value: "Tag Two",
    },
    {
      label: "Tag Three",
      value: "Tag Three",
    },
    {
      label: "Tag Four",
      value: "Tag Four",
    },
    {
      label: "Tag Five",
      value: "Tag Five",
    },
    {
      label: "Tag Six",
      value: "Tag Six",
    },
    {
      label: "Tag Seven",
      value: "Tag Seven",
    },
    {
      label: "Tag Eight",
      value: "Tag Eight",
    },
    {
      label: "Tag Nine",
      value: "Tag Nine",
    },
  ]);

  const titleRef = useRef<HTMLInputElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [multipleSelectValue, setMultipleSelectValue] = useState<
    SelectOption[]
  >([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: textareaRef.current!.value,
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
            options={options}
            onChange={(value: SelectOption[]): void =>
              setMultipleSelectValue(value)
            }
            value={multipleSelectValue}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            innerRef={textareaRef}
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
