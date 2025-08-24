import { ActionIcon } from "@mantine/core"
import { IconPlus, IconEdit, IconX } from "@tabler/icons-react"

import CertiCard from "./CertiCard"
import CertiInput from "./CertiInput"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"


const Certifications = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
    
  const [addCerti, setAddCerti] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  }


  return (
    <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications{" "}
          <div className="flex gap-4">
            <ActionIcon color="#FFB900" onClick={() => setAddCerti(!addCerti)} variant="subtle"><IconPlus /></ActionIcon>
          <ActionIcon
            variant="subtle"
            color="#FFB900"
            aria-label="Edit"
            onClick={handleClick}
          >
            {edit ? <IconX/> : <IconEdit />}
          </ActionIcon></div>
        </div>
        {profile?.certifications?.map((ex:any, index:number) => (
          <CertiCard index={index} edit={edit} key={index} {...ex} />
        ))}
        {addCerti && <CertiInput setEdit={setAddCerti}/>}
      </div>
  )
}

export default Certifications