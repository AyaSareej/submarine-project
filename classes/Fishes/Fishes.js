import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Fish {
  constructor(scene, modelPath, position, rotation, scale) {
    this.scene = scene;
    this.modelPath = modelPath;
    this.position = position || new THREE.Vector3(0, 0, 0);
    this.rotation = rotation || new THREE.Vector3(0, 0, 0);
    this.scale = scale || new THREE.Vector3(1, 1, 1);
    this.velocity = new THREE.Vector3(
      Math.random() * 0.1,
      Math.random() * 0.1,
      Math.random() * 0.1
    );
    this.direction = new THREE.Vector3(
      Math.random(),
      Math.random(),
      Math.random()
    ).normalize();
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.model = null;
    this.mixer = null;
    this.loadModel();
  }

  loadModel() {
    this.gltfLoader.load(
      this.modelPath,
      (gltf) => {
        // console.log("Success:", gltf);
        // gltf.scene.position.copy(this.position);
        // gltf.scene.rotation.set(
        //   this.rotation.x,
        //   this.rotation.y,
        //   this.rotation.z
        // );
        // gltf.scene.scale.copy(this.scale);
        // this.model = gltf.scene;
        // this.scene.add(gltf.scene);

        // // Check if the model has animations
        // if (gltf.animations.length > 0) {
        //   this.mixer = new THREE.AnimationMixer(gltf.scene);
        //   this.mixer.clipAction(gltf.animations[0]).play();
        // }
      },
      (progress) => {
        // console.log("Progress:", progress);
      },
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );
  }

  update(deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }

    if (this.model) {
      // Update the position based on velocity and direction
      this.model.position.add(this.velocity.clone().multiplyScalar(deltaTime * 0.1));
      //console.log("Fish position:", this.model.position);

      // Randomly change direction
      if (Math.random() < 0.01) {
        this.direction = new THREE.Vector3(
          - Math.random()* 0.001,
          Math.random() * 0.0001,
          Math.random() 
        ).normalize();
        this.velocity = this.direction.multiplyScalar(1 + Math.random() * 0.1);
      }
    }
  }
}
