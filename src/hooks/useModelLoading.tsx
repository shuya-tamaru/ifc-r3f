import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useIfcLoader from "./useIfcLoader";

const useModelLoading = () => {
  const { scene } = useThree();
  const ifcLoader = useIfcLoader();

  useEffect(() => {
    ifcLoader.load("/test.ifc", (ifcModel) => {
      scene.add(ifcModel);
    });
  }, []);
};

export default useModelLoading;
