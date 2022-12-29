import { SelectOption } from "./Select";

type SelectedOptionProps = {
  selectOption: SelectOption;
  onClick: () => void;
};

export function SelectedOption({ selectOption, onClick }: SelectedOptionProps) {
  return (
    <div
      className="cursor-pointer rounded-md bg-gray-100 p-2 text-xs text-gray-600 transition delay-150 ease-in-out hover:bg-gray-100"
      key={selectOption.value}
      onClick={onClick}
    >
      {selectOption.label}
    </div>
  );
}
