import { classNames } from "../../utilities/helpers";
import { SelectOption } from "./Select";
import { CheckIcon } from "@heroicons/react/24/solid";

type SelectOptionProps = {
  isSelected?: Boolean;
  isHighlighted?: Boolean;
  onClick: (value: SelectOption) => void;
  option: SelectOption;
  onMouseEnter: () => void;
  innerRef?: any;
};

export function SelectOption({
  isSelected = false,
  isHighlighted = false,
  onClick,
  onMouseEnter,
  option,
  innerRef,
}: SelectOptionProps) {
  return (
    <div
      ref={innerRef}
      onMouseEnter={onMouseEnter}
      className={classNames(
        "flex cursor-pointer items-center gap-2 rounded-md p-1 text-xs",
        isSelected ? "bg-gray-50" : "",
        isHighlighted ? "bg-blue-500 text-white" : ""
      )}
      key={option.value}
      onClick={() => onClick(option)}
    >
      <div
        className={classNames(
          "flex h-5 w-5 items-center rounded-full border border-gray-400 p-1 transition delay-150 ease-in-out",
          isHighlighted ? "border-white" : ""
        )}
      >
        {isSelected && (
          <CheckIcon
            className={classNames(
              "h-5 w-5",
              isHighlighted ? "text-white" : "text-gray-400"
            )}
          />
        )}
      </div>

      <span>{option.label}</span>
    </div>
  );
}
