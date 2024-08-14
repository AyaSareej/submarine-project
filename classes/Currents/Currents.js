import * as THREE from "three";
import { CurrentParticles } from "../CurrentParticles";

export class Current {
  constructor(scene, gui, clock) {
    this.scene = scene;
    this.clock = clock;
    this.position = new THREE.Vector3(
      Math.random() * 100 - 50,
      Math.random() * -100 -100,
      Math.random() * 100 - 50
    );

    this.direction = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    this.updateForceAndSpeedByDepth();
    this.endPosition = this.generateEndPosition();

    this.createGUI(gui);
    this.createVisualRepresentation(scene);
    this.createParticleRepresentation(scene);
  }

  generateEndPosition() {
    const distance = Math.random() * 50 + 30; // Distance between 30 and 80 meters
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
    return this.position.clone();
  }

  getEndPosition() {
    return this.endPosition.clone();
  }

  getDirection() {
    return this.direction.clone();
  }

  getSpeed() {
    return this.speed;
  }

  getRadius() {
    return this.particles.getRadius();
  }

  updateForceAndSpeedByDepth() {
    const depth = -this.position.y;
    this.forceMagnitude = Math.random() * 5 + 3;
    this.speed = Math.random() * 3 + 2;
    this.velocity = this.direction.clone().multiplyScalar(this.speed);
  }

  createGUI(gui) {
    const folder = gui.addFolder(
      `Current ${gui.__folders ? Object.keys(gui.__folders).length + 1 : 1}`
    );
    folder.add(this.position, "x").name("Position X").listen();
    folder.add(this.endPosition, "z").name("endPosition ").listen();
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
      this.forceMagnitude * 10,
      0xffff00
    );
    scene.add(this.arrowHelper);
  }

  createParticleRepresentation(scene) {
    this.particles = new CurrentParticles(
      scene,
      100,
      this.forceMagnitude,
      this.speed,
      100,
      this.clock,
      false
    );
    this.updateParticlesPosition();
  }

  updateParticlesPosition() {
    this.particles.updateParticles(this.position, this.direction);
  }

  update(elapsedTime) {
    if (Math.random() < 0.01) {
      this.direction.x += Math.random() * 0.2 - 0.1;
      this.direction.y += Math.random() * 0.2 - 0.1;
      this.direction.z += Math.random() * 0.2 - 0.1;
      this.direction.normalize();
      this.velocity = this.direction.clone().multiplyScalar(this.speed);
    }

    this.position.add(this.velocity.clone().multiplyScalar(elapsedTime));

    this.arrowHelper.position.copy(this.position);
    this.arrowHelper.setDirection(this.direction);
    this.arrowHelper.setLength(this.forceMagnitude * 10);

    this.particles.updateParticles(this.position, this.direction);

    // Ensure current does not rise above -100 meters
    // if (this.position.y > -100) {
    //   this.position.y = -100; // Fix current at -100 meters
    // }

    // Reset position if out of bounds
    if (
      this.position.y < -200 ||
      this.position.y > -100 ||
      this.position.x < -150 ||
      this.position.x > 150 ||
      this.position.z < -200 ||
      this.position.z > 200
    ) {
      this.position.set(
        Math.random() * 100 - 50,
        Math.random() * -200,
        Math.random() * 100 - 50
      );
      this.endPosition = this.generateEndPosition();
      this.updateForceAndSpeedByDepth();
    }
  }
}

export default Current;
