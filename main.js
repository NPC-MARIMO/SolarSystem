import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CelestialBody, SolarSystem } from './SolarSystem.js';

let scene, camera, renderer, controls;
let solarSystem;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 55;
    camera.position.y = 10;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2);
    scene.add(pointLight);

    // Add controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Create solar system
    solarSystem = new SolarSystem(scene);

    // Add celestial bodies
    solarSystem.addBody(new CelestialBody('Sun', 5, 'orange', 0, 0));
    solarSystem.addBody(new CelestialBody('Mercury', 0.5, 'red', 10, 0.02));
    solarSystem.addBody(new CelestialBody('Venus', 0.8, 'blue', 15, 0.017));
    solarSystem.addBody(new CelestialBody('Earth', 1, 'brown', 20, 0.014));
    solarSystem.addBody(new CelestialBody('Mars', 0.7, 'violet', 25, 0.012));
    solarSystem.addBody(new CelestialBody('Jupiter', 2, 'green', 30, 0.009));
    solarSystem.addBody(new CelestialBody('Saturn', 1.8, 'skyblue', 35, 0.006));
    solarSystem.addBody(new CelestialBody('Uranus', 1.5, 'rebeccapurple', 40, 0.004));
    solarSystem.addBody(new CelestialBody('Neptune', 1.3, 'lightgreen', 45, 0.002));

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    solarSystem.update();
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
