import * as THREE from "three";
import { ParserProgress } from "web-ifc-three/IFC/components/IFCParser";
import { gsap } from "gsap";

import useIfcLoader from "../hooks/useIfcLoader";
import useLoadingState from "./stores/useLoadingState";
import { useState } from "react";

const overlayGeometry = new THREE.PlaneGeometry(300, 300, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uAlpha: { value: 1.0 },
    uColor1: { value: new THREE.Color("#f0f8ff") },
    uColor2: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
        varying vec2 vUv;
        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;                
          vUv = uv;
        }
    `,
  fragmentShader: `
        varying vec2 vUv;
        uniform float uAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        void main()
        {
            float strength = distance(vUv, vec2(0.5));
            vec3 color = mix(uColor1, uColor2, strength + 0.2 );
            gl_FragColor = vec4(color, uAlpha);
        }
    `,
});

const LoadingBar = () => {
  const [removeOverray, setRemoveOverray] = useState(false);
  const { setLoaded } = useLoadingState((state) => state);
  const ifcLoader = useIfcLoader();
  const loadingText = document.getElementById("loadingText");
  const loadingBar = document.getElementById("loadingBar");
  const barContainer = document.getElementById("barContainer");

  const handleLoading = () => {
    setLoaded(true);
    if (loadingText && loadingBar && barContainer) {
      loadingText.innerHTML = "Go to Model";
      loadingText.style.cursor = "pointer";
      loadingText.addEventListener("click", () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 1, value: 0 });
        barContainer.style.display = "none";
        setTimeout(() => {
          setRemoveOverray(true);
        }, 500);
      });
    }
  };

  ifcLoader.ifcManager.setOnProgress((event: ParserProgress) => {
    const ratio = event.loaded / event.total;
    loadingBar!.style.transform = `scaleX(${ratio})`;
    ratio === 1 && handleLoading();
  });

  return !removeOverray ? (
    <mesh
      geometry={overlayGeometry}
      material={overlayMaterial}
      position={[0, 0, 10]}
      name="overray"
      dispose={null}
    />
  ) : null;
};

export default LoadingBar;
