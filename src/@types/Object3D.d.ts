// import { BaseEvent, EventDispatcher } from "three";

// declare module "three/src/core/Object3D" {
//   interface Object3D<E extends BaseEvent> extends EventDispatcher<E> {
//     initScaleX: number;
//     initColor: THREE.Color;
//     isMesh?: boolean;
//     material: THREE.MeshBasicMaterial;
//     isShrinked?: boolean;
//     geometry?: BufferGeometry;
//   }
// }

interface Window {
  camera?: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer | undefined;
  ThreeCTX: any;
  THREE: any;
  dev?: boolean;
}
