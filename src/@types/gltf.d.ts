import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Main_Land_Low_Poly: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};
