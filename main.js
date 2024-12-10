import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x111);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(6, 8, 14);

orbit.update();

const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const texture = new THREE.TextureLoader().load(
  "/Poliigon_GrassPatchyGround_4585_BaseColor.jpg"
);
const metalnessMap = new THREE.TextureLoader().load(
  "/Poliigon_GrassPatchyGround_4585_Metallic.jpg"
);
const roughnessMap = new THREE.TextureLoader().load(
  "/Poliigon_GrassPatchyGround_4585_Roughness.jpg"
);
const normalMap = new THREE.TextureLoader().load(
  "/Poliigon_GrassPatchyGround_4585_Normal.png"
);

const material = new THREE.MeshStandardMaterial({
  map: texture,
  metalness: 0.5,
  roughness: 0.5,
  metalnessMap: metalnessMap,
  roughnessMap: roughnessMap,
  normalMap: normalMap,
});

const geometry = new THREE.SphereGeometry(1, 64, 64);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const sunlight = new THREE.DirectionalLight(0xffd700, 1);
sunlight.position.set(10, 10, 10);
scene.add(sunlight);

const ambientLight = new THREE.AmbientLight(0x87ceeb, 0.5);
scene.add(ambientLight);

const highlight = new THREE.PointLight(0xadff2f, 0.8, 50);
highlight.position.set(5, 5, 5);
scene.add(highlight);

function animate() {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
