import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../../Service/Utilities";

const PostedJobCard = (props:any) => {
  const {id} = useParams();
  return (
    <Link to={`/posted-jobs/${props.id}`} className={` rounded-xl p-2 border-l-2 border-l-amber-400 ${props.id==id?"bg-amber-400 text-black": "bg-zinc-700 text-gray-300"}`}>
      <div className='text-sm font-semibold'>{props.jobTitle}</div>
      <div className='text-xs font-semibold'>{props.location}</div>
      <div className='text-xs'>{props.jobStatus=="DRAFT"?"Drafted":props.jobStatus=="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  )
}

export default PostedJobCard