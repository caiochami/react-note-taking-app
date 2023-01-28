import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { SelectedOption } from "./SelectedOption";
import { SelectOption } from "./SelectOption";

export type SelectOption = {
  id: string;
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
  onCreate: (value: SelectOption) => void;
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  name,
  label = "Label",
  options = [],
  value,
  onChange,
  onCreate,
  multiple,
}: SelectProps) {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const optionRefs = useRef<any[]>([]);

  const [search, setSearch] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputEl = useRef<HTMLInputElement>(null);

  const containerEl = useRef<HTMLDivElement>(null);

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

  const createOption = (): void => {
    if (!multiple || !search.length) {
      return;
    }

    const newOption = {
      id: crypto.randomUUID(),
      label: search,
      value: search,
    };

    selectOption(newOption);

    clearSearch();

    onCreate(newOption);
  };

  const isOptionSelected = (selectOption: SelectOption): boolean => {
    return !multiple ? value === selectOption : value.includes(selectOption);
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
    const handler = (event: KeyboardEvent): void => {
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
          if (!search.length) {
            return;
          }

          if (multiple && filteredOptions.length === 0) {
            createOption();
          } else {
            console.log("ok");
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

    containerEl.current?.addEventListener("keydown", handler);

    return () => containerEl.current?.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (event.path?.includes(containerEl.current)) {
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
    const element = optionRefs.current[highlightedIndex];

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [highlightedIndex]);

  useEffect(() => {
    if (isOpen) {
      inputEl.current?.focus();

      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className="relative mt-1 text-left outline-none"
        ref={containerEl}
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex cursor-pointer flex-wrap gap-2 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm">
          {multiple
            ? value.map((selectedOption: SelectOption) => (
                <SelectedOption
                  key={selectedOption.id}
                  onClick={() => clearOption(selectedOption)}
                  selectOption={selectedOption}
                />
              ))
            : value && (
                <SelectedOption
                  onClick={() => clearOption(value)}
                  selectOption={value}
                />
              )}

          <input
            ref={inputEl}
            type="text"
            name={name}
            onChange={(event) => setSearch(event.target.value)}
            id={name}
            className="block w-16 px-2 py-1 outline-none sm:text-sm"
          />
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
            className="absolute right-0 z-10 mt-2 max-h-32 w-56 origin-top-right divide-y divide-gray-100 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
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
                  innerRef={(el: any) => (optionRefs.current[index] = el)}
                />
              ))
            ) : (
              <SelectOption
                onMouseEnter={() => setHighlightedIndex(0)}
                onClick={createOption}
                option={{
                  id: "new",
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
