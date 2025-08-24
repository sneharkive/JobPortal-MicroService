import { LoadingOverlay, Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Service/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {

  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter(
            (job: any) =>
              job.applicants?.filter(
                (applicant: any) =>
                  applicant.applicantId == user.id &&
                  applicant.applicationStatus == "APPLIED"
              ).length > 0
          )
        );
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);



  useEffect(() => {
    if (!jobList.length) return;
    setLoading(true);

    if (activeTab === "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
      );
    } else {
      setShowList(
        jobList.filter(
          (job: any) =>
            job.applicants?.filter(
              (applicant: any) =>
                applicant.applicantId === user.id &&
                applicant.applicationStatus === activeTab
            ).length > 0
        )
      );
    }
    setLoading(false);

  }, [profile.savedJobs, activeTab, jobList, user.id]);

  // Tab switch handler
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };




  // const handleTabChange = (value: string | null) => {
  //   setActiveTab(value);
  //   if (value == "SAVED") {
  //     setShowList(
  //       jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
  //     );
  //   } else {
  //     setShowList(
  //       jobList.filter(
  //         (job: any) =>
  //           job.applicants?.filter(
  //             (applicant: any) =>
  //               applicant.applicantId == user.id &&
  //               applicant.applicationStatus == value
  //           ).length > 0
  //       )
  //     );
  //   }
  // };

  return (
    <div>
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "yellow.5", type: "bars" }} className="!h-screen"
            />
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs
          variant="outline"
          radius="lg"
          defaultValue={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List className="[&_button]:!text-lg mb-5 font-semibold [&_button[data-active='true']]:!text-amber-300">
            <Tabs.Tab value="APPLIED">Applied </Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {showList.map((item: any, index: number) => (
                <Card key={index} {...item} {...{[activeTab.toLowerCase()]:true}} />
              ))}
            </div>
          </Tabs.Panel>


        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
