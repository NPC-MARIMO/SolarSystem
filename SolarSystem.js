import * as THREE from 'three';


class CelestialBody {
    constructor(name, radius, textureUrl, orbitRadius, orbitSpeed) {
        this.name = name;
        this.radius = radius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = 0;

        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        // const texture = new THREE.TextureLoader().load(textureUrl);
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(4, 4);

        const material = new THREE.MeshBasicMaterial({ color : textureUrl});
        this.mesh = new THREE.Mesh(geometry, material);

        this.orbitLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(
                new THREE.Path().absarc(0, 0, orbitRadius, 0, Math.PI * 2, true).getPoints(64)
            ),
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
        );
        this.orbitLine.rotation.x = Math.PI / 2;
    }

    update() {
        this.angle += this.orbitSpeed;
        if (this.angle >= Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
        const x = Math.cos(this.angle) * this.orbitRadius;
        const z = Math.sin(this.angle) * this.orbitRadius;
        this.mesh.position.set(x, 0, z);
    }
}

class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
        this.scene.add(body.mesh);
        this.scene.add(body.orbitLine);
    }

    update() {
        this.bodies.forEach(body => body.update());
    }
}

export { CelestialBody, SolarSystem };
