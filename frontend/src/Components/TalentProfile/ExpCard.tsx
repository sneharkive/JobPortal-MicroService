import { formateDate } from "../../Service/Utilities";


const ExpCard = (props:any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-lg bg-zinc-700">
            <img className="w-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div>{props.jobTitle}</div>
            <div className="text-gray-500">
              {props.company} &#x2022; {props.location}
            </div>

          </div>
        </div>
          <div>
            <div className="text-sm text-gary-300">{formateDate(props.startDate)} - {props.working ? "Present" : formateDate(props.endDate)}</div>
          </div>
      </div>
          <div className="text-sm text-gray-400 text-just">{props?.about}</div>

    </div>
  );
};

export default ExpCard;
