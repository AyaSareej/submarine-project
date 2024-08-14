export class BuoyantForce {
  constructor(volume, waterDensity, gravity) {
    this.volume = volume; // Volume of the displaced water in m^3
    this.waterDensity = waterDensity; // Density of water in kg/m^3
    this.gravity = gravity; // Gravitational acceleration in m/s^2
  }

  calculate(volume, waterDensity) {
    //console.log(volume);
    return volume * waterDensity * this.gravity; // Buoyant force in Newtons
  }
}
// export class BuoyantForce {
//   constructor(volume, gravity) {
//     this.volume = volume;
//     this.gravity = gravity;
//   }

//   calculate(volume, density) {
//     return volume * density * this.gravity;
//   }
// }
