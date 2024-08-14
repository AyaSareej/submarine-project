
export class KeyboardControls {
    constructor() {
        this.keys = {};
        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }
}
