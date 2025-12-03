/**
 * Interactive Globe Component - Based on Inspira UI Globe
 * Official Documentation: https://inspira-ui.com/docs/components/visualization/globe
 * Features: 3D rotating globe with travel markers
 * Dependencies: cobe library for WebGL globe visualization
 */

class InteractiveGlobe {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = null;
        this.globe = null;
        this.phi = 0;
        this.isPointerDown = false;
        
        // Default configuration following COBE library options
        this.config = {
            width: 600,
            height: 600,
            onRender: (state) => {
                // Auto-rotate globe when not interacting
                if (!this.isPointerDown) {
                    this.phi += 0.005;
                }
                state.phi = this.phi;
            },
            devicePixelRatio: 2,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: options.markers || [],
            ...options.config
        };
        
        // Spring animation parameters (from vue-use-spring)
        this.mass = options.mass || 1;
        this.tension = options.tension || 280;
        this.friction = options.friction || 100;
        this.precision = options.precision || 0.001;
        
        this.init();
    }
    
    async init() {
        try {
            // Dynamically import cobe
            const COBE = await import('cobe');
            this.createCanvas();
            this.createGlobe(COBE.default);
            this.setupInteractions();
            console.log('✅ Interactive Globe initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize globe:', error);
            this.showFallback();
        }
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.maxWidth = '600px';
        this.canvas.style.maxHeight = '600px';
        this.canvas.style.borderRadius = '50%';
        this.canvas.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        this.canvas.style.cursor = 'grab';
        this.container.appendChild(this.canvas);
    }
    
    createGlobe(COBE) {
        this.globe = COBE(this.canvas, this.config);
        
        // Add resize observer for responsive behavior
        const resizeObserver = new ResizeObserver(() => {
            this.updateSize();
        });
        resizeObserver.observe(this.container);
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
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            onPointerDown(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', onPointerUp);
        this.canvas.addEventListener('touchmove', onTouchMove);
    }
    
    updateSize() {
        if (this.globe) {
            const rect = this.container.getBoundingClientRect();
            const size = Math.min(rect.width, rect.height, 600);
            this.config.width = size;
            this.config.height = size;
        }
    }
    
    addMarker(lat, lng, size = 0.03) {
        this.config.markers.push([lat, lng, size]);
        if (this.globe) {
            // Recreate globe with new markers
            this.globe.destroy();
            this.createGlobe(window.COBE);
        }
    }
    
    updateMarkers(markers) {
        this.config.markers = markers;
        if (this.globe) {
            // Recreate globe with new markers
            this.globe.destroy();
            this.createGlobe(window.COBE);
        }
    }
    
    showFallback() {
        this.container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                min-height: 400px;
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
            ">
                <div style="position: relative; z-index: 2;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🌍</div>
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Interactive Globe</div>
                    <div style="font-size: 14px; opacity: 0.8;">Loading globe visualization...</div>
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
        console.log('✅ Globe fallback displayed');
    }
    
    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveGlobe;
}

// Make available globally
window.InteractiveGlobe = InteractiveGlobe;
