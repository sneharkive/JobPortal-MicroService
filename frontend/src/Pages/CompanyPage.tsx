import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import {  useNavigate } from 'react-router-dom';
import Company from '../Components/CompanyProfile/Company';
import SimilarCompanies from '../Components/CompanyProfile/SimilarCompanies';

const CompanyPage = () => {
  const navigate = useNavigate();

   return (
    <div className="mb-16 min-h-[90vh] p-4">

        <Button onClick={() => navigate(-1)} my="md" leftSection={<IconArrowLeft /> } color="#FDC700" variant="light">
          {" "}
          Back
        </Button>


      <div className="flex gap-6">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  );
}

export default CompanyPage