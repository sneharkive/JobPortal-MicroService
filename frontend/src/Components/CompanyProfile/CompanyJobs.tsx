
import { jobList } from '../../Data/JobsData'
import JobCard from '../FindJobs/JobCard'

const CompanyJobs = () => {
  return (
    <div><div className="flex flex-wrap gap-6 items-center justify-center" >
        {jobList.map((job, index) =>  (
          <JobCard key={index} {...job} />
        ))}
      </div></div>
  )
}

export default CompanyJobs