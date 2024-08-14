import * as THREE from "three";

export class ResistanceForce {
  constructor(
    depth,
    density,
    Speed_X,
    Speed_Y,
    Speed_Z,
    dragCoefficient = 0.2
  ) {
    this.dragCoefficient = dragCoefficient;
    this.density = density;
    this.Speed_X = Speed_X;
    this.Speed_Y = Speed_Y;
    this.Speed_Z = Speed_Z;
    this.depth = depth;
    this.surface = this.calculateSurface(Speed_X, Speed_Y, Speed_Z, depth);
    this.vector = new THREE.Vector3(0, 0, 0);
    this.force = 0;
  }

  calculateSurface(Speed_X, Speed_Y, Speed_Z, depth) {
    // Surfaces on water surface
    var front_back_surface = Math.PI * Math.pow(7.5 / 2, 2);
    var side_surface = 170 * 7.5;

    if (depth > 8) depth = 8;

    let projection_vector = new THREE.Vector3(0, 0, 1);
    let movement_vector = new THREE.Vector3(Speed_X, Speed_Y, Speed_Z);

    var angle = projection_vector.angleTo(movement_vector);

    if (angle == Math.PI / 2 || angle == -Math.PI / 2)
      return side_surface + 170 * depth;
    else if (angle == 0 || angle == Math.PI)
      return front_back_surface + Math.PI * Math.pow(depth, 2);
    else
      return (
        side_surface +
        front_back_surface +
        170 * depth +
        Math.PI * Math.pow(depth, 2)
      );
  }

  calculate(Speed_X, Speed_Y, Speed_Z, depth, waterDensity) {
    this.surface = this.calculateSurface(Speed_X, Speed_Y, Speed_Z, depth);
    let movement_vector = new THREE.Vector3(Speed_X, Speed_Y, Speed_Z);

    this.force =
      0.5 *
      this.dragCoefficient *
      this.surface *
      waterDensity *
      Math.pow(movement_vector.length() * 6.5, 2);

    var ratio = this.force / movement_vector.length();
    this.vector = new THREE.Vector3(
      -ratio * movement_vector.x,
      -ratio * movement_vector.y,
      -ratio * movement_vector.z
    );

    return this.force;
  }
}
