import { ActionIcon, TagsInput } from '@mantine/core'
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react'
import  { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { SuccessNotification } from '../../Service/NotificationService'
import { changeProfile } from '../../Slices/ProfileSlice'

const Skills = () => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);

    const [skills, setSkills] = useState<string[]>([]);


    const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills || []);
    } 
    else 
      setEdit(false);
    
  };

    const handleSave = ( ) => {
    setEdit(false);
      let updatedProfile = { ...profile, skills:skills };
      dispatch(changeProfile(updatedProfile));
      SuccessNotification("Success", "Skills updated successfully");
  }



  return (
    <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">
              Skills{" "}
               <div>
          {edit && <ActionIcon
            variant="subtle"
            color="#FFB900"
            aria-label="Edit"
            onClick={handleSave}
          >
            <IconCheck color="green" />
          </ActionIcon>}
          <ActionIcon
            variant="subtle"
            color="#FFB900"
            aria-label="Edit"
            onClick={handleClick}
          >
            {edit ? <IconX color="red" /> : <IconEdit />}
          </ActionIcon>
        </div>
            </div>
            {
              edit ? <TagsInput placeholder="Add Skills" splitChars={[',', ' ', '|']}  value={skills}
                onChange={setSkills}  />  : <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill: any, index: any) => (
                <div
                  key={index}
                  className="bg-amber-100/15 px-4 py-1 rounded-3xl text-amber-500"
                >
                  {skill}
                </div>
              ))}
            </div>
            }
    
    
            
          </div>
  )
}

export default Skills