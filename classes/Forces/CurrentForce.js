// CurrentForce.js
export class CurrentForce {
    constructor (waterDensity = 1000) {
      this.waterDensity = waterDensity; // Density of water in kg/m^3
    }

    calculateSurface (currentDirection, objectDirection, objectLength, objectWidth, objectHeight){
    }

    calculate(surface, time, speed) {
      return 0.5 / time * this.waterDensity * surface * Math.pow(speed,2); // Current force in Newtons
    }
  }
