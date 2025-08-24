import { formateDate } from "../../Service/Utilities";

const CertiCard = (props:any) => {
  return (
        <div className="flex justify-between mb-4">
          <div className="flex gap-4 items-center">
            <div className="p-2 rounded-lg bg-zinc-700">
              <img className="w-7" src={`/Icons/${props.issuer}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{props.name}</div>
              <div className="text-gray-500">
                {props.issuer}
              </div>
            </div>

          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gary-300">{formateDate(props.issueDate)}</div>
            <div className="text-sm text-gary-300">ID : {props.certificateId}</div>
          </div>
        
      </div>
  );
};

export default CertiCard;
