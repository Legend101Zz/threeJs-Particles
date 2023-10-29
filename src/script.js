import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//GALAXY
// Create a buffer geometry for the particles
const particlesGeometry = new THREE.BufferGeometry();

const particleCount = 100000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const particleColor = new THREE.Color(0xffa500); // Fire color

const spiral = (t) => {
  const r = t; // Radius increases linearly with time
  const theta = 50 * t; // Angle increases linearly with time
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  const z = (Math.random() - 0.5) * 2;
  return new THREE.Vector3(x, y, z);
};

for (let i = 0; i < particleCount; i++) {
  const t = i / (particleCount - 1); // Linearly distribute points along the spiral
  const point = spiral(t);

  positions[i * 3] = point.x;
  positions[i * 3 + 1] = point.y;
  positions[i * 3 + 2] = point.z;

  colors[i * 3] = particleColor.r;
  colors[i * 3 + 1] = particleColor.g;
  colors[i * 3 + 2] = particleColor.b;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial2 = new THREE.PointsMaterial({
  size: 0.005,
  vertexColors: THREE.VertexColors,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial2);
scene.add(particles);

// Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// const pointsGeometry = new THREE.BufferGeometry();
// const particlesCount = 5000;

// const posArray = new Float32Array(particlesCount * 3);

// for (let i = 0; i < particlesCount * 3; i++) {
//   posArray[i] = (Math.random() - 0.5) * Math.random() * 5;
// }

// pointsGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

// // Materials

// const material = new THREE.PointsMaterial({
//   size: 0.009,
//   color: "red",
// });

// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.005,
// });

// // Mesh
// const sphere = new THREE.Points(geometry, material);
// const particlesMesh = new THREE.Points(pointsGeometry, particlesMaterial);
//scene.add(sphere, particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);

//mouse

function animateParticles(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   sphere.rotation.y = 0.5 * elapsedTime;
  //   particlesMesh.rotation.x = -mouseY * elapsedTime * 0.00008;
  //   particlesMesh.rotation.y = -mouseX * elapsedTime * 0.00008;

  particles.rotation.z += -mouseY * elapsedTime * 0.00008; // Rotate the galaxy
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
