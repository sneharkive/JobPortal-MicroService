import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links= [
    {name: "Find Jobs", url:"find-jobs"},
    {name: "Find Talent", url:"find-talent"},
    {name: "Post Jobs", url:"post-job/0"},
    {name: "Posted Job", url:"posted-jobs/0"},
    {name: "Job History", url:"job-history"},
    // {name: "SignUp", url:"signup"},
  ]
  const location = useLocation();
  return (
    <div className="md:flex-row flex flex-col items-center gap-8 text-sm">
      {
        links.map((link, index) => <Link key={index} className={`${location.pathname == "/" + link.url ? "text-yellow-400 font-bold": "text-white font-semibold"}  transition-transform hover:scale-105`}to={link.url}>{link.name}</Link>)
      }
    </div>

  );
};

export default NavLinks;







// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";

// const NavLinks = () => {
//   const user = useSelector((state: any) => state.user);
//   const location = useLocation();

//   const allLinks = [
//     { name: "Find Jobs", url: "find-jobs", roles: ["APPLICANT", "EMPLOYER"] },
//     { name: "Find Talent", url: "find-talent", roles: ["APPLICANT", "EMPLOYER"] },
//     { name: "Post Jobs", url: "post-job/0", roles: ["EMPLOYER"] },
//     { name: "Posted Job", url: "posted-jobs/0", roles: ["EMPLOYER"] },
//     { name: "Job History", url: "job-history", roles: ["APPLICANT"] },
//   ];

//   const filteredLinks = allLinks.filter(link =>
//     user?.accountType && link.roles.includes(user.accountType)
//   );

//   return (
//     <div className="md:flex-row flex flex-col items-center gap-8 text-sm">
//       {filteredLinks.map((link, index) => (
//         <Link
//           key={index}
//           to={`/${link.url}`}
//           className={`${
//             location.pathname === `/${link.url}`
//               ? "text-yellow-400 font-bold"
//               : "text-white font-semibold"
//           } transition-transform hover:scale-105`}
//         >
//           {link.name}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NavLinks;
