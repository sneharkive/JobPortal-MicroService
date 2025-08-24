import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalents/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props:any) => {
  const[tab, setTab] = useState("overview");
  const[arr, setArr] = useState<any>([]);

  const handleTabChange = (value:any) => {
    setTab(value);
    if(value == "applicants")
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "APPLIED" ))
    else if(value == "invited")
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "INTERVIEWING" ))
    else if(value == "offered")
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "OFFERED" ))
    else if(value == "rejected")
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "REJECTED" ))
  }

  useEffect(() => {
    handleTabChange("overview");
  }, [props])

  return (
    <div className="mt-5 w-3/4 px-5">
{ props.jobTitle? <>      <div className="text-2xl font-semibold flex items-center">
       {props.jobTitle}{" "}
        <Badge variant="light" color="yellow" ml="sm">
          {props.jobStatus}
        </Badge>
      </div>

      <div className="font-medium text-gray-400 mb-6">
        {props.location}
      </div>
      <div>
        <Tabs variant="pills" autoContrast radius="lg" value={tab} onChange={handleTabChange}>
          <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold text-white [&_button[aria-selected='false']]:!bg-zinc-700 [&_button[data-active='true']]:!bg-amber-300 [&_button[data-active='true']]:!text-amber-800">
            <Tabs.Tab value="overview">Overview </Tabs.Tab>
            <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
            <Tabs.Tab value="invited">Invited</Tabs.Tab>
            <Tabs.Tab value="offered">Offered</Tabs.Tab>
            <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className="[&>div]:w-full">
            <JobDesc edit={true} {...props} closed={props.jobStatus=="CLOSED"} />
          </Tabs.Panel>
          <Tabs.Panel value="applicants">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {arr?.length?arr?.map((tal:any, index:number) => (
                <TalentCard key={index} {...tal} posted={true} />
              )): <div className="text-2xl font-semibold">No Applicants</div>}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {arr?.length? arr.map((tal:any, index:any) => (
                <TalentCard key={index} {...tal} invited={true} />
              )): <div className="text-2xl font-semibold">No Invited Candidates</div>}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {arr?.length? arr.map((tal:any, index:any) => (
                <TalentCard key={index} {...tal} offered={true} />
              )): <div className="text-2xl font-semibold">No Offered Candidates</div>}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="rejected">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {arr?.length? arr.map((tal:any, index:any) => (
                <TalentCard key={index} {...tal} rejected={true} />
              )): <div className="text-2xl font-semibold">No Rejected Candidates</div>}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div> </> : <div className="text-2xl font-semibold flex justify-center items-center min-h-[65vh]">No Job Selected</div> }


    </div>
  );
};

export default PostedJobDesc;
