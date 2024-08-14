import * as THREE from "three";

export class FanParticles {
  constructor(scene, count, radius, height, revolutions, clock) {
    this.scene = scene;
    this.count = count;
    this.radius = radius;
    this.height = height;
    this.revolutions = revolutions;
    this.clock = clock;
    this.particleGeometry = new THREE.BufferGeometry();
    this.particles = null;

    this.initParticles();
  }

  initParticles() {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = () => {
      console.log("OnProgress");
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const particleTexture = textureLoader.load("/static/textures/2.png");

    const positions = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    this.particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      color: "#5DA4C5",
    });
    particleMaterial.transparent = true;
    particleMaterial.alphaMap = particleTexture;
    particleMaterial.depthWrite = false;

    this.particles = new THREE.Points(this.particleGeometry, particleMaterial);
    this.scene.add(this.particles);
  }

  updateFan(position, direction, speed) {
    const elapsedTime = this.clock.getElapsedTime();
    const newCount = Math.max(100, Math.min(1000, Math.floor(speed / 10))); // زيادة عدد الجزيئات بناءً على السرعة

    if (newCount !== this.count) {
      this.count = newCount;
      this.particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(this.count * 3), 3)
      );
    }

    const positions = this.particleGeometry.attributes.position.array;

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const angle = elapsedTime * 0.5 + i * (Math.PI / this.count); // توزيع الجزيئات
      const spiralX = this.radius * Math.cos(angle);
      const spiralY = (Math.random() - 0.5) * this.height; // ارتفاع الجزيئات عشوائي
      const spiralZ = this.radius * Math.sin(angle);

      positions[i3] = spiralX;
      positions[i3 + 1] = spiralY;
      positions[i3 + 2] = spiralZ;
    }

    this.particleGeometry.attributes.position.needsUpdate = true;

    // تحديث موقع الجزيئات لتكون مرتبطة بالمروحة
    this.particles.position.copy(position);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    this.particles.setRotationFromQuaternion(quaternion);
  }
}

// Export the class at the end of the file
export default FanParticles;
