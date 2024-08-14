import * as THREE from "three";

export class Weight {
  constructor(mass, gravity = 9.81) {
    this.mass = mass; // Mass of the submarine in kg
    this.gravity = gravity; // Gravitational acceleration in m/s^2
    this.vector = new THREE.Vector3(0, 0, 1);
    this.force = 0;
  }

  calculate(mass) {
    this.force = mass * this.gravity;
    this.vector = new THREE.Vector3(0, 0, this.force);
    return this.force; // Weight in Newtons
  }
}
