import * as THREE from "three";
import { Fish } from "./Fishes";

class UnderwaterFishes {
  constructor(scene) {
    this.scene = scene;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.group2 = new THREE.Group();
    this.scene.add(this.group2);

    this.fishInstances = [];

    this.setupFishes();
  }

  setupFishes() {
    const fishConfigs = [
      {
        modelPath: "/static/Fishes/manta_ray_birostris_animated/scene.gltf",
        position: new THREE.Vector3(0, -50, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.3, 0.3, 0.3),
        group: this.group,
        repeat: 7,
      },
      {
        modelPath:
          "/static/Fishes/animated_swimming_tropical_fish_school_loop/scene.gltf",
        position: new THREE.Vector3(0, -170, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.9, 0.9, 0.9),
        group: this.group,
        repeat: 15,
      },
      {
        modelPath: "/static/Fishes/school_of_herring/scene.gltf",
        position: new THREE.Vector3(0, -170, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(3, 3, 3),
        group: this.group,
        repeat: 15,
      },
      {
        modelPath: "/static/Fishes/shark/scene.gltf",
        position: new THREE.Vector3(0, -25, 0),
        rotation: new THREE.Vector3(0, 1.5, 0),
        scale: new THREE.Vector3(0.3, 0.3, 0.3),
        group: this.group,
        repeat: 10,
      },
      {
        //small yellow
        modelPath: "/static/Fishes/angelfish/scene.gltf",
        position: new THREE.Vector3(0, -170, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        group: this.group,
        repeat: 15,
      },
      {
        ////!
        modelPath: "/static/Fishes/glow_whale/scene.gltf",
        position: new THREE.Vector3(0, -50, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(15, 15, 15),
        group: this.group,
        repeat: 3,
      },
      {
        modelPath: "/static/Fishes/emperor_angelfish/scene.gltf",
        position: new THREE.Vector3(0, -175, 0),
        rotation: new THREE.Vector3(0, -1.5, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        group: this.group,
        repeat: 8,
      },
      {
        modelPath: "/static/Fishes/patsy_the_turtle/scene.gltf",
        position: new THREE.Vector3(0, -100, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.4, 0.4, 0.4),
        group: this.group,
        repeat: 5,
      },
      {
        modelPath: "/static/Fishes/tuna_fish/scene.gltf",
        position: new THREE.Vector3(0, -75, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.2, 0.2, 0.2),
        group: this.group,
        repeat: 5,
      },
      {
        modelPath: "/static/Fishes/freshwater-AngelFish/angelFsh.gltf",
        position: new THREE.Vector3(0, -120, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.05, 0.05, 0.05),
        group: this.group,
        repeat: 8,
      },
      {
        modelPath: "/static/Fishes/ps1low_poly_great_white_shark/scene.gltf",
        position: new THREE.Vector3(0, -10, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.4, 0.4, 0.4),
        group: this.group,
        repeat: 15,
      },
      {
        modelPath: "/static/Fishes/myllokunmingia_fengjiaoa/scene.gltf",
        position: new THREE.Vector3(0, -100, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.3, 0.3, 0.3),
        group: this.group,
        repeat: 5,
      },
    ];

    fishConfigs.forEach((config) => {
      if (config.repeat) {
        for (let i = 0; i < config.repeat; i++) {
          const position = getRandomPosition(config.position.y);

          const fish = new Fish(
            config.group,
            config.modelPath,
            position,
            config.rotation,
            config.scale
          );
          this.fishInstances.push(fish);
        }
      } else {
        const fish = new Fish(
          config.group,
          config.modelPath,
          config.position,
          config.rotation,
          config.scale
        );
        this.fishInstances.push(fish);
      }
    });
  }

  update(elapsedTime) {
    this.fishInstances.forEach((fish) => {
      fish.update(elapsedTime);
    });
  }
}

function getRandomPosition(y) {
  const x = Math.random() * 220 - 110; // Random x between -210 and 210
  const z = Math.random() * 220 - 110; // Random z between -210 and 210
  return new THREE.Vector3(x, y, z);
}

export { UnderwaterFishes };
// const x = Math.random() * 420 - 210; // Random x between -210 and 210
// const z = Math.random() * 420 - 210; // Random z between -210 and 210