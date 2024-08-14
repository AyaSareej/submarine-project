import * as THREE from 'three';

export class EnvironmentMap {
    constructor(scene, gui) {
        this.scene = scene;
        this.gui = gui;
        this.cubeTextureLoader = new THREE.CubeTextureLoader();
        this.debugObject = { envMapIntensity: 0.7 };
        this.loadEnvironmentMap();
    }

    loadEnvironmentMap() {
        const environmentMapTexture = this.cubeTextureLoader.load([
            '/static/textures/environmentMaps/clouds1_west.bmp',
            '/static/textures/environmentMaps/clouds1_east.bmp',
            '/static/textures/environmentMaps/clouds1_up.bmp',
            '/static/textures/environmentMaps/clouds1_down.bmp',
            '/static/textures/environmentMaps/clouds1_south.bmp',
            '/static/textures/environmentMaps/clouds1_north.bmp',
        ]);
        environmentMapTexture.encoding = THREE.sRGBEncoding;
        this.scene.background = environmentMapTexture;

        this.gui.add(this.debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(() => {
            this.updateAllMaterials(environmentMapTexture, this.debugObject.envMapIntensity);
        });

        // Initial update of all materials
        this.updateAllMaterials(environmentMapTexture, this.debugObject.envMapIntensity);
    }

    updateAllMaterials(envMapTexture, envMapIntensity) {
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.envMap = envMapTexture;
                child.material.envMapIntensity = envMapIntensity;
                child.material.needsUpdate = true;
            }
        });
    }
}
