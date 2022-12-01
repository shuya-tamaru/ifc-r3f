import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

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
          background: "#f0f8ff",
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [10, 4, 10],
        }}
      >
        <Perf />
        <LoadingBar />
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
};

export default Webgl;
