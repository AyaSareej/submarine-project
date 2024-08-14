export class WaterPressure {
  constructor() {
    this.surfaceDensity = 1025; // kg/m^3 at the surface
    this.pressureAtSurface = 101325; // Atmospheric pressure at sea level in Pascals
    this.gravity = 9.81; // m/s^2, acceleration due to gravity
    this.bulkModulus = 2.2e9; // Bulk modulus of water in Pascals
  }

  // Calculate the water density at a given depth (in meters)
  getDensity(depth) {
    const pressureAtDepth = this.getPressure(depth);
    return this.surfaceDensity * (1 + pressureAtDepth / this.bulkModulus);
  }

  // Calculate the water pressure at a given depth (in meters)
  getPressure(depth) {
    return this.pressureAtSurface + this.surfaceDensity * this.gravity * depth;
  }

  // Method to get both pressure and density at a given depth
  getPressureAndDensity(depth) {
    const density = this.getDensity(depth);
    const pressure = this.getPressure(depth);
    return { pressure, density };
  }

  static getInstance() {
    if (!WaterPressure.instance) {
      WaterPressure.instance = new WaterPressure();
    }
    return WaterPressure.instance;
  }
}

// Ensure it exports the singleton instance
export default WaterPressure.getInstance();
