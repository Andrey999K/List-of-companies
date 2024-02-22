import { PuffLoader } from "react-spinners";

const ScreenLoader = () => {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 w-screen h-[100dvh] bg-white/90 flex justify-center items-center z-[9999]`}
    >
      <PuffLoader color="orange" />
    </div>
  );
};

export default ScreenLoader;
