import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function init(img_tex: HTMLImageElement) {
  window.THREE = THREE;
  var models: any = {};
  var plantRadius = 20;
  var canvas_height = window.innerHeight;
  var canvas_width = window.innerWidth;

  //Workaround for Texture
  //Codepen doesn't allow cross-origin
  //so we have to load it in the html
  //and get by the id

  // texture = new THREE.Texture(map);

  //__________________________________________ Helper Functions

  function randNum(min: number, max: number, bool: boolean) {
    // this will get a number between min and max;
    var num = Math.floor(Math.random() * max) + min;
    if (bool || typeof bool == "undefined") {
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }
    return num;
  }

  // Check of point is in radius
  function pointInCircle(point: THREE.Vector3, target: THREE.Vector3, radius: number) {
    var distsq = (point.x - target.x) * (point.x - target.x) + (point.y - target.y) * (point.y - target.y) + (point.z - target.z) * (point.z - target.z);
    // returns bool , distance to target origin
    return [distsq <= radius * radius * radius, distsq];
  }

  // Get Random Point in Circle
  function calculatePointInCircle(r: number) {
    const x = Math.random() * 2 * r - r;
    const zlim = Math.sqrt(r * r - x * x);
    const z = Math.random() * 2 * zlim - zlim;
    return [x, z];
  }
  //__________________________________________ Renderer Setup

  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    // @ts-ignore
    transparent: true,
    antialias: true,
  });

  renderer.setSize(canvas_width, canvas_height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  //_____________________ Create Scene

  var scene = new THREE.Scene();
  //______________________ Camera
  var camera = new THREE.PerspectiveCamera(55, canvas_width / canvas_height, 0.1, 1000);
  camera.position.set(-10, 2, 22);
  camera.lookAt(new THREE.Vector3(0, 50, 0));
  scene.add(camera);

  //______________________ Camera Helper for rotation
  var helperGeo = new THREE.BoxGeometry(1, 1, 1);
  var cam_helper = new THREE.Mesh(helperGeo);
  cam_helper.visible = false;

  scene.add(cam_helper);
  cam_helper.add(camera);

  //____________________ Resizer

  window.onresize = function () {
    canvas_height = window.innerHeight;
    canvas_width = window.innerWidth;
    camera.aspect = canvas_width / canvas_height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas_width, canvas_height);
  };
  //____________________ Controls

  // const controls = new OrbitControls(camera);
  // // @ts-ignore
  // controls.damping = 0.2;
  // controls.minPolarAngle = (73 * Math.PI) / 180;
  // controls.maxPolarAngle = (85 * Math.PI) / 180;
  // controls.minDistance = 15;
  // controls.maxDistance = 25;

  //______________________ Lights

  //____ Ambient
  var ambient = new THREE.AmbientLight(0xaaaaaa, 1);
  scene.add(ambient);

  //____ spot
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 500, 100);
  spotLight.intensity = 2;
  scene.add(spotLight);

  //____________________ Load Models

  var loader = new THREE.ObjectLoader();
  var texture_loader = new THREE.TextureLoader();
  var base_url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/61062/";

  // Different Plant Models
  var plants = ["plant_1", "plant_2", "plant_3", "plant_4", "plant_5", "plant_6", "plant_7", "plant_8", "gras", "dandelion", "flower_1", "flower_2"];

  //_________ Create Plants if image texture is complete
  img_tex.onload = function () {
    createPlants(new THREE.Texture(this as any));
  };

  // Plant Creator
  // Setup texture
  // and load Models
  function createPlants(tex: THREE.Texture) {
    //reduce flickering
    tex.minFilter = tex.magFilter = THREE.LinearMipMapNearestFilter;
    tex.needsUpdate = true;

    var material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
      shininess: 0,
      map: tex,
      bumpMap: tex,
      bumpScale: -0.05,
      transparent: true,
      depthTest: true,
      depthWrite: true,
      alphaTest: 0.25,
    });

    //load individual plant
    function loadPlant(id: number, name: string, url: string) {
      var ID = id;
      var name = name;
      loader.load(url, function (geometry: any) {
        var plant = new THREE.Mesh(geometry, material);
        models[name] = plant;
        models[name].id = ID;

        creator(name);
      });
    }
    //load each Plant in Array plants
    plants.forEach(function (p, index) {
      loadPlant(index, p, base_url + p + ".json");
    });
  }

  // Setup the count for each plant
  // default is 5
  function creator(name: string) {
    switch (name) {
      case "gras":
        createRandomObject(700, name, plantRadius);
        break;
      case "flower_1":
        createRandomObject(200, name, plantRadius);
        break;
      case "flower_2":
        createRandomObject(200, name, plantRadius);
        break;
      default:
        createRandomObject(5, name, plantRadius);
        break;
    }
  }

  // Create Bunch of plant objects and add it to a group
  function createRandomObject(count: number, name: string, r: number) {
    var group = new THREE.Object3D();
    for (var g = 0; g < count; g++) {
      var p = calculatePointInCircle(r);
      group.children[g] = models[name].clone();
      group.children[g].position.x = p[0];
      group.children[g].position.z = p[1];
      group.children[g].rotation.y = (randNum(0, 360, true) * Math.PI) / 180;
      var scaler = randNum(0.92, 1, false);
      group.children[g].scale.set(scaler, scaler, scaler);
    }
    scene.add(group);
    return group;
  }

  // Ground + surrounding
  var planeMat = new THREE.MeshPhongMaterial({
    color: 0x455029,
    specular: 0x000000,
    shininess: 0,
    side: THREE.DoubleSide,
  });

  var radius = 22;
  var segments = 32;
  var circleGeometry = new THREE.RingGeometry(0, radius, segments, segments, 0, Math.PI * 2);

  // Ground
  var ground = new THREE.Mesh(circleGeometry, planeMat);
  ground.rotation.x = (90 * Math.PI) / 180;
  scene.add(ground);
  var boundMat = new THREE.MeshPhongMaterial({
    color: 0x111111,
    specular: 0x000000,
    shininess: 0,
    side: THREE.DoubleSide,
    flatShading: true,
    // shading: THREE.FlatShading,
  });

  var boundGeometry = new THREE.TorusGeometry(21.5, 1, 6, 180);
  var bound = new THREE.Mesh(boundGeometry, boundMat);
  bound.rotation.x = (90 * Math.PI) / 180;
  scene.add(bound);

  //____________________________ Render
  function render() {
    animation();
    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  //___________________________ on each frame

  function animation() {
    cam_helper.rotation.y += 0.0005;
  }

  //___________________________ kickoff
  render();
}
