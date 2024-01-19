// main.js
import * as THREE from 'three';
import Planet from './planet.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere for the sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunTextureLoader = new THREE.TextureLoader();
const sunTexture = sunTextureLoader.load('./image/soleil.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
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

const echelleTaille = 1392684 / 3;
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

    // Move each planet along its orbit
    mercureSphere.position.x = 1.5 * Math.cos(mercureOrbitalSpeed * Date.now() * 0.01);
    mercureSphere.position.z = 1.5 * Math.sin(mercureOrbitalSpeed * Date.now() * 0.01);

    venusSphere.position.x = 2 * Math.cos(venusOrbitalSpeed * Date.now() * 0.01);
    venusSphere.position.z = 2 * Math.sin(venusOrbitalSpeed * Date.now() * 0.01);

    terreSphere.position.x = 2.5 * Math.cos(terreOrbitalSpeed * Date.now() * 0.01);
    terreSphere.position.z = 2.5 * Math.sin(terreOrbitalSpeed * Date.now() * 0.01);

    marsSphere.position.x = 3 * Math.cos(marsOrbitalSpeed * Date.now() * 0.01);
    marsSphere.position.z = 3 * Math.sin(marsOrbitalSpeed * Date.now() * 0.01);

    jupiterSphere.position.x = 3.5 * Math.cos(jupiterOrbitalSpeed * Date.now() * 0.01);
    jupiterSphere.position.z = 3.5 * Math.sin(jupiterOrbitalSpeed * Date.now() * 0.01);

    saturneSphere.position.x = 4 * Math.cos(saturneOrbitalSpeed * Date.now() * 0.01);
    saturneSphere.position.z = 4 * Math.sin(saturneOrbitalSpeed * Date.now() * 0.01);

    uranusSphere.position.x = 4.5 * Math.cos(uranusOrbitalSpeed * Date.now() * 0.01);
    uranusSphere.position.z = 4.5 * Math.sin(uranusOrbitalSpeed * Date.now() * 0.01);

    neptuneSphere.position.x = 5 * Math.cos(neptuneOrbitalSpeed * Date.now() * 0.01);
    neptuneSphere.position.z = 5 * Math.sin(neptuneOrbitalSpeed * Date.now() * 0.01);

    // Render the scene
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Commencez la boucle d'animation
animate();
