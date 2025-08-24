import { Button, Divider, Text } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled, IconClock } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../Service/Utilities'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../../Slices/ProfileSlice'

const JobCard = (props:any) => {

  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);


  const handleSaveJob = () => {
  let savedJobs = profile.savedJobs ? [...profile.savedJobs] : [];

  if (savedJobs.includes(props.id)) 
    savedJobs = savedJobs.filter((id) => id !== props.id);
   else 
    savedJobs.push(props.id);

  const updatedProfile = { ...profile, savedJobs };
  dispatch(changeProfile(updatedProfile));
};



  return (
    <div  className='w-96 min-h-74 flex flex-col gap-6 my-4 bg-zinc-800 p-6 rounded-xl hover:border-amber-400 hover:border-2  '>

      <div className='flex justify-between'>
        <div className='p-2 rounded-lg bg-zinc-700'><img className='w-7' src={`/Icons/${props.company}.png`} alt="" /></div>
        <div>
          <div>{props.jobTitle}</div>
          <div className='text-gray-500'> <Link to="/company">{props.company}</Link> &#x2022; {props.applicants?props.applicants.length:0} Applicants</div>
        </div>
        <div >
          {profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className='!text-amber-300 cursor-pointer hover:!text-amber-400'/>  
          : <IconBookmark onClick={handleSaveJob}  className='text-gray-300 cursor-pointer hover:text-amber-300'/>}
        </div>
      </div>

      <div className='flex justify-between text-sm'>
        <div className='px-4 pb-1 rounded-lg text-amber-400 bg-zinc-700'>{props.experience}</div>
        <div className='px-4 pb-1 rounded-lg text-amber-400 bg-zinc-700'>{props.jobType}</div>
        <div className='px-4 pb-1 rounded-lg text-amber-400 bg-zinc-700'>{props.location}</div>
      </div>

      <div >
        <Text className='!text-justify !text-sm !text-gray-300'>{props.about}</Text>
      </div>

      <Divider />

      <div className='flex justify-between'>
        <div className='font-bold'>
          &#8377;{props.packageOffered} LPA
        </div>
        <div className='flex items-center text-sm text-gray-400'><IconClock stroke={1.5} className='h-4 ' /> {timeAgo(props.postTime)}</div>
      </div>
      <Link to={`/jobs/${props.id}`} >
      <Button fullWidth color='yellow.8' variant='light' >View Job</Button>
      </Link>

    </div>
  )
}

export default JobCard