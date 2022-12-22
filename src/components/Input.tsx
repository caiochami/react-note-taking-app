type InputProps = {
  name: string;
  type?: string;
  placeholder: string;
  label: string;
};
export function Input({
  name,
  label = "Label",
  type = "text",
  placeholder = "Type something...",
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
