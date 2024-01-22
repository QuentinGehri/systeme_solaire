// planet.js
import * as THREE from 'three';

export default class Planet {
    constructor(name, radius, weight, height, image) {
        this.name = name;
        this.radius = radius;
        this.weight = weight;
        this.height = height;
        this.image = image;
    }

    creerLaSphere() {
        /*const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.image);
        // Créer un matériau de base avec la texture
        const baseMaterial = new THREE.MeshStandardMaterial({ map: texture, color: 0xFFFFFF });
        // Créer le mesh en utilisant le matériau de base
        const sphere = new THREE.Mesh(geometry, baseMaterial);
        return sphere;*/
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.image);
        const material = new THREE.MeshBasicMaterial({ map: texture});
        const sphere = new THREE.Mesh(geometry, material);
        return sphere;
    }
}
