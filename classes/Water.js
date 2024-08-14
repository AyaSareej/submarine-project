import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

export class WaterSurface {
    constructor(scene, textureLoader) {
        this.scene = scene;
        this.textureLoader = textureLoader;
        this.addWater();
    }

    addWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const waterNormals = this.textureLoader.load('/static/textures/waterTexture/waternormals.jpg', (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });

        const water = new Water(waterGeometry, {
            textureWidth: 1000,
            textureHeight: 1000,
            waterNormals: waterNormals,
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 0.05,
            fog: this.scene.fog !== undefined,
        });

        water.rotation.x = -Math.PI / 2;
        this.scene.add(water);

        const clock = new THREE.Clock();
        const animateWater = () => {
            const deltaTime = clock.getDelta();
            water.material.uniforms['time'].value += deltaTime * 0.11;
            requestAnimationFrame(animateWater);
        };
        animateWater();
    }
}
