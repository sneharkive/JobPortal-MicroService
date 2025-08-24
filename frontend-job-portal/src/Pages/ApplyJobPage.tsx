import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";
import { useState, useEffect } from "react";
import { getJobById } from "../Service/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
    getJobById(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
      });

  }, [id]);

  
  return (
    <div className="mb-16 min-h-[90vh] p-4">

        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft />} color="#FDC700" variant="light">
          {" "}
          Back
        </Button>

      <ApplyJobComp {...job}  />
    </div>
  );
};

export default ApplyJobPage;
