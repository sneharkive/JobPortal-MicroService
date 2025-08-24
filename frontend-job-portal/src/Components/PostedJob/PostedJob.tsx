import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props:any) => {

  const [activeTab, setActiveTab] = useState<any>("ACTIVE");

  useEffect(() => {
    setActiveTab(props.job?. jobStatus || 'ACTIVE');
    console.log(activeTab)
  }, [props.job])

  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-8">PostedJob</div>
      <div>
          <Tabs variant="pills" autoContrast radius="lg" value={activeTab} onChange={setActiveTab}>
            <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold text-white [&_button[aria-selected='false']]:!bg-zinc-700 [&_button[data-active='true']]:!bg-amber-300 [&_button[data-active='true']]:!text-amber-800">
              <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job:any) => job?.jobStatus=="ACTIVE").length}] </Tabs.Tab>
              <Tabs.Tab value="DRAFT">Draft [{props.jobList?.filter((job:any) => job?.jobStatus=="DRAFT").length}]</Tabs.Tab>
              <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job:any) => job?.jobStatus=="CLOSED").length}]</Tabs.Tab>
            </Tabs.List>

          </Tabs>
            {/* <Tabs.Panel value="active"> */}
              <div className="flex flex-col gap-4">
                {
                  props.jobList?.filter((job:any) => job?.jobStatus==activeTab).map((item:any, index:number) => <PostedJobCard key={index} {...item} />)
                }
              </div>
            {/* </Tabs.Panel> */}
        </div>
    </div>
  );
};

export default PostedJob;
