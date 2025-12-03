/**
 * Globe Component - Based on Inspira UI Globe.vue
 * Converted to pure JavaScript for vanilla HTML projects
 * Original: https://registry.inspira-ui.com/globe.json
 */

class GlobeComponent {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = null;
        this.globe = null;
        this.phi = 0;
        this.width = 0;
        this.pointerInteracting = null;
        this.pointerInteractionMovement = 0;
        
        // Default configuration
        this.config = {
            width: 800,
            height: 800,
            devicePixelRatio: 2,
            phi: 0,
            theta: 0.3,
            dark: 0,
            diffuse: 0.4,
            mapSamples: 16000,
            mapBrightness: 1.2,
            baseColor: [1, 1, 1],
            markerColor: [251/255, 100/255, 21/255],
            glowColor: [1.2, 1.2, 1.2],
            markers: [
                { location: [14.5995, 120.9842], size: 0.03 },
                { location: [19.076, 72.8777], size: 0.1 },
                { location: [23.8103, 90.4125], size: 0.05 },
                { location: [30.0444, 31.2357], size: 0.07 },
                { location: [39.9042, 116.4074], size: 0.08 },
                { location: [-23.5505, -46.6333], size: 0.1 },
                { location: [19.4326, -99.1332], size: 0.1 },
                { location: [40.7128, -74.006], size: 0.1 },
                { location: [34.6937, 135.5022], size: 0.05 },
                { location: [41.0082, 28.9784], size: 0.06 },
            ],
            ...options.config
        };
        
        // Spring animation parameters
        this.mass = options.mass || 1;
        this.tension = options.tension || 280;
        this.friction = options.friction || 100;
        this.precision = options.precision || 0.001;
        
        this.springR = 0;
        this.springVelocity = 0;
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🌍 Initializing Globe Component...');
            
            // Create canvas
            this.createCanvas();
            
            // Wait for COBE to be available
            if (typeof window.createGlobe === 'undefined') {
                console.log('⏳ Waiting for COBE library...');
                setTimeout(() => this.init(), 1000);
                return;
            }
            
            // Create globe
            this.createGlobe();
            
            // Setup interactions
            this.setupInteractions();
            
            // Start animation loop
            this.animate();
            
            console.log('✅ Globe Component initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize Globe Component:', error);
            this.showFallback();
        }
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.maxWidth = '600px';
        this.canvas.style.maxHeight = '600px';
        this.canvas.style.aspectRatio = '1';
        this.canvas.style.borderRadius = '50%';
        this.canvas.style.cursor = 'grab';
        this.canvas.style.opacity = '0';
        this.canvas.style.transition = 'opacity 1s ease-in-out';
        
        // Clear container and add canvas
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
        
        // Set initial size
        this.onResize();
        
        console.log('✅ Canvas created');
    }
    
    createGlobe() {
        console.log('🌍 Creating globe with COBE...');
        
        const config = {
            ...this.config,
            width: this.width * 2,
            height: this.width * 2,
            onRender: (state) => this.onRender(state)
        };
        
        try {
            this.globe = window.createGlobe(this.canvas, config);
            console.log('✅ Globe created successfully');
            
            // Fade in canvas
            setTimeout(() => {
                this.canvas.style.opacity = '1';
            }, 100);
            
        } catch (error) {
            console.error('❌ Error creating globe:', error);
            this.showFallback();
        }
    }
    
    onRender(state) {
        if (!this.pointerInteracting) {
            this.phi += 0.005;
        }
        
        state.phi = this.phi + this.springR;
        state.width = this.width * 2;
        state.height = this.width * 2;
    }
    
    onResize() {
        if (this.canvas) {
            this.width = this.canvas.offsetWidth;
        }
    }
    
    setupInteractions() {
        // Pointer events
        this.canvas.addEventListener('pointerdown', (e) => {
            this.updatePointerInteraction(e.clientX);
        });
        
        this.canvas.addEventListener('pointerup', () => {
            this.updatePointerInteraction(null);
        });
        
        this.canvas.addEventListener('pointerout', () => {
            this.updatePointerInteraction(null);
        });
        
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => {
            this.updateMovement(e.clientX);
        });
        
        // Touch events
        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches[0]) {
                this.updateMovement(e.touches[0].clientX);
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => this.onResize());
        
        console.log('✅ Interactions setup complete');
    }
    
    updatePointerInteraction(clientX) {
        if (clientX !== null) {
            this.pointerInteracting = clientX - (this.pointerInteractionMovement ?? clientX);
        } else {
            this.pointerInteracting = null;
        }
        
        this.canvas.style.cursor = clientX ? 'grabbing' : 'grab';
    }
    
    updateMovement(clientX) {
        if (this.pointerInteracting !== null) {
            const delta = clientX - (this.pointerInteracting ?? clientX);
            this.pointerInteractionMovement = delta;
            this.springR = delta / 200;
        }
    }
    
    // Simple spring physics
    updateSpring() {
        const target = 0;
        const force = (target - this.springR) * this.tension;
        const acceleration = force / this.mass;
        
        this.springVelocity += acceleration;
        this.springVelocity *= (1 - this.friction / 1000);
        this.springR += this.springVelocity;
        
        if (Math.abs(this.springR) < this.precision && Math.abs(this.springVelocity) < this.precision) {
            this.springR = 0;
            this.springVelocity = 0;
        }
    }
    
    animate() {
        this.updateSpring();
        
        if (this.globe) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    showFallback() {
        this.container.innerHTML = `
            <div style="
                width: 100%;
                height: 600px;
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
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
                <div style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
                    border-radius: 50%;
                "></div>
                
                <div style="position: relative; z-index: 2;">
                    <div style="font-size: 64px; margin-bottom: 20px; animation: float 3s ease-in-out infinite;">🌍</div>
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Globe Component</div>
                    <div style="font-size: 16px; opacity: 0.9; margin-bottom: 8px;">COBE library not available</div>
                    <div style="font-size: 14px; opacity: 0.7;">Fallback mode</div>
                </div>
                
                <div style="
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    animation: rotate 20s linear infinite;
                    top: -10%;
                    left: -10%;
                    border-radius: 50%;
                "></div>
            </div>
            
            <style>
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            </style>
        `;
        console.log('🔄 Fallback displayed');
    }
    
    destroy() {
        if (this.globe) {
            this.globe.destroy();
        }
        window.removeEventListener('resize', () => this.onResize());
    }
}

// Make available globally
window.GlobeComponent = GlobeComponent;

console.log('📦 GlobeComponent class loaded');
