import * as THREE from "three";

export class PropulsionForce {
  constructor(power, waterDensity) {
    this.power = power;
    this.waterDensity = waterDensity;
    this.vector = new THREE.Vector3(0, 0, 0);
    this.force = 0;
  }

  calculateFanSurface(fanDiameter, depth) {
    if (depth > 2.68) depth = 2.68;
    return Math.PI * Math.pow((fanDiameter + depth) / 2, 2);
  }

  calculate(
    power,
    waterDensity,
    fanDiameter,
    depth,
    submarineVector_x,
    submarineVector_y,
    submarineVector_z
  ) {
    const fanSurface_underwater = this.calculateFanSurface(fanDiameter, depth);

    this.force =
      0.3 *
      Math.cbrt(2 * waterDensity * fanSurface_underwater * Math.pow(power, 2));

    this.vector = new THREE.Vector3(
      submarineVector_x,
      submarineVector_y,
      submarineVector_z * (power < 0 ? -this.force : this.force)
    );
    return this.force;
  }
}
