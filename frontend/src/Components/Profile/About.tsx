import { ActionIcon, Textarea } from '@mantine/core'
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessNotification } from '../../Service/NotificationService';
import { changeProfile } from '../../Slices/ProfileSlice';

const About = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);

    const [about, setAbout] = useState("");

const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } 
    else 
      setEdit(false);
    
  };

    const handleSave = ( ) => {
    setEdit(false);
      let updatedProfile = { ...profile, about:about };
      dispatch(changeProfile(updatedProfile));
      SuccessNotification("Success", "About part updated successfully");
  }




  return (
    <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">
              About{" "}
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
            {edit ? (
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                autosize
                minRows={3}
                placeholder="Enter about yourself"
              />
            ) : (
              <div className="text-sm text-gray-300 text-justify">{profile?.about}</div>
            )}
          </div>
  )
}

export default About