import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Main_Land_Low_Poly: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export type PackGltf = GLTF & {
  nodes: {
    Bark01_1_Bark01_SHD_0: THREE.Mesh;
    Branch01_1_Branch01_SHD_0: THREE.Mesh;
    Flower01_1_Flower01_su_SHD_0: THREE.Mesh;
    Main_Land_Low_Poly: THREE.Mesh;
    Mountain01: THREE.Mesh;
    Mountain2: THREE.Mesh;
    Mountain5: THREE.Mesh;
    Mountain2001: THREE.Mesh;
    Hill02: THREE.Mesh;
    Hill03: THREE.Mesh;
    Hill04: THREE.Mesh;
    Hill07: THREE.Mesh;
    Mesh002: THREE.Mesh;
    Mesh002_1: THREE.Mesh;
  };
  materials: {
    Bark01_SHD: THREE.MeshStandardMaterial;
    Branch01_SHD: THREE.MeshStandardMaterial;
    Flower01_su_SHD: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material #88.002"]: THREE.MeshStandardMaterial;
    ["Material #2146929578.001"]: THREE.MeshStandardMaterial;
    MT_PM_V59_Myrica_rubra_01_Leaf_01_F: THREE.MeshStandardMaterial;
    MT_PM_V59_Myrica_rubra_01_Trunk_01: THREE.MeshStandardMaterial;
  };
};
