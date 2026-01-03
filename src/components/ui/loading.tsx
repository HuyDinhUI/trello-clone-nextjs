import { ScaleLoader } from "react-spinners";

export const Scale = () => {
  return (
    <ScaleLoader
      color="blue"
      cssOverride={{
        display: "block",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%;-50%)",
      }}
      aria-setsize={10}
    />
  );
};

export const Spinner = () => {
  return (
    <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
  );
};
