import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <section className="flex items-center w-full place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Find your
            <strong className="text-amber-300"> Dream Job </strong>
            with us
            <strong className="text-amber-400"> NextRole </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-400 sm:text-xl/relaxed">
            Good life begins with a good company. Start explore thousands of jobs in one place.
          </p>

          {/* <div className="mt-4 flex gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          href="#"
        >
          Get Started
        </a>

        <a
          className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-400 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#"
        >
          Learn More
        </a>
      </div> */}

          <div className="mt-8 flex gap-4 sm:mt-6 items-center min-h-16">
            <TextInput
              className=" bg-zinc-700 pt-1 pl-4 rounded-lg text-gray-300 [&_input]:!text-white"
              variant="unstyled"
              label="Job Title"
              placeholder="Software Engineer"
            />
            <TextInput
              className="bg-zinc-700 pt-1 pl-4 rounded-lg text-gray-300 [&_input]:!text-white"
              variant="unstyled"
              label="Job Type"
              placeholder="Fulltime"
            />

            <div className="bg-amber-400 hover:bg-amber-500 cursor-pointer text-white p-1 rounded-lg">
              <IconSearch size={40} />
            </div>
          </div>
        </div>

        <div >
          <div className="max-w-[30rem]">
            <img src="Boy.png" alt="Boy" />
          </div>


          {/* <div className="absolute top-[50%] right-10 w-fit border-amber-300 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-sm text-white ">
              10K+ got job
            </div>
            <AvatarGroup>
              <Avatar src="avatar1.png" />
              <Avatar src="avatar2.png" />
              <Avatar src="avatar3.png" />
              <Avatar>+9K</Avatar>
            </AvatarGroup>
          </div> */}
{/* 
          <div className="absolute top-[60%] md:top-[35%] md:right-[35%] w-fit border-amber-300 border rounded-lg p-2 backdrop-blur-md">



              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-zinc-800 rounded-lg p-1">
                  <img src="Google.png" alt="Google" />
                </div>
                <div className="text-gray-300 text-[13px]">
                  <div>Software Engineer</div>
                  <div>New York</div>
                </div>
              </div>


              <div className="flex justify-around text-[12px] text-gray-400 mt-2">
                <span>1day ago</span>
                <span>120 Applicants</span>
              </div>
          </div> */}


          
        </div>

        
      </div>
    </section>
  );
};

export default DreamJob;
