import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import init from "./three";
import { GLTFResult } from "./@types/gltf";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { nodes, materials } = useGLTF("/models/landscape.glb") as GLTFResult;
  useEffect(() => {
    if (!window.THREE && canvas.current && nodes) {
      init(canvas.current);
    }
  }, [nodes]);

  return (
    <div className="App">
      <canvas ref={canvas}></canvas>
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
