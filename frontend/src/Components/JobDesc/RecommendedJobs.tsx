
import { useParams } from 'react-router-dom';
// import { jobList } from '../../Data/JobsData';
import JobCard from '../FindJobs/JobCard';
import { useState, useEffect } from 'react';
import { getAllJobs } from '../../Service/JobService';

const RecommendedJobs = () => {
  const {id} = useParams();

  const [jobList, setJobList] = useState<any>(null);
  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err) => {
      console.error("Error fetching jobs:", err);
    });
  }, []);

  
 return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommend Jobs </div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList?.map((job:any, index:number) => index<4 && id!=job.id && <JobCard key={index} {...job}/>)}
      </div>
    </div>
  );
}

export default RecommendedJobs;