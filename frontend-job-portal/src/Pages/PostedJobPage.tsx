import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Service/JobService";

const PostedJobPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});

    useEffect (() => {
      window.scroll(0,0);
      getJobPostedBy(user.id).then((res) => {
        setJobList(res);
        if(res && res.length > 0 && Number(id) == 0) navigate(`/posted-jobs/${res[0].id}`)
        setJob(res.find((item:any) => item.id == id))
      }).catch((err) => console.log(err));

    }, [id])

  return (
    <div className="mb-16 min-h-[90vh] p-4">

      <div className="flex gap-6">
        <PostedJob job={job} jobList={jobList}/>
        <PostedJobDesc {...job}/>
      </div>
    </div>
  );
};

export default PostedJobPage;
