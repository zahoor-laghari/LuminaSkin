// 3D Product Viewer Component using Three.js

class Product3DViewer {
    constructor(containerId, modelUrl, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }

        this.modelUrl = modelUrl;
        this.options = {
            enableControls: true,
            enableAnimation: true,
            autoRotate: false,
            backgroundColor: 0xfaf8f5,
            ...options
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.mixer = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        // Check WebGL support
        if (!this.checkWebGLSupport()) {
            this.showFallback();
            return;
        }

        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.setupControls();
        this.loadModel();
        this.addControlButtons();
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Track 3D viewer engagement
        this.trackEngagement();
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                     (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);
        
        // Add fog for depth
        this.scene.fog = new THREE.Fog(this.options.backgroundColor, 10, 50);
    }

    setupCamera() {
        const aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 5);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        
        this.container.appendChild(this.renderer.domElement);
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Main light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, -5);
        this.scene.add(fillLight);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(0, 5, -5);
        this.scene.add(rimLight);
    }

    setupControls() {
        if (!this.options.enableControls) return;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 10;
        this.controls.autoRotate = this.options.autoRotate;
        this.controls.autoRotateSpeed = 2;
        this.controls.enablePan = false;
        
        // Track user interactions
        this.controls.addEventListener('change', () => {
            this.trackInteraction('rotate');
        });
    }

    loadModel() {
        // For demonstration, we'll create a simple placeholder model
        // In production, use GLTFLoader to load actual 3D models
        this.createPlaceholderModel();
        
        /* Real implementation with GLTF:
        const loader = new THREE.GLTFLoader();
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            this.modelUrl,
            (gltf) => {
                this.model = gltf.scene;
                this.scene.add(this.model);
                
                // Center and scale model
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                
                this.model.scale.multiplyScalar(scale);
                this.model.position.sub(center.multiplyScalar(scale));
                
                // Setup animations
                if (gltf.animations && gltf.animations.length) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    gltf.animations.forEach((clip) => {
                        this.mixer.clipAction(clip).play();
                    });
                }
                
                // Track model loaded
                if (typeof gtag !== 'undefined') {
                    gtag('event', '3d_model_loaded', {
                        model_url: this.modelUrl
                    });
                }
            },
            (progress) => {
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`Loading model: ${percent.toFixed(0)}%`);
            },
            (error) => {
                console.error('Error loading model:', error);
                this.showFallback();
            }
        );
        */
    }

    createPlaceholderModel() {
        // Create a stylized bottle/product placeholder
        const group = new THREE.Group();

        // Bottle body
        const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32);
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf4e5e0,
            metalness: 0.1,
            roughness: 0.2,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.95
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        // Bottle cap
        const capGeometry = new THREE.CylinderGeometry(0.35, 0.42, 0.3, 32);
        const capMaterial = new THREE.MeshStandardMaterial({
            color: 0xc6765f,
            metalness: 0.7,
            roughness: 0.3
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 0.9;
        cap.castShadow = true;
        group.add(cap);

        // Label
        const labelGeometry = new THREE.PlaneGeometry(1, 0.8);
        const labelMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0.8
        });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.z = 0.41;
        group.add(label);

        // Ground plane (shadow catcher)
        const groundGeometry = new THREE.CircleGeometry(3, 32);
        const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        this.scene.add(ground);

        this.model = group;
        this.scene.add(this.model);
    }

    addControlButtons() {
        const controls = document.createElement('div');
        controls.className = 'viewer-controls';
        controls.innerHTML = `
            <button onclick="viewer3d.resetView()" title="Reset View" aria-label="Reset camera view">
                <i class="fas fa-redo"></i>
            </button>
            <button onclick="viewer3d.toggleAutoRotate()" title="Auto Rotate" aria-label="Toggle auto rotation">
                <i class="fas fa-sync-alt"></i>
            </button>
            <button onclick="viewer3d.toggleFullscreen()" title="Fullscreen" aria-label="Toggle fullscreen">
                <i class="fas fa-expand"></i>
            </button>
            <button onclick="viewer3d.showARPlaceholder()" title="View in AR" aria-label="View in augmented reality">
                <i class="fas fa-cube"></i>
            </button>
        `;
        this.container.appendChild(controls);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();

        if (this.controls) {
            this.controls.update();
        }

        if (this.mixer) {
            this.mixer.update(delta);
        }

        this.renderer.render(this.scene, this.camera);
    }

    resetView() {
        if (this.controls) {
            this.controls.reset();
            this.trackInteraction('reset_view');
        }
    }

    toggleAutoRotate() {
        if (this.controls) {
            this.controls.autoRotate = !this.controls.autoRotate;
            this.trackInteraction('toggle_rotate');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
        this.trackInteraction('fullscreen');
    }

    showARPlaceholder() {
        cart.showToast('AR feature coming soon! 📱', 'info');
        this.trackInteraction('ar_button_click');
    }

    onResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    showFallback() {
        this.container.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gradient-to-br from-cream to-blush">
                <div class="text-center p-8">
                    <i class="fas fa-cube text-6xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600 mb-4">3D viewer not supported on this device</p>
                    <img src="${this.options.fallbackImage || ''}" alt="Product" class="rounded-lg shadow-lg max-w-sm mx-auto">
                </div>
            </div>
        `;
    }

    trackInteraction(action) {
        if (typeof gtag !== 'undefined') {
            gtag('event', '3d_viewer_interaction', {
                action: action,
                model_url: this.modelUrl
            });
        }
    }

    trackEngagement() {
        let interactionCount = 0;
        let timeSpent = 0;
        const startTime = Date.now();

        // Track time spent
        const interval = setInterval(() => {
            timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            if (timeSpent > 300) { // 5 minutes max
                clearInterval(interval);
            }
        }, 1000);

        // Track interactions
        this.container.addEventListener('mousedown', () => {
            interactionCount++;
        });

        this.container.addEventListener('touchstart', () => {
            interactionCount++;
        });

        // Send engagement data when user leaves
        window.addEventListener('beforeunload', () => {
            if (typeof gtag !== 'undefined' && (interactionCount > 0 || timeSpent > 5)) {
                gtag('event', '3d_viewer_engagement', {
                    time_spent: timeSpent,
                    interactions: interactionCount,
                    model_url: this.modelUrl
                });
            }
        });
    }

    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
        // Clean up geometries and materials
        this.scene?.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Make viewer class globally accessible
window.Product3DViewer = Product3DViewer;
let viewer3d = null;