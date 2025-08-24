import Marquee from "react-fast-marquee";
import { companies } from "../../Data/Data";  // Assuming you have a data file with company names

const Companies = () => {
  return (
    <div className="mt-20 pb-8 w-screen">
      <div className="text-center text-3xl font-semibold mb-4">
        Trusted By <span className="font-bold text-amber-300">1000+</span>{" "}
        Companies
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div key={index} className="mx-6 px-3 hover:bg-gray-800 rounded-lg cursor-pointer">
            <img src={`/Companies/${company}.png`} alt={company} className=" h-14 " />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
