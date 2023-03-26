import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import init from "./three";
import { GLTFResult, PackGltf, PortalGltf } from "./@types/gltf";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<HTMLImageElement>(null);
  const { nodes: landscapeNodes } = useGLTF("/models/landscape.glb") as GLTFResult;
  const { nodes: packNodes } = useGLTF("/models/pack.glb") as PackGltf;
  const { scene: portalNodes } = useGLTF("/models/portal.glb") as PortalGltf;

  useEffect(() => {
    if (!window.THREE && mapRef.current && canvasRef.current && landscapeNodes && packNodes && portalNodes) {
      init({ canvas: canvasRef.current, packNodes, portalNodes });
    }
  }, [landscapeNodes, packNodes]);

  return (
    <div id="App">
      <canvas id="three" ref={canvasRef}></canvas>
      <img style={{ display: "none" }} src="/textures/map.png" crossOrigin="anonymous" ref={mapRef} />
      {/* <Canvas id="three" style={{ height: '100vh' }}>
        <OrbitControls
          makeDefault
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI * 0.5}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />
        <Grass />
      </Canvas> */}
    </div>
  );
}

export default App;
