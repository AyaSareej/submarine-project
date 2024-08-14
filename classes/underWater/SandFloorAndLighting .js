import * as THREE from "three";
import * as dat from "dat.gui";
// import { Coral } from "./corals/Coral.js";
import { EnvironmentMap } from "../EnvironmentMap.js";

class SandFloorAndLighting {
  constructor(scene, gui) {
    this.scene = scene;
    this.gui = gui;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.group2 = new THREE.Group();
    this.scene.add(this.group2);

    this.setupFog();
    this.setupTextures();
    this.setupFloor();
    this.setupLighting();
    this.setupCorals();
  }

  setupFog() {
    // const fog = new THREE.Fog("#545C96", 50, 70);
    // this.scene.fog = fog;
  }

  setupTextures() {
    this.textureLoader = new THREE.TextureLoader();

    this.sandColorTexture = this.textureLoader.load(
      "/static/textures/sand/Sand_005_baseColor.jpg"
    );
    this.sandAmbientTexture = this.textureLoader.load(
      "/static/textures/sand/Sand_005_ambientOcclusion.jpg"
    );
    this.sandNormalTexture = this.textureLoader.load(
      "/static/textures/sand/Sand_005_normal.jpg"
    );
    this.sandRoughnessTexture = this.textureLoader.load(
      "/static/textures/sand/Sand_005_roughness.jpg"
    );
    this.sandHeightTexture = this.textureLoader.load(
      "/static/textures/sand/Sand_005_height.png"
    );
    this.sandHeightTexture.wrapS = THREE.RepeatWrapping;
    this.sandHeightTexture.wrapT = THREE.RepeatWrapping;
    this.sandColorTexture.wrapS = THREE.RepeatWrapping;
    this.sandAmbientTexture.wrapS = THREE.RepeatWrapping;
    this.sandNormalTexture.wrapS = THREE.RepeatWrapping;
    this.sandRoughnessTexture.wrapS = THREE.RepeatWrapping;
    this.sandColorTexture.wrapT = THREE.RepeatWrapping;
    this.sandAmbientTexture.wrapT = THREE.RepeatWrapping;
    this.sandNormalTexture.wrapT = THREE.RepeatWrapping;
    this.sandRoughnessTexture.wrapT = THREE.RepeatWrapping;

    this.sandColorTexture.repeat.set(40, 40);
    this.sandAmbientTexture.repeat.set(40, 40);
    this.sandNormalTexture.repeat.set(40, 40);
    this.sandRoughnessTexture.repeat.set(40, 40);
    this.sandHeightTexture.repeat.set(40, 40);
  }

  setupFloor() {
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500, 380, 380),
      new THREE.MeshStandardMaterial({
        map: this.sandColorTexture,
        aoMap: this.sandAmbientTexture,
        normalMap: this.sandNormalTexture,
        roughnessMap: this.sandRoughnessTexture,
        displacementMap: this.sandHeightTexture,
      })
    );
    this.floor.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        this.floor.geometry.attributes.uv.array,
        2
      )
    );
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.position.y = 0;
    this.group.add(this.floor);
  }

  setupLighting() {
    // this.ambientLight = new THREE.AmbientLight("#b9d5ff", 0.5);
    // this.gui.add(this.ambientLight, "intensity").min(0).max(1).step(0.001);
    // this.scene.add(this.ambientLight);
    // this.moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
    // this.moonLight.position.set(4, 5, -2);
    // this.gui
    //   .add(this.moonLight, "intensity")
    //   .min(0)
    //   .max(1)
    //   .step(0.001)
    //   .name("moonLight");
    // this.gui.add(this.moonLight.position, "x").min(-5).max(5).step(0.001);
    // this.gui.add(this.moonLight.position, "y").min(-5).max(5).step(0.001);
    // this.gui.add(this.moonLight.position, "z").min(-5).max(5).step(0.001);
    // this.scene.add(this.moonLight);
  }

  setupCorals() {
    this.environmentMap = new EnvironmentMap(this.scene, this.gui);
  }

  setPosition(x, y, z) {
    this.group.position.set(x, y, z);
  }

  setPosition2(x, y, z) {
    this.group2.position.set(x, y, z);
  }
}

export { SandFloorAndLighting };
