export class RotationalResistance  {
  //τ resistance = −c⋅ω
    constructor() {
        this.dragCoefficient = 0.2;
      }
  
    
      calculateResistanceTorque(angularVelocity) {
        return -this.dragCoefficient * angularVelocity;
      }
  }
  