import { ActionIcon } from "@mantine/core";
import {  IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props:any) => {
  return (
    <div className="flex justify-between bg-zinc-700 items-center rounded-lg p-2">
      <div className="flex gap-4">
        <div className="p-2 rounded-lg bg-zinc-700">
          <img className="w-7" src={`/Icons/${props.name}.png`} alt="" />
        </div>
        <div>
          <div>{props.name}</div>
          <div className="text-gray-500">
            {props.employee} &#x2022;Applicants
          </div>
        </div>
      </div>
        <div>
          <ActionIcon color="yellow" variant="subtle">
            <IconExternalLink/>
          </ActionIcon>
        </div>
    </div>
  );
};

export default CompanyCard;
