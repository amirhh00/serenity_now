import { Canvas, useFrame } from '@react-three/fiber';
import { Pathtracer } from '@react-three/gpu-pathtracer';
import { Environment, OrbitControls } from '@react-three/drei';
import Grass from './Grass';

function App() {
  return (
    <div className="App">
      <Canvas id="three" style={{ height: '100vh' }}>
        <Pathtracer>
          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI * 0.5}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="city" />
          <Grass />
        </Pathtracer>
      </Canvas>
    </div>
  );
}

export default App;
