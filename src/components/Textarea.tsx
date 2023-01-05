import { RefObject } from "react";

type TextareaProps = {
  name: string;
  placeholder: string;
  label: string;
  innerRef?: RefObject<HTMLTextAreaElement>;
};
export function Textarea({ name, label = "Label", innerRef }: TextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          ref={innerRef}
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={""}
        />
      </div>
    </div>
  );
}
