import * as THREE from "three";

export class UnderwaterEffect {
  constructor(scene, camera, renderer, waterHeight = 0, textureLoader) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.waterHeight = waterHeight;
    this.textureLoader = textureLoader;

    // if (!this.scene.fog) {
    //   this.scene.fog = new THREE.Fog("#545C96", 50, 70);
    // }

    this.initUnderwater();
  }

  initUnderwater() {
    //  this.underwaterFogColor = new THREE.Color(0x001e0f);
    //   this.aboveWaterFogColor = this.scene.fog.Color;

    const waterSurfaceGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterSurfaceMaterial = new THREE.MeshBasicMaterial({
      color: 0x001e0f,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    this.waterSurface = new THREE.Mesh(
      waterSurfaceGeometry,
      waterSurfaceMaterial
    );
    this.waterSurface.rotation.x = -Math.PI / 2;
    this.waterSurface.position.y = this.waterHeight;
    this.scene.add(this.waterSurface);

    // Adjust lighting
    // this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    // this.scene.add(this.ambientLight);

    // this.directionalLight = new THREE.DirectionalLight(0x406080, 1);
    // this.directionalLight.position.set(0, -1, -1).normalize();
    // this.scene.add(this.directionalLight);

    // Particles
    this.particles = null;
    this.addParticles();
  }

  addParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const positions = new Float32Array(particlesCount * 3);
    this.initialPositions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      const randomPosition = (Math.random() - 0.5) * 100;
      positions[i] = randomPosition;
      this.initialPositions[i] = randomPosition;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      sizeAttenuation: true,
      size: 0.6,
      transparent: true,
      opacity: 0.5,
      color: "#005780",
      //vertexColors: true
    });

    const particleTexture = this.textureLoader.load(
      "/static/textures/waterTexture/2.png"
    );
    particlesMaterial.transparent = true;
    particlesMaterial.alphaMap = particleTexture;
    particlesMaterial.depthWrite = false;
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  update() {
    if (this.camera.position.y < this.waterHeight) {
      // this.scene.fog.color.set(this.underwaterFogColor);
      // this.scene.fog.near = 10;
      // this.scene.fog.far = 100;
      this.waterSurface.visible = true;
      this.particles.visible = true;
    } else {
      // this.scene.fog.color.set(this.aboveWaterFogColor);
      // this.scene.fog.near = 1;
      // this.scene.fog.far = 1000;
      this.waterSurface.visible = false;
      this.particles.visible = false;
    }
    this.particles.position.y += 0.001;
  }
}
