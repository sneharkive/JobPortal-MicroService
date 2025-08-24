import { useCombobox, Combobox, InputBase, ScrollArea } from "@mantine/core";
import { useState, useEffect } from "react";

const SelectInput = (props: any) => {
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Safe check for options array
    if (Array.isArray(props.options)) {
      setData(props.options);
    } else {
      setData([]);
      console.warn("props.options is not an array in SelectInput");
    }

    // Safe check for form and name
    const initialValue = props.form?.getInputProps(props.name)?.value ?? "";
    setValue(initialValue);
    setSearch(initialValue);
  }, []);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // Prevent crash if data is not a valid array
  const exactOptionMatch = data?.some?.((item) => item === search) ?? false;

  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item?.toLowerCase().includes(search?.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search);
          props.form.setFieldValue(props.name, search);
        } else {
          setValue(val);
          setSearch(val);
          props.form.setFieldValue(props.name, val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...props.form.getInputProps(props.name)}
          withAsterisk
          label={props.label}
          leftSection={<props.leftSection stroke={1.5} />}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
          variant="unstyled"
          classNames={{
            input:
              "bg-amber-200 focus:border-amber-300/30 border border-gray-400/10 px-2 rounded-lg",
            wrapper:
              "border border-gray-400/10 rounded-lg px-2 focus-within:border-amber-300/30 ",
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={250} type="scroll">
            {options}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;
