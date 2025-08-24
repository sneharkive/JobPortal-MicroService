import { Divider, Button, Modal } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconHeart, IconCalendarMonth, IconMapPin } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Service/ProfileService";
import { changeAppStatus } from "../../Service/JobService";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Service/NotificationService";
import { formatInterviewDateTime, openBase64InNewTab } from "../../Service/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);

  const [date, setDate] = useState<Date | null>();
  const [time, setTime] = useState<any>("");
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (props.applicantId){
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }

    else setProfile(props);
  }, [props]);


  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if(status == "INTERVIEWING"){
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      // const formateDate = formatInterviewDateTime(date ?? null)
      interview = {...interview, interviewTime:date }
    }

    changeAppStatus(interview)
      .then((res) => {
       if(status == "INTERVIEWING") SuccessNotification(
          "Interview Scheduled",
          "Interview Schedule Successfully"
        );

        if(status == "OFFERED")SuccessNotification(
          "Offered",
          "Offer had been sent Successfully"
        );
        else SuccessNotification(
          "Rejected",
          "Application had been Rejected!"
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        ErrorNotification(
          "Error",
          err.response.data.errorMessage || "Something went wrong!"
        );
      });
  };

  return (
    <div className="max-w-[450px]  flex flex-col gap-6 my-4 bg-zinc-800 p-6 rounded-xl hover:border-amber-400 hover:border-2 ">
      <div className="flex justify-between gap-4">
        <div className="p-2 rounded-xl bg-zinc-700 h-12">
          <img
            className="w-8 h-8"
            src={
              profile?.picture
                ? `data:image/jpeg;base64, ${profile?.picture}`
                : "/avatar.png"
            }
            alt={profile?.name}
          />
        </div>
        <div>
          <div>{profile?.name}</div>
          <div className="text-gray-500">
            {profile?.jobTitle} &#x2022; {profile?.company} Applicants
          </div>
        </div>
        <div>
          <IconHeart className="text-gray-300 cursor-pointer hover:scale-108" />
        </div>
      </div>

      <div className="flex justify-between text-sm gap-2">
        {profile?.skills?.map(
          (skill: string, index: number) =>
            index <= 3 && (
              <div
                key={index}
                className="px-4 pb-1 rounded-lg text-amber-400 bg-zinc-700"
              >
                {skill}
              </div>
            )
        )}
      </div>

      <div className="text-justify text-sm">{profile?.about}</div>

      <Divider />

      {props.invited ? (
        <div className="flex gap-1 text-gray-400 text-sm items-center">
          {" "}
          <IconCalendarMonth /> Interview :{" "}
          {formatInterviewDateTime(new Date(props.interviewTime))}{" "}
        </div>
      ) : (
        <div className="flex justify-between text-sm">
          <div className="font-semibold text-md">Exp: {profile.totalExp? props.totalExp + " Years":"Freshers"} </div>
          <div className="flex items-center text-sm text-gray-400">
            <IconMapPin stroke={1.5} className="h-4 " /> {profile.location}
          </div>
        </div>
      )}

      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            {" "}
            <Link to={`/talent-profile/${profile.id}`}>
              <Button color="#FDC700" fullWidth variant="outline">
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  color="#FDC700"
                  onClick={open}
                  fullWidth
                  variant="light"
                  rightSection={<IconCalendarMonth />}
                >
                  Schedule
                </Button>
              ) : (
                <Button color="#FDC700" fullWidth variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        )}

        {props.invited && (
          <>
            <div>
              <Button color="#FDC700" fullWidth variant="outline" onClick={() => handleOffer("OFFERED")}>
                Accept
              </Button>
            </div>
            <div>
              <Button color="red" fullWidth variant="light"onClick={() => handleOffer("REJECTED")} >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>

      {(props.invited || props.posted) && (
        <Button
          onClick={openApp}
          color="yellow.5"
          autoContrast
          fullWidth
          variant="filled"
        >
          View Application
        </Button>
      )}

      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Schedule Interview"
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            onChange={(value) => setDate(value ? new Date(value) : null)}
            label="Date"
            placeholder="Enter Date"
            minDate={new Date()}
            color="#FDC700"
          />
          <TimeInput
            color="#FDC700"
            label="Time"
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            ref={ref}
            minTime=""
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="#FDC700"
            fullWidth
            variant="light"
          >
            Schedule
          </Button>
        </div>
      </Modal>

      <Modal
        opened={app}
        onClose={closeApp}
        centered
        title="Application"
      >
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;{" "}
            <a
              href={`mailto:${props.email}`}
              className="text-amber-300 hover:underline cursor-pointer text-center"
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp;{" "}
            <a
              href={props.website}
              target="_blank"
              className="text-amber-300 hover:underline cursor-pointer text-center"
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume: &emsp;
            <span
              onClick={() =>
                openBase64InNewTab(props.resume)
              }
              className="text-amber-300 hover:underline cursor-pointer text-left"
            >
              View Resume
            </span>
          </div>
          <div>
            Cover Letter: &emsp;
            <div
            >
             {props.coverLetter}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
