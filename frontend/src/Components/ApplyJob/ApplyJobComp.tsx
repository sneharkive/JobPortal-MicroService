import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../Service/Utilities";
import { Divider } from "@mantine/core";

const ApplyJobComp = (props:any) => {

  return (
      <div className="w-2/3 mx-auto">

        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-zinc-700">
              <img className="w-14" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">{props.jobTitle}</div>
              <div className="text-gray-500 text-lg">
                {props.company} &bull; {timeAgo(props.postTime)}&bull; {props.applicants? props.applicants.length : 0}
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />

        <ApplicationForm />


      </div>

  );
};

export default ApplyJobComp;
