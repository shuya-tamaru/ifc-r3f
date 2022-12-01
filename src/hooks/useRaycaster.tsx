import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import { IFCModel } from "web-ifc-three/IFC/components/IFCModel";
import useFocusId from "../components/stores/useFocusId";
import useLoadingState from "../components/stores/useLoadingState";
import useIfcLoader from "./useIfcLoader";

const useRaycaster = () => {
  const ifcLoader = useIfcLoader();
  const { scene, raycaster, gl } = useThree();
  const canvas = gl.domElement;
  const idRef = useRef<string>("");
  const { loaded } = useLoadingState((state) => state);
  const { setFocusId } = useFocusId((state) => state);
  const [ifcDate, setIfcDate] = useState<Object3D[] | null>(null);

  useEffect(() => {
    const model = scene.children.filter((mesh) => {
      const ifc = mesh.type === "Mesh" && mesh.name !== "overray" && mesh;
      return ifc;
    });
    loaded && setIfcDate(model);
    canvas.addEventListener("click", () => {
      setFocusId(idRef.current);
    });
  }, [loaded]);

  useFrame(() => {
    if (ifcDate && ifcDate.length > 0) {
      raycaster.firstHitOnly = true;
      const obj = raycaster.intersectObjects(ifcDate);
      if (obj.length > 0) {
        const ifcObject = obj[0];
        const index = ifcObject.faceIndex;
        const ifcModel = ifcObject.object as IFCModel;
        const geometry = ifcModel.geometry;
        const ifc = ifcLoader.ifcManager;
        const id: string = index
          ? ifc.getExpressId(geometry, index).toString()
          : "";
        idRef.current = id;
      }
    }
  });

  return;
};

export default useRaycaster;
