import { RangeSlider } from "@mantine/core";
import { useState } from "react";
import { dropdownData } from "../../Data/JobsData";
import MultiInput from "./MultiInput";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 300]);
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };

  return (
    <div className="flex justify-around flex-wrap gap-4 items-center mb-8">
      {dropdownData.map((item, index) => (
        <div key={index} className="w-64 bg-zinc-800 rounded-lg p-2">
          <MultiInput {...item} />
        </div>
      ))}
      <div className="w-64">
        <div className="flex justify-between items-center ">
          <div>Salary</div>
          <div>
            &#8377;{value[0]}LAP - &#8377;{value[1]}LPA
          </div>
        </div>
        <RangeSlider
          color="#FDC700"
          max={300}
          min={0}
          minRange={1}
          value={value}
          onChangeEnd={(e) => handleChange(e)}
           onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
