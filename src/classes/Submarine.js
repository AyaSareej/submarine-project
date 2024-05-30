import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class Submarine {
    constructor(scene, gui, updateAllMaterials, keyboardControls) {
        this.scene = scene;
        this.gui = gui;
        this.updateAllMaterials = updateAllMaterials;
        this.keyboardControls = keyboardControls;
        this.gltfLoader = new GLTFLoader();
        this.debugObject = { envMapIntensity: 0.7 };

        this.submarine = null;  // Store the submarine model

        this.loadModel();
    }

    loadModel() {
        this.gltfLoader.load(
            '/static/sub/ohio class SSBN.gltf',
            (gltf) => {
                console.log('Success:', gltf);
                gltf.scene.scale.set(20, 20, 20);
                this.submarine = gltf.scene; // Assign loaded model to this.submarine
                this.scene.add(gltf.scene);
                this.gui.add(gltf.scene.rotation, 'y')
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .name('rotation');
                    

                this.applyEnvMapIntensity(gltf.scene, this.debugObject.envMapIntensity);
                this.updateAllMaterials();
                this.findAndAnimateMeshes(gltf.scene);
            },
            (progress) => {
                console.log('Progress:', progress);
            },
            (error) => {
                console.log('Error:', error);
            }
        );
    }

    update() {
        if (!this.submarine) return;

        const speed = 0.1;
        const rotationSpeed = 0.02;

        if (this.keyboardControls.isKeyPressed('ArrowUp')) {
            this.submarine.translateZ(-speed);
        }
        if (this.keyboardControls.isKeyPressed('ArrowDown')) {
            this.submarine.translateZ(speed);
        }
        if (this.keyboardControls.isKeyPressed('ArrowLeft')) {
            this.submarine.rotation.y += rotationSpeed;
        }
        if (this.keyboardControls.isKeyPressed('ArrowRight')) {
            this.submarine.rotation.y -= rotationSpeed;
        }
        if (this.keyboardControls.isKeyPressed('w')) {
            this.submarine.position.y += speed;
        }
        if (this.keyboardControls.isKeyPressed('s')) {
            this.submarine.position.y -= speed;
        }

        // Rocket launch
        if (this.rocketMesh && !this.rocketLaunched && this.keyboardControls.isKeyPressed('r')) {
            this.rocketLaunched = true;
            this.launchRocket();
        }

    }
    findAndAnimateMeshes(gltfScene) {
        const fanMesh = this.findMeshByName(gltfScene, 'turbine');
        const rocketMesh = this.findMeshByName(gltfScene, 'trident_missile');
        const launchSlotCoverMesh = this.findMeshByName(gltfScene, 'main_silo_cover');

        if (fanMesh) {
            this.animateFan(fanMesh);
        }

        if (rocketMesh) {
            this.animateRocket(rocketMesh);
        }

        if (launchSlotCoverMesh) {
            this.animateLaunchSlotCover(launchSlotCoverMesh);
        }
    }

    findMeshByName(node, name) {
        if (node.name.includes(name)) {
            return node;
        }

        for (const child of node.children) {
            const mesh = this.findMeshByName(child, name);
            if (mesh) {
                return mesh;
            }
        }

        return null;
    }

    animateFan(fanMesh) {
        const animate = () => {
            requestAnimationFrame(animate);
            fanMesh.rotation.z += 0.01;
        };
        animate();
    }



    animateLaunchSlotCover(launchSlotCoverMesh) {
        const animate = () => {
            requestAnimationFrame(animate);
            launchSlotCoverMesh.rotation.y = Math.PI ;
        };
        animate();
    }
    applyEnvMapIntensity(scene, intensity) {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.envMapIntensity = intensity;
                child.material.needsUpdate = true;
            }
        });
    }
    // animateRocket(rocketMesh) {
    //     const clock = new THREE.Clock();
    //     const animate = () => {
    //         requestAnimationFrame(animate);
    //         const time = clock.getElapsedTime();
    //         if (time <= 1) {
    //             rocketMesh.position.z = -Math.sin(time);
    //         } else {
    //             rocketMesh.position.z += -0.004 * time * time;
    //         }
    //     };
    //     animate();
    // }
    animateRocket(rocketMesh) {
        this.rocketLaunched = false;
        this.rocketMesh = rocketMesh;
        this.rocketMesh.position.z = 0.9;
    }
    launchRocket() {
        this.rocketMesh.position.z -= 0.05;
        //this.rocketMesh.rotation.x -= 0.01;
    
        // const time = clock.getElapsedTime();
        // if (time <= 1) {
        //     rocketMesh.position.z = -Math.sin(time);
        // } else {
        //     rocketMesh.position.z += -0.004 * time * time;
        // }

        // Check if the rocket has gone above a certain height
        if (this.rocketMesh.position.y > 50) {
            this.rocketLaunched = false;
            // Do any additional logic or cleanup here
        } else {
            requestAnimationFrame(this.launchRocket.bind(this));
        }
    }
}
