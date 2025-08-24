import { companyData } from "../../Data/Company";


const AboutComp = () => {
  const company: { [key: string]: any } = companyData;
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company).map(
        (k, index) =>
          k!='Name' && (
            <div key={index}>
              <div className="text-xl mb-3 font-semibold">{k}</div>
              {k!='Website' && <div className="text-sm text-gray-400 text-justify ">{ k != 'Specialties'?company[k] : company[k].map((item:string, index:number)=> <span key={index}>  &bull;  {item}</span>)}</div>}
              {k=='Website' && <a href={company[k]} target="blank" className="text-sm text-amber-400 text-justify ">{company[k]}</a>}
            </div>
          )
      )}
    </div>
  );
};

export default AboutComp;
