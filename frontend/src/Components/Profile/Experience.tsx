import { ActionIcon } from '@mantine/core'
import { IconPlus, IconEdit, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import ExpCard from './ExpCard'
import ExpInput from './ExpInput'
import { useSelector } from 'react-redux'

const Experience = () => {

  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  }

  return (
     <div className="px-3">
            <div className="text-2xl font-semibold mb-5 flex justify-between">
              Experience{" "}
              <div className="flex gap-4">
                <ActionIcon color="#FFB900"onClick={() => setAddExp(!addExp)} variant="subtle"><IconPlus /></ActionIcon>
                <ActionIcon
                variant="subtle"
                color="#FFB900"
                aria-label="Edit"
                onClick={handleClick}
              >
                {edit ? <IconX color='red' /> : <IconEdit />}
              </ActionIcon></div>
            </div>
            {profile?.experiences?.map((ex:any, index:number) => (
              <ExpCard key={index} index={index} {...ex} edit={edit} />
            ))}
            {addExp && <ExpInput add setEdit={setAddExp}/>}
          </div>
  )
}

export default Experience