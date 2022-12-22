type TagSelectorProps = {
  name: string;
  label?: string;
};

export function TagSelector({ name, label = "Tags" }: TagSelectorProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">Select Goes here</div>
    </div>
  );
}
