import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CelestialBody, SolarSystem } from './SolarSystem.js';
import { texture } from 'three/webgpu';

let scene, camera, renderer, controls;
let solarSystem;

let CelestialBodies = [
  {
    name : 'Sun',
    radius : 5,
    textureUrl : 'orange',
    orbitRadius : 0,
    orbitSpeed : 0
  },
  {
    name : 'Mercury',
    radius : 0.8,
    textureUrl : 'red' , 
    orbitRadius : 10 , 
    orbitSpeed : 0.02
  },
  {
    name : 'Venus',
    radius : 1,
    textureUrl : 'green' , 
    orbitRadius : 14.5 , 
    orbitSpeed : 0.017
  },
  {
    name : 'Earth',
    radius : 1.2,
    textureUrl : 'blue' , 
    orbitRadius : 19 , 
    orbitSpeed : 0.015
  },
  {
    name : 'Mars',
    radius : 0.9,
    textureUrl : 'orangered' , 
    orbitRadius : 23.5 , 
    orbitSpeed : 0.013
  },
  {
    name : 'Jupiter',
    radius : 1.7,
    textureUrl : 'violet' , 
    orbitRadius : 28   , 
    orbitSpeed : 0.01
  },
  {
    name : 'Saturn',
    radius : 1.4,
    textureUrl : 'yellow' , 
    orbitRadius : 32.5 , 
    orbitSpeed : 0.007
  },
  {
    name : 'Uranus',
    radius : 1.5,
    textureUrl : 'seagreen' , 
    orbitRadius : 37 , 
    orbitSpeed : 0.004
  },
  {
    name : 'Neptune',
    radius : 1.2,
    textureUrl : 'rebeccapurple' , 
    orbitRadius : 41.5 , 
    orbitSpeed : 0.003
  },
]

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
    CelestialBodies.forEach((planet) => {
      console.log(planet);
      solarSystem.addBody(new CelestialBody(planet.name , planet.radius , planet.textureUrl , planet.orbitRadius , planet.orbitSpeed))
    })

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
