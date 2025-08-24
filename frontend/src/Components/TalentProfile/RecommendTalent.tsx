import { useParams } from "react-router-dom";
import TalentCard from "../FindTalents/TalentCard";

const RecommendTalent = (props:any) => {
  const {id} = useParams()
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommend Talent</div>
      <div className="flex flex-col flex-wrap gap-5">
        {props?.talents.map((tal:any, index:any) => index<3 && id!=tal.id && <TalentCard key={index} {...tal}/>)}
      </div>
    </div>
  );
};

export default RecommendTalent;
