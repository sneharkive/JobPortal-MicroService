import { talents } from "../../Data/TalentData"
import TalentCard from "../FindTalents/TalentCard"

const CompanyEmployees = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-6 items-center justify-center" >
        {
          talents.map((tal, index) => (
            <TalentCard key={index} {...tal}/>
          ))
        }
      </div>
    </div>
  )
}

export default CompanyEmployees