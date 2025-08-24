import { Input, RangeSlider } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";
import { searchFields } from "../../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");

  const handleChange = (name: any, event: any) => {
    if (name == "exp") dispatch(updateFilter({ exp: event }));
    else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };
  return (
    <div className="flex justify-around flex-wrap gap-2 items-center mb-8">
      <div className="flex items-center">
        <div className="text-amber-400 bg-zinc-800 rounded-full p-1 mr-2">
          <IconUserCircle size={28} />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>

      {searchFields.map((item, index) => (
        <div key={index} className="w-64 bg-zinc-800 rounded-lg p-2">
          <MultiInput {...item} />
        </div>
      ))}
      <div className="w-64">
        <div className="flex justify-between items-center ">
          <div>Experience(Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          onChangeEnd={(e) => handleChange("exp", e)}
          max={50}
          min={0}
          minRange={1}
          color="#FDC700"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
