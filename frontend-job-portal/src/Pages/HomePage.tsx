
import Companies from "../Components/LandingPage/Companies"
import DreamJob from "../Components/LandingPage/DreamJob"
import JobCategory from "../Components/LandingPage/JobCategory"
import Subscribe from "../Components/LandingPage/Subscribe"
import Testimonials from "../Components/LandingPage/Testimonials"
import Working from "../Components/LandingPage/Working"


const HomePage = () => {

  return (
    <div className="max-w-screen overflow-x-hidden flex flex-col items-center justify-center min-h-screen bg-zinc-900 font-['poppins'] text-white">
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
    </div>
  )
}

export default HomePage