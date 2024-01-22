// main.js
import * as THREE from 'three';
import Planet from './planet.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';


// Create a scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x22222); 

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create an orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Create a composer
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Create a bloom pass
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.21;
bloomPass.strength = 1;
bloomPass.radius = 0.55;
composer.addPass(bloomPass);


// Create a sphere for the sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunTextureLoader = new THREE.TextureLoader();
const sunTexture = sunTextureLoader.load('./image/soleil.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


/*
Soleil : Environ 1,392,684 km
Jupiter: Environ 139,820 km
Saturne: Environ 116,460 km
Uranus: Environ 50,724 km
Neptune: Environ 49,244 km 
Terre: Environ 12,742 km
Vénus: Environ 12,104 km
Mars: Environ 6,779 km
Mercure: Environ 4,880 km
*/

const echelleTaille = 1392684 / 2;
const echelleDistance = 50; // Ajustez cette valeur pour mettre à l'échelle les distances orbitales

// Mercure
const mercure = new Planet('Mercure', 4880 / echelleTaille, 0.06, 2 / echelleDistance, 'image/mercure.jpg');
const mercureSphere = mercure.creerLaSphere();
scene.add(mercureSphere);

// Venus
const venus = new Planet('Venus', 12104 / echelleTaille, 0.06, 4 / echelleDistance, 'image/venus.jpg');
const venusSphere = venus.creerLaSphere();
scene.add(venusSphere);

// Terre
const terre = new Planet('Terre', 12742 / echelleTaille, 0.12, 6 / echelleDistance, 'image/terre.jpg');
const terreSphere = terre.creerLaSphere();
scene.add(terreSphere);

// Mars
const mars = new Planet('Mars', 6779 / echelleTaille, 0.06, 8 / echelleDistance, 'image/mars.jpg');
const marsSphere = mars.creerLaSphere();
scene.add(marsSphere);

// Jupiter
const jupiter = new Planet('Jupiter', 139820 / echelleTaille, 0.06, 12 / echelleDistance, 'image/jupiter.jpg');
const jupiterSphere = jupiter.creerLaSphere();
scene.add(jupiterSphere);

// Saturne
const saturne = new Planet('Saturne', 116460 / echelleTaille, 0.06, 16 / echelleDistance, 'image/saturn.jpg');
const saturneSphere = saturne.creerLaSphere();
scene.add(saturneSphere);

// Anneaux de Saturne
// Créer la géométrie de l'anneau avec un rayon intérieur réduit
const ringGeometry = new THREE.RingGeometry(0.2, 0.3, 32); // Vous pouvez ajuster le rayon intérieur ici
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
const saturneRings = new THREE.Mesh(ringGeometry, ringMaterial);
saturneRings.rotation.x = Math.PI / 2; // Incliner les anneaux pour qu'ils soient perpendiculaires à l'axe z
saturneSphere.add(saturneRings); // Ajouter les anneaux à la sphère de Saturne

// Uranus
const uranus = new Planet('Uranus', 50724 / echelleTaille, 0.06, 20 / echelleDistance, 'image/uranus.jpg');
const uranusSphere = uranus.creerLaSphere();
scene.add(uranusSphere);

// Neptune
const neptune = new Planet('Neptune', 49244 / echelleTaille, 0.06, 24 / echelleDistance, 'image/neptune.jpg');
const neptuneSphere = neptune.creerLaSphere();
scene.add(neptuneSphere);

// Set up a parent-child relationship for orbiting
sun.add(mercureSphere);
sun.add(venusSphere);
sun.add(terreSphere);
sun.add(marsSphere);
sun.add(jupiterSphere);
sun.add(saturneSphere);
sun.add(uranusSphere);
sun.add(neptuneSphere);

// Animation function
const animate = () => {
    requestAnimationFrame(animate);

    // Update the orbital speeds for each planet
    const mercureOrbitalSpeed = 0.02;
    const venusOrbitalSpeed = 0.015;
    const terreOrbitalSpeed = 0.01;
    const marsOrbitalSpeed = 0.008;
    const jupiterOrbitalSpeed = 0.005;
    const saturneOrbitalSpeed = 0.003;
    const uranusOrbitalSpeed = 0.002;
    const neptuneOrbitalSpeed = 0.001;

    // 1 = 1UA (unite astronomique)

    // Move each planet along its orbit
    mercureSphere.position.x = 2.5 * Math.cos(mercureOrbitalSpeed * Date.now() * 0.01);
    mercureSphere.position.z = 2.5 * Math.sin(mercureOrbitalSpeed * Date.now() * 0.01);

    venusSphere.position.x = 3 * Math.cos(venusOrbitalSpeed * Date.now() * 0.01);
    venusSphere.position.z = 3 * Math.sin(venusOrbitalSpeed * Date.now() * 0.01);

    terreSphere.position.x = 3.5 * Math.cos(terreOrbitalSpeed * Date.now() * 0.01);
    terreSphere.position.z = 3.5 * Math.sin(terreOrbitalSpeed * Date.now() * 0.01);

    marsSphere.position.x = 4 * Math.cos(marsOrbitalSpeed * Date.now() * 0.01);
    marsSphere.position.z = 4 * Math.sin(marsOrbitalSpeed * Date.now() * 0.01);

    jupiterSphere.position.x = 4.5 * Math.cos(jupiterOrbitalSpeed * Date.now() * 0.01);
    jupiterSphere.position.z = 4.5 * Math.sin(jupiterOrbitalSpeed * Date.now() * 0.01);

    saturneSphere.position.x = 5 * Math.cos(saturneOrbitalSpeed * Date.now() * 0.01);
    saturneSphere.position.z = 5* Math.sin(saturneOrbitalSpeed * Date.now() * 0.01);

    uranusSphere.position.x = 5.5 * Math.cos(uranusOrbitalSpeed * Date.now() * 0.01);
    uranusSphere.position.z = 5.5 * Math.sin(uranusOrbitalSpeed * Date.now() * 0.01);

    neptuneSphere.position.x = 6 * Math.cos(neptuneOrbitalSpeed * Date.now() * 0.01);
    neptuneSphere.position.z = 6 * Math.sin(neptuneOrbitalSpeed * Date.now() * 0.01);

    // Render the scene
    composer.render();
    // renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    // renderer.setSize(newWidth, newHeight);
    composer.setSize(newWidth, newHeight);
});

// Commencez la boucle d'animation
animate();