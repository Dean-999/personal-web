/**
 * Simple Globe Component using COBE from CDN
 * No modules, direct script loading approach
 */

// Wait for COBE to load from CDN
function initSimpleGlobe(containerId) {
    console.log('🌍 Initializing Simple Globe...');
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('❌ Container not found:', containerId);
        return;
    }
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.borderRadius = '50%';
    canvas.style.cursor = 'grab';
    canvas.style.maxWidth = '600px';
    canvas.style.maxHeight = '600px';
    
    container.innerHTML = '';
    container.appendChild(canvas);
    
    // Travel markers
    const markers = [
        [13.7563, 100.5018, 0.05],  // Thailand
        [23.6978, 120.9605, 0.05],  // Taiwan
        [34.2655, 108.9508, 0.05],  // Xi'an
        [22.3193, 114.1694, 0.05],  // Hong Kong
        [22.1987, 113.5439, 0.05],  // Macau
        [1.3521, 103.8198, 0.05],   // Singapore
        [3.1390, 101.6869, 0.05],   // Malaysia
        [25.2048, 55.2708, 0.05],   // Dubai
        [25.0330, 102.7000, 0.05],  // Yunnan
        [26.6470, 106.6302, 0.05],  // Guizhou
        [39.8283, -98.5795, 0.05]   // USA
    ];
    
    let phi = 0;
    let isPointerDown = false;
    
    // Check if COBE is available
    if (typeof window.createGlobe !== 'undefined') {
        console.log('✅ COBE library found, creating globe...');
        
        try {
            const globe = window.createGlobe(canvas, {
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
                markers: markers,
                onRender: (state) => {
                    if (!isPointerDown) {
                        phi += 0.005;
                    }
                    state.phi = phi;
                }
            });
            
            // Setup interactions
            let pointerInteracting = null;
            let pointerInteractionMovement = 0;
            
            const onPointerDown = (e) => {
                isPointerDown = true;
                pointerInteracting = e.clientX - pointerInteractionMovement;
                canvas.style.cursor = 'grabbing';
            };
            
            const onPointerUp = () => {
                isPointerDown = false;
                pointerInteracting = null;
                canvas.style.cursor = 'grab';
            };
            
            const onMouseMove = (e) => {
                if (pointerInteracting !== null) {
                    const delta = e.clientX - pointerInteracting;
                    pointerInteractionMovement = delta;
                    phi = phi + delta * 0.01;
                }
            };
            
            canvas.addEventListener('mousedown', onPointerDown);
            canvas.addEventListener('mouseup', onPointerUp);
            canvas.addEventListener('mouseout', onPointerUp);
            canvas.addEventListener('mousemove', onMouseMove);
            
            // Touch events
            canvas.addEventListener('touchstart', (e) => {
                onPointerDown(e.touches[0]);
            });
            canvas.addEventListener('touchend', onPointerUp);
            canvas.addEventListener('touchmove', (e) => {
                if (pointerInteracting !== null && e.touches[0]) {
                    const delta = e.touches[0].clientX - pointerInteracting;
                    pointerInteractionMovement = delta;
                    phi = phi + delta * 0.01;
                }
            });
            
            console.log('✅ Simple Globe created successfully!');
            
        } catch (error) {
            console.error('❌ Error creating globe:', error);
            showSimpleFallback(container);
        }
        
    } else {
        console.log('⏳ COBE library not ready, retrying...');
        setTimeout(() => initSimpleGlobe(containerId), 1000);
    }
}

function showSimpleFallback(container) {
    container.innerHTML = `
        <div style="
            width: 100%;
            height: 600px;
            background: radial-gradient(circle at center, #2563eb 0%, #1e40af 100%);
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
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Loading Globe...</div>
                <div style="font-size: 16px; opacity: 0.8; margin-bottom: 8px;">COBE library loading</div>
                <div style="font-size: 14px; opacity: 0.6;">11 Travel Destinations</div>
            </div>
            <div style="
                position: absolute;
                width: 200%;
                height: 200%;
                background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                animation: rotate 10s linear infinite;
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
}

// Make function globally available
window.initSimpleGlobe = initSimpleGlobe;
