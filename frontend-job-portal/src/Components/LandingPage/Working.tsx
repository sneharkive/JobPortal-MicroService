import {work} from "../../Data/Data";
const Working = () => {
  return (
    <div className="mt-20 pb-8 w-screen">
      <div className="text-center text-3xl font-semibold mb-2">
        How it <span className="font-bold text-amber-300">Works</span>
      </div>
      <div className="text-center w-1/2 text-lg mx-auto mb-6 text-gray-400">
        Effortlessly navigate through the process and land your dream job.
      </div>

      <div className="flex items-center justify-around  w-full">
        <div>
          <img className="max-w-[30rem]" src="/Working/Girl.png" alt="Girl" />
        </div>

        <div>
          {work.map((w, index) => (
            <div className="flex items-center gap-3 mb-12" key={index}>
              <div className="w-14 h-13 rounded-full bg-amber-200 flex items-center justify-center">
                <img src={`/Working/${w.name}.svg`} alt={w.name} className="h-12"/>
              </div>
              <div>
                <div className="font-semibold text-xl">{w.name}</div>
                <div className="text-md text-gray-400">{w.desc}</div>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Working;
