import * as THREE from "three";

export class CurrentParticles {
  constructor(scene, count, forceMagnitude, speed, height, clock, big) {
    this.scene = scene;
    this.count = count;
    this.forceMagnitude = forceMagnitude;
    this.speed = speed;
    this.height = height;
    this.clock = clock;
    this.particleGeometry = new THREE.BufferGeometry();
    this.particleMaterial = null;
    this.particles = null;
    this.big = big;

    this.initParticles();
  }

  initParticles() {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = () => {
      console.log("OnProgress");
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const particleTexture = textureLoader.load("../static/textures/waterTexture/2.png");

    const positions = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    this.particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    this.particleMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      color: "#4D70D1",
      transparent: true,
      alphaMap: particleTexture,
      depthWrite: false,
    });

    this.particles = new THREE.Points(
      this.particleGeometry,
      this.particleMaterial
    );

    // Create a group for the particles to rotate them as a unit
    this.particleGroup = new THREE.Group();
    this.particleGroup.add(this.particles);
    this.scene.add(this.particleGroup);
  }

  calculateTubeRadius() {
    if (this.big == false) {
      const flowRate = this.forceMagnitude * this.speed;
      const crossSectionalArea = flowRate / this.speed;
      const adjustedArea = crossSectionalArea * (this.height / 200);
      const radius = Math.sqrt(adjustedArea / Math.PI);
      return radius;
    } else {
      return 49;
    }
  }

  getRadius() {
    return this.calculateTubeRadius();
  }

  updateParticles(position, direction) {
    const elapsedTime = this.clock.getElapsedTime();
    const newRadius = this.calculateTubeRadius();

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const angle = elapsedTime * 0.5 + i * 0.1;
      const spiralX = newRadius * Math.cos(angle);
      const spiralY = (Math.random() - 0.5) * this.height;
      const spiralZ = newRadius * Math.sin(angle);

      this.particleGeometry.attributes.position.array[i3] = spiralX;
      this.particleGeometry.attributes.position.array[i3 + 1] = spiralY;
      this.particleGeometry.attributes.position.array[i3 + 2] = spiralZ;
    }

    this.particleGeometry.attributes.position.needsUpdate = true;

    // Position and orient the particle group
    this.particleGroup.position.copy(position);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
    this.particleGroup.setRotationFromQuaternion(quaternion);
  }
}

export default CurrentParticles;
