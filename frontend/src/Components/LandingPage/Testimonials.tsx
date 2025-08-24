import { Carousel } from "@mantine/carousel";
import {testimonials} from "../../Data/Data";
import { Rating } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-8 w-full">
      <div className="text-center text-3xl font-semibold mb-8">
        What <span className="font-bold text-amber-300">Users</span> says about us?
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
        {testimonials.map((tes, index) => (
          <Carousel.Slide  key={index}>
          <div className="w-84 p-2 border border-amber-200 mx-1 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 rounded-full overflow-hidden">
                <img src={`avatar1.png`} alt="" />
              </div>
              <div>
                <p>{tes.name}</p>
                <Rating value={tes.rating} fractions={2} readOnly/>
              </div>
            </div>
            <div className="text-sm mt-4 text-gray-400">{tes.testimonial}</div>
          </div>
          </Carousel.Slide>
        ))}

        </Carousel>
      </div>



  );
};

export default Testimonials;
