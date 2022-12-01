import { Canvas } from "@react-three/fiber";

import Experience from "./Experience";
import Interface from "./Interface";
import LoadingBar from "./LoadingBar";

const Webgl = () => {
  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [0, 3, 11],
        }}
      >
        <LoadingBar />
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
};

export default Webgl;
