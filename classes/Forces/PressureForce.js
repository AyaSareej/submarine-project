export class PressureForce {
  constructor(A, p0 = 1, rho = 1000, g = 9.81, a, n, s) {
    this.A = A; // Area of the part of the submarine exposed to pressure (m²)
    this.p0 = p0; // Atmospheric pressure (Pa)
    this.rho = rho; // Density of water (kg/m³)
    this.g = g; // Gravitational acceleration (m/s²)
    this.a = a; // Length of the submarine (m)
    this.n = n; // Number of propellers
    this.s = s; // Cross-sectional area of one propeller (m²)
  }

  calculate(h) {
    // Depth where the submarine is located (m)
    // Depth wSere the propellers are located (m)
    return (
      this.A * (this.p0 + this.rho * this.g * (h + this.a / 4)) +
      this.n * this.s * (this.p0 + this.rho * this.g * h)
    );
  }
}

// The old code
/*export class PressureForce {
  constructor(A, p0, rho, g, h, a, n, s, h1) {
    this.A = A; // Area of submarine exposed to pressure
    this.p0 = p0; // Atmospheric pressure
    this.rho = rho; // Density of water
    this.g = g; // Acceleration due to gravity
    this.h = h; // Depth of the top of the submarine
    this.a = a; // Length of the submarine
    this.n = n; // Number of propellers
    this.s = s; // Surface area of a single propeller
    this.h1 = h1; // Depth of the propeller
  }

  calculate() {
    // Calculating pressure force
    const part1 =
      this.A * (this.p0 + this.rho * this.g * (this.h + this.a / 4));
    const part2 = this.n * this.s * (this.p0 + this.rho * this.g * this.h1);
    return part1 + part2;
  }
}
*/
