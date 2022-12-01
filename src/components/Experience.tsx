import { Environment, OrbitControls } from "@react-three/drei";
import useModelLoading from "../hooks/useModelLoading";
import useRaycaster from "../hooks/useRaycaster";

const Experience = () => {
  useModelLoading();
  useRaycaster();

  return (
    <>
      <ambientLight intensity={0.5} />
      <OrbitControls makeDefault />
    </>
  );
};

export default Experience;
