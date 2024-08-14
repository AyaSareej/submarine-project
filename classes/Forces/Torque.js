export class Torque {
  constructor() {
    this.density = 1000; // كثافة الماء بالكيلوغرام لكل متر مكعب
    this.area = 23; // مساحة الزعانف بالمتر المربع
    this.liftCoefficient = 1.0; // معامل الرفع (يتم تحديده بناءً على شكل الزعنفة وزاوية الهجوم)
  }

  calculateForce(velocity) {
    // 𝐹 = 0.5 * ρ * v^2 * A * C_L
    return (
      0.5 *
      this.density *
      Math.pow(velocity, 2) *
      this.area *
      this.liftCoefficient
    );
  }

  calculateTorque(force, distance, angle) {
    // τ = r * F * sin(θ)
    return distance * force * Math.sin(angle);
  }
}
