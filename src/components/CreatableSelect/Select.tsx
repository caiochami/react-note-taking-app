import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { SelectOption } from "./SelectOption";

export type SelectOption = {
  label: string;
  value: any;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  name,
  label = "Label",
  options = [],
  value,
  onChange,
  multiple,
}: SelectProps) {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const [search, setSearch] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputEl = useRef<HTMLInputElement>(null);

  const dropdownEl = useRef<HTMLDivElement>(null);

  const filteredOptions =
    search.length === 0
      ? options
      : options.filter((option: SelectOption) => {
          if (typeof option.value != "string") {
            return option.value == search;
          }

          return option.value.toLowerCase().includes(search.toLowerCase());
        });

  const selectOption = (option: SelectOption): void => {
    if (!multiple) {
      onChange(option);

      return;
    }

    onChange([...value, option]);
  };

  const clearOption = (option: SelectOption): void => {
    if (!multiple) {
      onChange(undefined);

      return;
    }

    const selectedOptions = value.slice();

    onChange(
      selectedOptions.filter(
        (selectOption: SelectOption) => selectOption !== option
      )
    );
  };

  const clearSearch = (): void => {
    setSearch("");

    if (inputEl.current) {
      inputEl.current.value = "";
    }
  };

  const createTag = (): void => {
    if (!multiple) {
      return;
    }

    selectOption({
      label: search,
      value: search,
    });

    clearSearch();
  };

  const isOptionSelected = (selectOption: SelectOption): boolean => {
    if (!multiple) {
      return value === selectOption;
    }

    console.log("includes", value.includes(selectOption));

    return value.includes(selectOption);
  };

  const toggleOption = (option: SelectOption): void => {
    if (!multiple) {
      setIsOpen(false);
    }
    inputEl.current?.focus();

    if (!isOptionSelected(option)) {
      selectOption(option);

      return;
    }

    clearOption(option);
  };

  useEffect(() => {
    const inputHandler = (event: KeyboardEvent): void => {
      event.stopPropagation();

      if (!isOpen) {
        setIsOpen(true);
      }

      switch (event.key) {
        case "Backspace":
          if (multiple && value.length > 0 && search.length === 0) {
            const newSelectedOptions = value.slice(0, value.length - 1);

            onChange(newSelectedOptions);
          }
          break;
        case "Enter":
          if (search.length > 0 && filteredOptions.length === 0) {
            createTag();
          } else {
            toggleOption(filteredOptions[highlightedIndex]);
          }

          clearSearch();

          break;
        case "ArrowUp": {
          const newIndex = highlightedIndex - 1 <= 0 ? 0 : highlightedIndex - 1;

          setHighlightedIndex(newIndex);

          break;
        }
        case "ArrowDown": {
          let newIndex = highlightedIndex + 1;

          if (newIndex >= 0 && newIndex < filteredOptions.length) {
            setHighlightedIndex(newIndex);
          }

          break;
        }
        case "Space":
          setIsOpen(true);
          break;
        case "Escape":
          setIsOpen(false);
          break;

        default:
          break;
      }
    };

    inputEl.current?.addEventListener("keydown", inputHandler);

    return () => inputEl.current?.removeEventListener("keydown", inputHandler);
  });

  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (
        event.path.includes(inputEl.current) ||
        event.path.includes(dropdownEl.current)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  }, [isOpen]);

  useEffect(() => {
    if (!filteredOptions.length) {
      return;
    }

    setHighlightedIndex(0);
  }, [filteredOptions]);

  useEffect(() => {
    setSearch(search.trim());
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 text-left">
        <div
          onClick={() => setIsOpen(true)}
          className="flex flex-wrap gap-2 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm"
        >
          {multiple
            ? value.map((selectedOption: SelectOption) => (
                <div
                  className="cursor-pointer rounded-md bg-gray-100 p-2 text-xs text-gray-600 transition delay-150 ease-in-out hover:bg-gray-100"
                  key={selectedOption.value}
                  onClick={() => clearOption(selectedOption)}
                >
                  {selectedOption.label}
                </div>
              ))
            : value?.label}

          {multiple && (
            <input
              ref={inputEl}
              type="text"
              name={name}
              onChange={(event) => setSearch(event.target.value)}
              id={name}
              className="block px-2 py-1 outline-none sm:text-sm"
            />
          )}
        </div>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            ref={dropdownEl}
          >
            {filteredOptions.length ? (
              filteredOptions.map((option: SelectOption, index: number) => (
                <SelectOption
                  isHighlighted={highlightedIndex === index}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  isSelected={isOptionSelected(option)}
                  onClick={() => toggleOption(option)}
                  key={index}
                  option={option}
                />
              ))
            ) : (
              <SelectOption
                onMouseEnter={() => setHighlightedIndex(0)}
                onClick={createTag}
                option={{
                  value: search,
                  label: multiple
                    ? `Create option "${search}"`
                    : "No option found.",
                }}
              />
            )}
          </div>
        </Transition>
      </div>
    </>
  );
}
