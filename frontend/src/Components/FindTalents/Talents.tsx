import { useEffect, useState } from "react";
// import { talents } from "../../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfile } from "../../Service/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { LoadingOverlay } from "@mantine/core";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState<any>([]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(resetFilter());
    dispatch(resetSort());

    getAllProfile()
      .then((res) => {
        setTalents(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (sort == "Experience: (Low to High)")
      setTalents(
        [...talents].sort((a: any, b: any) => a.totalExp - b.totalExp)
      );
    else if (sort == "Experience: (High to Low)")
      setTalents(
        [...talents].sort((a: any, b: any) => b.totalExp - a.totalExp)
      );
  }, [sort]);

  useEffect(() => {
    let filterTalent = talents;
    console.log(filter);
    if (filter?.name)
      filterTalent = filterTalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter?.name.toLowerCase())
      );

    if (filter["Job Title"] && filter["Job Title"].length > 0)
      filterTalent = filterTalent.filter((talent: any) =>
        filter["Job Title"]?.some((title: any) =>
          talent?.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );

    if (filter.Location && filter.Location.length > 0)
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Location?.some((location: any) =>
          talent?.location.toLowerCase().includes(location.toLowerCase())
        )
      );

    if (filter.Skills && filter.Skills.length > 0)
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Skills?.some((skill: any) =>
          talent?.skills.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );

    if (filter.exp && filter.exp.length > 0)
      filterTalent = filterTalent.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );

    setFilteredTalents(filterTalent);
  }, [filter, talents]);

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "yellow.5", type: "bars" }}
        className="!h-screen"
      />
      <div className="p-6">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold ">Talents</div>
          <Sort />
        </div>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          {filteredTalents.length ? (
            filteredTalents.map((tal: any, index: any) => (
              <TalentCard key={index} {...tal} />
            ))
          ) : (
            <div>No Talents Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Talents;
