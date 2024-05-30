import * as THREE from 'three';

export class Lights {
    constructor(scene, gui) {
        this.scene = scene;
        this.gui = gui;
        this.addAmbientLight();
        this.addMoonLight();
    }

    addAmbientLight() {
        const ambientLight = new THREE.AmbientLight('#b9d5ff', 1);
        this.gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
        this.scene.add(ambientLight);
    }

    addMoonLight() {
        const moonLight = new THREE.DirectionalLight('#b9d5ff', 10);
        moonLight.position.set(4, 5, -2);
        this.gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('moonLight');
        this.gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
        this.gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
        this.gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
        this.scene.add(moonLight);
    }
}
