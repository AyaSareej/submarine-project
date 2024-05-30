import '../style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { Submarine } from './classes/Submarine.js';
import { EnvironmentMap } from './classes/EnvironmentMap.js';
import { Lights } from './classes/Lights.js';
import { WaterSurface } from './classes/Water.js';
import { UnderwaterEffect } from './classes/UnderwaterEffect.js';
import { KeyboardControls } from './classes/KeyboardControls.js';


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// GUI
const gui = new dat.GUI({ closed: true });

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(2, 3, 25);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Create a texture loader
const textureLoader = new THREE.TextureLoader();


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
//renderer.outputEncoding = THREE.sRGBEncoding;
//renderer.toneMapping = THREE.ACESFilmicToneMapping;

// Handle Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Initialize Classes
const keyboardControls = new KeyboardControls();
const environmentMap = new EnvironmentMap(scene, gui);
const lights = new Lights(scene, gui);
const water = new WaterSurface(scene, new THREE.TextureLoader());
const submarine = new Submarine(scene, gui, environmentMap.updateAllMaterials.bind(environmentMap), keyboardControls);
const underwaterEffect = new UnderwaterEffect(scene, camera, renderer, 0, textureLoader);

// Render Loop
const tick = () => {
    controls.update();
    submarine.update();
    underwaterEffect.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();
