import { useState } from "react";
import { Form } from "react-router-dom";
import { Input } from "./Input";
import { Select, SelectOption } from "./CreatableSelect/Select";
import { Textarea } from "./Textarea";

export function NoteForm() {
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

  const [singleSelectValue, setSingleSelectValue] = useState<
    SelectOption | undefined
  >(options[0]);

  const handleSingleSelectChange = (value: SelectOption | undefined): void => {
    console.log(value);

    setSingleSelectValue(value);
  };

  const [multipleSelectValue, setMultipleSelectValue] = useState<
    SelectOption[]
  >([]);

  const handleMultipleSelectChange = (value: SelectOption[]): void => {
    console.log(value);

    setMultipleSelectValue(value);
  };

  return (
    <Form>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <Input name="title" label="Title" placeholder="Title" />
        </div>
        <div>
          <Select
            label="Tags"
            name="tags"
            options={options}
            onChange={handleSingleSelectChange}
            value={singleSelectValue}
          />

          <Select
            label="Tags"
            name="tags"
            multiple
            options={options}
            onChange={handleMultipleSelectChange}
            value={multipleSelectValue}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea name="body" label="Body" placeholder="Body" />
        </div>
      </div>
    </Form>
  );
}
