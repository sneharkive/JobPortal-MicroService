
import {jobCategory} from "../../Data/Data"; // Assuming you have a data file with company names

import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
const JobCategory = () => {
  return (
    <div className="mt-20 pb-8 max-w-screen">
      <div className="text-center text-3xl font-semibold mb-2">
        Browse <span className="font-bold text-amber-300">Job</span> Category
      </div>
      <div className="text-center w-1/2 text-lg mx-auto mb-6 text-gray-400">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      <Carousel
        slideSize="40px"
        slideGap="md"
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-amber-200 [&_button]:hover:opacity-75 [&_button]:opacity-0  [&_button]:!border-none"
        nextControlIcon={<IconArrowRight size={16} className="h-8 w-8 " />}
        previousControlIcon={<IconArrowLeft size={16} className="h-8 w-8"/>}
        emblaOptions={{
          loop: true,
          dragFree: true,
          align: "center",
        }}
      >
        {jobCategory.map((jc, index) => (
          <Carousel.Slide key={index}>
            <div className="border cursor-pointer hover:scale-98 ease-in border-amber-300 flex flex-col items-center w-64 p-4 rounded-lg">
              <div className="p-2 rounded-full bg-amber-200 ">
                <img className="h-6 w-6" src="/Category/Sales.png" />
              </div>
              <div className="text-center font-semibold text-lg">{jc.name}</div>
              <div className="text-center text-sm text-gray-400">{jc.desc}</div>
              <div className="text-center text-amber-300 text-md">
                {jc.jobs}+ new jobs posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
