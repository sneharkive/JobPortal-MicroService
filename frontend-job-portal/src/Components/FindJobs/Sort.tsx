import { useCombobox, Combobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSort } from "../../Slices/SortSlice";


const opt = ['Relevance', 'Most Recent', 'Salary: (Low to High)', 'Salary: (High to Low)'];
const talentSort = ['Relevance', 'Experience: (Low to High)', 'Experience: (High to Low)'];

const Sort = (props:any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job" ? opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  )): talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>));
    

  return (
    
      <Combobox
        store={combobox}
        width={140}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val))
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          {/* <Button onClick={() => combobox.toggleDropdown()}>Pick item</Button> */}
          <div onClick={() => combobox.toggleDropdown()} className='gap-4 text-sm border border-amber-300 flex items-center py-1 px-2 rounded-xl'>
            {selectedItem} <IconAdjustments  className='text-amber-200 cursor-pointer'/>
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
  );
}

export default Sort;