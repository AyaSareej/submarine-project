import * as THREE from "three";
import { GUI } from "dat.gui";

export class Lights {
  constructor(scene) {
    // إعداد الضوء
    this.light = new THREE.DirectionalLight(0xffffff, 1); // لون الضوء
    this.light.position.set(5, 10, 7.5); // موضع الضوء
    this.light.castShadow = true; // تفعيل الظل
    scene.add(this.light);

    // إعداد واجهة GUI
    this.gui = new GUI();
    this.setupGUI();
  }

  setupGUI() {
    const lightFolder = this.gui.addFolder("Sun Light");

    // إعداد التحكم في شدة الضوء
    lightFolder.add(this.light, "intensity", 0, 2, 0.1).name("Light Intensity");

    // إعداد التحكم في موضع الضوء
    const positionFolder = lightFolder.addFolder("Position");
    positionFolder.add(this.light.position, "x", -10, 10, 0.1).name("Position X");
    positionFolder.add(this.light.position, "y", 0, 20, 0.1).name("Position Y");
    positionFolder.add(this.light.position, "z", -10, 10, 0.1).name("Position Z");

    lightFolder.open();
  }
}
