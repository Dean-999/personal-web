/**
 * Vanilla JavaScript Globe Component
 * Based on COBE library - works without Vue.js
 * Compatible with pure HTML+JavaScript projects
 */

class VanillaGlobe {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = null;
        this.globe = null;
        this.phi = 0;
        this.theta = 0;
        this.isPointerDown = false;
        this.animationId = null;
        
        // Travel markers data - [lat, lng, size]
        this.markers = options.markers || [
            [13.7563, 100.5018, 0.05], // Thailand
            [23.6978, 120.9605, 0.05], // Taiwan
            [34.2655, 108.9508, 0.05], // Xi'an
            [22.3193, 114.1694, 0.05], // Hong Kong
            [22.1987, 113.5439, 0.05], // Macau
            [1.3521, 103.8198, 0.05],  // Singapore
            [3.1390, 101.6869, 0.05],  // Malaysia
            [25.2048, 55.2708, 0.05],  // Dubai
            [25.0330, 102.7000, 0.05], // Yunnan
            [26.6470, 106.6302, 0.05], // Guizhou
            [39.8283, -98.5795, 0.05]  // USA
        ];
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🌍 Initializing Vanilla Globe...');
            
            // Create canvas
            this.createCanvas();
            
            // Import COBE dynamically
            const COBE = await import('https://unpkg.com/cobe@0.6.4/dist/cobe.esm.js');
            console.log('✅ COBE library loaded:', COBE);
            
            // Create globe
            this.createGlobe(COBE.default);
            
            // Setup interactions
            this.setupInteractions();
            
            console.log('✅ Vanilla Globe initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize Vanilla Globe:', error);
            this.showFallback();
        }
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.borderRadius = '50%';
        this.canvas.style.cursor = 'grab';
        this.canvas.style.maxWidth = '600px';
        this.canvas.style.maxHeight = '600px';
        this.canvas.style.aspectRatio = '1';
        
        // Clear container and add canvas
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
        
        console.log('✅ Canvas created and added to container');
    }
    
    createGlobe(COBE) {
        console.log('🌍 Creating globe with COBE...');
        
        const config = {
            devicePixelRatio: 2,
            width: 600,
            height: 600,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: this.markers,
            onRender: (state) => {
                // Auto-rotate when not interacting
                if (!this.isPointerDown) {
                    this.phi += 0.005;
                }
                state.phi = this.phi;
                state.theta = this.theta;
            }
        };
        
        try {
            this.globe = COBE(this.canvas, config);
            console.log('✅ Globe created successfully');
        } catch (error) {
            console.error('❌ Error creating globe:', error);
            this.showFallback();
        }
    }
    
    setupInteractions() {
        let pointerInteracting = null;
        let pointerInteractionMovement = 0;
        
        const onPointerDown = (e) => {
            this.isPointerDown = true;
            pointerInteracting = e.clientX - pointerInteractionMovement;
            this.canvas.style.cursor = 'grabbing';
        };
        
        const onPointerUp = () => {
            this.isPointerDown = false;
            pointerInteracting = null;
            this.canvas.style.cursor = 'grab';
        };
        
        const onPointerOut = () => {
            this.isPointerDown = false;
            pointerInteracting = null;
            this.canvas.style.cursor = 'grab';
        };
        
        const onMouseMove = (e) => {
            if (pointerInteracting !== null) {
                const delta = e.clientX - pointerInteracting;
                pointerInteractionMovement = delta;
                this.phi = this.phi + delta * 0.01;
            }
        };
        
        const onTouchMove = (e) => {
            if (pointerInteracting !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting;
                pointerInteractionMovement = delta;
                this.phi = this.phi + delta * 0.01;
            }
        };
        
        // Mouse events
        this.canvas.addEventListener('mousedown', onPointerDown);
        this.canvas.addEventListener('mouseup', onPointerUp);
        this.canvas.addEventListener('mouseout', onPointerOut);
        this.canvas.addEventListener('mousemove', onMouseMove);
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            onPointerDown(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', onPointerUp);
        this.canvas.addEventListener('touchmove', onTouchMove);
        
        console.log('✅ Interactions setup complete');
    }
    
    showFallback() {
        this.container.innerHTML = `
            <div style="
                width: 100%;
                height: 600px;
                background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                position: relative;
                overflow: hidden;
                max-width: 600px;
                margin: 0 auto;
            ">
                <div style="position: relative; z-index: 2;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🌍</div>
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Globe Loading Failed</div>
                    <div style="font-size: 16px; opacity: 0.8; margin-bottom: 8px;">Please check console for errors</div>
                    <div style="font-size: 14px; opacity: 0.6;">11 Travel Destinations</div>
                </div>
                <div style="
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent);
                    animation: rotate 20s linear infinite;
                    top: -50%;
                    left: -50%;
                "></div>
            </div>
            <style>
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        console.log('🔄 Fallback displayed');
    }
    
    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Make available globally
window.VanillaGlobe = VanillaGlobe;

console.log('📦 VanillaGlobe class loaded');
