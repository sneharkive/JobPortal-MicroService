import { Button, TextInput } from "@mantine/core";

const Subscribe = () => {
  return (
      <div className="my-20 flex flex-wrap items-center bg-zinc-700 mx-20 pb-2 pt-4 rounded-xl justify-evenly">
        <div className="text-center text-3xl w-2/5 font-semibold mb-3 text-gray-200">
          Never Wants to Miss Any{" "}
          <span className="font-bold text-amber-300">Job News?</span>
        </div>
        <div className="flex gap-4 items-center bg-gray-600 px-3 py-2 rounded-xl"> 
          <TextInput
            variant="unstyled"
            placeholder="Your@email.com"
            className=" [&_input]:!text-gray-200 font-semibold"
            size="xl"
          />
          <Button color="#DEB900" variant="filled" size="lg" className="[&_button]:bg-amber-400">Subscribe</Button>
        </div>
      </div>
  );
};

export default Subscribe;
