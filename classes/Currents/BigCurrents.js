import * as THREE from "three";
import { CurrentParticles } from "../CurrentParticles"; // Adjust the import path as necessary

export class BigCurrent {
  constructor(scene, gui, clock, position, direction) {
    this.scene = scene;
    this.clock = clock;
    this.position = position;
    this.direction = direction;
    this.forceMagnitude = 5114;
    this.speed = (Math.random() % 5) / 10;
    this.velocity = this.direction.clone().multiplyScalar(this.speed);
    this.updateForceAndSpeedByDepth();
    this.endPosition = this.generateEndPosition();

    this.createGUI(gui);
    this.createVisualRepresentation(scene);
    this.createParticleRepresentation(scene);
  }

  generateEndPosition() {
    const distance = Math.random() * 100 + 60; // Distance between 30 and 80 meters
    const endDirection = this.direction
      .clone()
      .normalize()
      .multiplyScalar(distance);
    const endPosition = this.position.clone().add(endDirection);
    // console.log(
    //   "generateEndPosition - Start:",
    //   this.position,
    //   "End:",
    //   endPosition
    // );
    return endPosition;
  }
  getStartPosition() {
    const startPosition = this.position.clone();
    // console.log("getStartPosition:", startPosition);
    return startPosition;
  }

  getEndPosition() {
    const endPosition = this.endPosition.clone();
    // console.log("getEndPosition:", endPosition);
    return endPosition;
  }

  getDirection() {
    return this.direction.clone();
  }

  setDirection(x, y, z) {
    this.direction = new THREE.Vector3(x, y, z);
  }

  getSpeed() {
    return this.speed;
  }

  getRadius() {
    return 50;
  }

  updateForceAndSpeedByDepth() {
    const depth = this.position.y;
    this.forceMagnitude = Math.random() * 10000;
    // console.log("forceMagnitude " + this.forceMagnitude);
    this.speed = Math.random() * 2 + 1;
    this.velocity = this.direction.clone().multiplyScalar(this.speed);
  }

  createGUI(gui) {
    const folder = gui.addFolder(
      `BigCurrent ${gui.__folders ? Object.keys(gui.__folders).length + 1 : 1}`
    );
    folder.add(this.position, "x").name("Position X").listen();
    folder.add(this.position, "y").name("Position Y").listen();
    folder.add(this.position, "z").name("Position Z").listen();
    folder.add(this.direction, "x").name("Direction X").listen();
    folder.add(this.direction, "y").name("Direction Y").listen();
    folder.add(this.direction, "z").name("Direction Z").listen();
    folder.add(this, "forceMagnitude").name("Force Magnitude");
    folder
      .add(this, "speed")
      .name("Speed (m/s)")
      .onChange((value) => {
        this.velocity = this.direction.clone().multiplyScalar(value);
      });
    folder.open();
  }

  createVisualRepresentation(scene) {
    this.arrowHelper = new THREE.ArrowHelper(
      this.direction,
      this.position,
      this.forceMagnitude,
      0xffff00
    );
    scene.add(this.arrowHelper);
  }

  createParticleRepresentation(scene) {
    this.particles = new CurrentParticles(
      scene,
      500,
      this.forceMagnitude,
      this.speed,
      300,
      this.clock,
      true
    );
    this.updateParticlesPosition();
  }

  updateParticlesPosition() {
    this.particles.updateParticles(this.position, this.direction);
  }

  update(elapsedTime) {
    this.velocity = this.direction.clone().multiplyScalar(this.speed);
    this.position.add(this.velocity.clone().multiplyScalar(elapsedTime));

    this.arrowHelper.position.copy(this.position);
    this.arrowHelper.setDirection(this.direction);
    this.arrowHelper.setLength(this.forceMagnitude * 10);

    this.particles.updateParticles(this.position, this.direction);

    if (this.position.z > 200 || this.position.z < -200) {
      this.position.z = THREE.MathUtils.clamp(this.position.z, -200, 200);
    }
  }
}

export default BigCurrent;
