import { useEffect, useState } from "react";
// import { jobList } from "../../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../../Service/JobService";
import { LoadingOverlay } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filteredJobs, setFilteredJobs] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching jobs:", err);
      });
  }, []);


  useEffect(() => {
    if(sort == "Most Recent")
      setJobList([...jobList].sort((a:any, b:any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));

    else if(sort == "Salary: (Low to High)")
      setJobList([...jobList].sort((a:any, b:any) => a.packageOffered - b.packageOffered));

    else if(sort == "Salary: (High to Low)")
      setJobList([...jobList].sort((a:any, b:any) => b.packageOffered - a.packageOffered));


  }, [sort])


  useEffect(() => {
    let filterJobList = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0)
      filterJobList = filterJobList.filter((job: any) =>
        filter["Job Title"]?.some((title: any) =>
          job?.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );

    if (filter.Location && filter.Location.length > 0)
      filterJobList = filterJobList.filter((job: any) =>
        filter.Location?.some((location: any) =>
          job?.location.toLowerCase().includes(location.toLowerCase())
        )
      );

    // if (filter.Experience && filter.Experience.length > 0)
    //   filterJobList = filterJobList.filter((job: any) =>
    //     filter.Experience?.some((x: any) =>
    //       job.experience?.toLowerCase().include(x.toLowerCase())
    //     )
    //   );


if (filter.Experience && filter.Experience.length > 0) {
  filterJobList = filterJobList.filter((job: any) => {
    const experienceArray = Array.isArray(job.experience)
      ? job.experience
      : typeof job.experience === 'string'
      ? [job.experience]
      : [];

    return experienceArray.some((exp: string) =>
      filter.Experience.some((x: string) =>
        exp.toLowerCase().includes(x.toLowerCase())
      )
    );
  });
}



    if (filter["Job Type"] && filter["Job Type"].length > 0)
      filterJobList = filterJobList.filter((job: any) =>
        filter["Job Type"]?.some((x: any) =>
          job?.jobType.toLowerCase().includes(x.toLowerCase())
        )
      );

    if (filter.salary && filter.salary.length > 0)
      filterJobList = filterJobList.filter(
        (job: any) =>
          filter.salary[0] <= job.packageOffered &&
          job.packageOffered <= filter.salary[1]
      );

    setFilteredJobs(filterJobList);
  }, [filter, jobList]);


  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "yellow.5", type: "bars" }}
        className="!h-screen"
      />
      <div className="p-6">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold ">Recommended Jobs</div>
          <Sort sort="job"/>
        </div>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          {filteredJobs.map((job: any, index: any) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
