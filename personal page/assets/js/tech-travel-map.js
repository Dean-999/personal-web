/**
 * 科技感旅行地图组件
 * 特性：深色科技主题、霓虹发光、粒子动画、3D深度感
 */

class TechTravelMap {
    constructor(container, options = {}) {
        this.container = container;
        this.map = null;
        this.markers = [];
        this.particles = [];
        this.animationId = null;
        
        // 旅行数据
        this.travelData = [
            { name: "Thailand", age: 3, lat: 13.7563, lng: 100.5018, year: 2010, description: "First international trip, experiencing tropical culture" },
            { name: "Taiwan", age: 6, lat: 23.6978, lng: 120.9605, year: 2013, description: "Exploring island culture and delicious food" },
            { name: "Xi'an", age: 8, lat: 34.2655, lng: 108.9508, year: 2015, description: "Ancient capital cultural journey, Terracotta Warriors amazed" },
            { name: "Hong Kong", age: 9, lat: 22.3193, lng: 114.1694, year: 2016, description: "Pearl of the Orient, shopping paradise" },
            { name: "Macau", age: 9, lat: 22.1987, lng: 113.5439, year: 2016, description: "Portuguese style, history meets modernity" },
            { name: "Singapore", age: 10, lat: 1.3521, lng: 103.8198, year: 2017, description: "Garden city, harmony of technology and nature" },
            { name: "Malaysia", age: 10, lat: 3.1390, lng: 101.6869, year: 2017, description: "Multicultural, tropical rainforest adventure" },
            { name: "Siguniang Mountain", age: 10, lat: 31.1064, lng: 102.8992, year: 2017, description: "Alpine adventure, four peaks of beauty and challenge" },
            { name: "Vietnam", age: 11, lat: 16.0544, lng: 108.2022, year: 2018, description: "Southeast Asian adventure, Halong Bay and Ho Chi Minh City" },
            { name: "Beijing", age: 13, lat: 39.9042, lng: 116.4074, year: 2019, description: "Capital exploration, Forbidden City and Great Wall adventure" },
            { name: "Dubai", age: 12, lat: 25.2048, lng: 55.2708, year: 2019, description: "Desert miracle, city of the future" },
            { name: "Yunnan", age: 14, lat: 25.0330, lng: 102.7000, year: 2021, description: "South of the clouds, ethnic customs" },
            { name: "Guizhou", age: 14, lat: 26.6470, lng: 106.6302, year: 2021, description: "Mountainous Guizhou, karst landscape" },
            { name: "Siguniang Mountain", age: 14, lat: 31.1064, lng: 102.9053, year: 2021, description: "Alpine adventure, four peaks of the goddess" },
            { name: "USA (Atlanta)", age: 15, lat: 33.7490, lng: -84.3880, year: 2022, description: "American journey, cross-cultural experience in Atlanta" }
        ];
        
        // 常住地数据
        this.residenceData = {
            name: "Chengdu",
            lat: 30.5728,
            lng: 104.0668,
            description: "My hometown where I grew up and currently live",
            type: "residence"
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('��️ 初始化科技感旅行地图...');
            console.log('📍 旅行数据:', this.travelData);
            
            // 等待Leaflet加载
            if (typeof L === 'undefined') {
                console.log('⏳ 等待Leaflet库加载...');
                setTimeout(() => this.init(), 1000);
                return;
            }
            
            console.log('✅ Leaflet库已加载:', L);
            
            this.createMap();
            this.addTravelMarkers();
            // this.createTravelRoutes(); // 注释掉原有的旅行路线连接
            this.createResidenceRoutes(); // 创建从成都发散到各目的地的路线
            this.addParticleBackground();
            this.addTechEffects();
            
            console.log('✅ 科技感旅行地图初始化完成');
            
        } catch (error) {
            console.error('❌ 地图初始化失败:', error);
            this.showFallback();
        }
    }
    
    createMap() {
        console.log('🗺️ 创建深色主题地图...');
        
        // 创建地图实例
        this.map = L.map(this.container, {
            center: [20, 100], // 居中显示亚洲区域
            zoom: 4,
            zoomControl: false,
            attributionControl: false,
            dragging: true,
            touchZoom: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
        });
        
        // 添加深色主题瓦片图层
        const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);
        
        // 添加备用深色瓦片图层
        const backupDarkTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            subdomains: 'abc'
        });
        
        // 添加图层控制
        const baseMaps = {
            "Dark Theme": darkTiles,
            "OpenStreetMap": backupDarkTiles
        };
        
        L.control.layers(baseMaps, {}, {
            position: 'topright',
            collapsed: false
        }).addTo(this.map);
        
        // 添加缩放控制
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);
        
        console.log('✅ 深色主题地图创建完成');
    }
    
    // customizeMapStyle() {
    //     console.log('🎨 自定义地图样式...');
    //     
    //     // 添加自定义CSS样式
    //     const style = document.createElement('style');
    //     style.textContent = `
    //         .leaflet-control-zoom {
    //             background: rgba(15, 23, 42, 0.9) !important;
    //             border: 1px solid rgba(96, 165, 250, 0.3) !important;
    //             border-radius: 8px !important;
    //             backdrop-filter: blur(10px) !important;
    //         }
    //         
    //         .leaflet-control-zoom a {
    //             background: rgba(30, 41, 59, 0.8) !important;
    //             color: #60a5fa !important;
    //             border: 1px solid rgba(96, 165, 250, 0.2) !important;
    //             border-radius: 4px !important;
    //             margin: 2px !important;
    //         }
    //         
    //         .leaflet-control-zoom a:hover {
    //             background: rgba(96, 165, 250, 0.2) !important;
    //             color: #ffffff !important;
    //         }
    //         
    //         .leaflet-control-layers {
    //             background: rgba(15, 23, 42, 0.9) !important;
    //             border: 1px solid rgba(96, 165, 250, 0.3) !important;
    //             border-radius: 8px !important;
    //             backdrop-filter: blur(10px) !important;
    //             color: #e2e8f0 !important;
    //         }
    //         
    //         .leaflet-control-layers label {
    //             color: #e2e8f0 !important;
    //         }
    //     `;
    //     document.head.appendChild(style);
    //     
    //     console.log('✅ 地图样式自定义完成');
    // }
    
    addTravelMarkers() {
        console.log('📍 添加旅行标记点...');
        
        // 添加一个红色测试标记点（用于调试）
        const testMarker = L.marker([33.7490, -84.3880], {
            icon: L.divIcon({
                className: 'test-marker',
                html: '<div style="width: 20px; height: 20px; background: red; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px red;"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(this.map);
        
        console.log('🔴 红色测试标记点已添加到亚特兰大 [33.7490, -84.3880]');
        
        this.travelData.forEach((location, index) => {
            console.log(`📍 创建标记点 ${index + 1}: ${location.name} (${location.age}岁)`);
            
            // 创建自定义图标
            const customIcon = L.divIcon({
                className: 'tech-travel-marker',
                html: `
                    <div class="marker-container">
                        <div class="marker-pulse"></div>
                        <div class="marker-glow"></div>
                        <div class="marker-core"></div>
                        <div class="marker-label">${location.age}岁</div>
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });
            
            // 创建标记
            const marker = L.marker([location.lat, location.lng], {
                icon: customIcon,
                title: `${location.name} (${location.age}岁)`
            }).addTo(this.map);
            
            console.log(`✅ 标记点 ${location.name} 已添加到坐标 [${location.lat}, ${location.lng}]`);
            
            // 添加弹出信息
            const popup = L.popup({
                className: 'tech-travel-popup',
                maxWidth: 300,
                closeButton: false
            }).setContent(`
                <div class="travel-popup-content">
                    <div class="popup-header">
                        <h3>${location.name}</h3>
                        <span class="age-badge">${location.age}岁</span>
                    </div>
                    <div class="popup-year">${location.year}年</div>
                    <div class="popup-description">${location.description}</div>
                    <div class="popup-coordinates">
                        <small>📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</small>
                    </div>
                </div>
            `);
            
            marker.bindPopup(popup);
            
            // 悬停效果
            marker.on('mouseover', () => {
                const element = marker.getElement();
                if (element) {
                    element.classList.add('marker-hover');
                }
            });
            
            marker.on('mouseout', () => {
                const element = marker.getElement();
                if (element) {
                    element.classList.remove('marker-hover');
                }
            });
            
            this.markers.push(marker);
        });
        
        console.log(`✅ 旅行标记点添加完成，共 ${this.markers.length} 个标记点`);
        
        // 添加常住地标记
        this.addResidenceMarker();
    }
    
    addResidenceMarker() {
        console.log('🏠 添加常住地标记...');
        
        // 创建常住地图标（特殊样式）
        const residenceIcon = L.divIcon({
            className: 'residence-marker',
            html: `
                <div class="residence-container">
                    <div class="residence-pulse"></div>
                    <div class="residence-glow"></div>
                    <div class="residence-core"></div>
                    <div class="residence-label">🏠 Home</div>
                </div>
            `,
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        });
        
        // 创建常住地标记
        const residenceMarker = L.marker([this.residenceData.lat, this.residenceData.lng], {
            icon: residenceIcon,
            title: `${this.residenceData.name} - My Hometown`
        }).addTo(this.map);
        
        // 添加弹出信息
        const residencePopup = L.popup({
            className: 'residence-popup',
            maxWidth: 300,
            closeButton: false
        }).setContent(`
            <div class="residence-popup-content">
                <div class="popup-header">
                    <h3>🏠 ${this.residenceData.name}</h3>
                    <span class="residence-badge">Hometown</span>
                </div>
                <div class="popup-description">${this.residenceData.description}</div>
                <div class="popup-coordinates">
                    <small>📍 ${this.residenceData.lat.toFixed(4)}, ${this.residenceData.lng.toFixed(4)}</small>
                </div>
            </div>
        `);
        
        residenceMarker.bindPopup(residencePopup);
        
        // 悬停效果
        residenceMarker.on('mouseover', () => {
            const element = residenceMarker.getElement();
            if (element) {
                element.classList.add('residence-hover');
            }
        });
        
        residenceMarker.on('mouseout', () => {
            const element = residenceMarker.getElement();
            if (element) {
                element.classList.remove('residence-hover');
            }
        });
        
        this.markers.push(residenceMarker);
        console.log(`✅ 常住地标记 ${this.residenceData.name} 已添加到坐标 [${this.residenceData.lat}, ${this.residenceData.lng}]`);
    }
    
    // createTravelRoutes() {
    //     console.log('🛤️ 创建旅行路线连接...');
    //     
    //     this.travelRoutes = [];
    //     
    //     // 按时间顺序连接旅行点
    //     for (let i = 0; i < this.travelData.length - 1; i++) {
    //         const current = this.travelData[i];
    //         const next = this.travelData[i + 1];
    //         
    //         const route = L.polyline([
    //             [current.lat, current.lng],
    //             [next.lat, next.lng]
    //         ], {
    //             color: '#8b5cf6',
    //             weight: 2,
    //             opacity: 0.6,
    //             className: 'tech-travel-route'
    //         }).addTo(this.map);
    //         
    //         this.travelRoutes.push(route);
    //         console.log(`✅ 创建路线: ${current.name} → ${next.name}`);
    //     }
    //     
    //     console.log(`✅ 旅行路线创建完成，共 ${this.travelRoutes.length} 条路线`);
    // }
    
    createResidenceRoutes() {
        console.log('🌟 创建从成都发散到各目的地的荧光路线...');
        
        this.residenceData.travelRoutes = [];
        
        this.travelData.forEach((destination, index) => {
            // 创建从成都到目的地的路线
            const route = L.polyline([
                [this.residenceData.lat, this.residenceData.lng], // 成都起点
                [destination.lat, destination.lng] // 目的地终点
            ], {
                color: '#60a5fa',
                weight: 4,
                opacity: 0.9,
                className: 'residence-route',
                smoothFactor: 1
            }).addTo(this.map);
            
            // 添加路线动画
            this.animateResidenceRoute(route, index * 300);
            
            // 添加悬停效果
            route.on('mouseover', () => {
                route.setStyle({
                    weight: 6,
                    opacity: 1,
                    color: '#3b82f6'
                });
            });
            
            route.on('mouseout', () => {
                route.setStyle({
                    weight: 4,
                    opacity: 0.9,
                    color: '#60a5fa'
                });
            });
            
            // 存储路线引用
            this.residenceData.travelRoutes.push(route);
            
            console.log(`✅ 创建路线: 成都 → ${destination.name}`);
        });
        
        console.log(`✅ 发散路线创建完成，共 ${this.residenceData.travelRoutes.length} 条路线`);
    }
    
    animateResidenceRoute(route, delay) {
        setTimeout(() => {
            // 创建动画路径
            const path = route.getElement();
            if (path) {
                path.style.strokeDasharray = '20, 10';
                path.style.strokeDashoffset = '30';
                path.style.animation = 'residenceDash 8s linear infinite';
            }
        }, delay);
    }
    
    addParticleBackground() {
        console.log('✨ 添加粒子背景...');
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        this.container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // 调整canvas尺寸
        const resizeCanvas = () => {
            canvas.width = this.container.offsetWidth;
            canvas.height = this.container.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 创建粒子
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // 边界检查
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // 绘制粒子
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96, 165, 250, ${particle.opacity})`;
                ctx.fill();
            });
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        console.log('✅ 粒子背景添加完成');
    }
    
    addTechEffects() {
        console.log('🔮 添加科技特效...');
        
        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .tech-travel-marker {
                background: transparent !important;
                border: none !important;
            }
            
            .marker-container {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .marker-core {
                width: 12px;
                height: 12px;
                background: #60a5fa;
                border-radius: 50%;
                box-shadow: 0 0 20px #60a5fa;
                z-index: 3;
                position: relative;
            }
            
            .marker-pulse {
                position: absolute;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: pulse 2s infinite;
                z-index: 1;
            }
            
            .marker-glow {
                position: absolute;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
                border-radius: 50%;
                animation: glow 3s infinite;
                z-index: 2;
            }
            
            .marker-label {
                position: absolute;
                top: -25px;
                background: rgba(15, 23, 42, 0.9);
                color: #60a5fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: bold;
                white-space: nowrap;
                border: 1px solid rgba(96, 165, 250, 0.3);
                backdrop-filter: blur(10px);
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .marker-hover .marker-label {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* 注释掉不再使用的旅行路线样式
            .tech-travel-route {
                stroke-dasharray: 10, 5;
                animation: dash 20s linear infinite;
            }
            */
            
            .tech-travel-popup .leaflet-popup-content-wrapper {
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(96, 165, 250, 0.3);
                border-radius: 12px;
                backdrop-filter: blur(15px);
                color: #e2e8f0;
            }
            
            .tech-travel-popup .leaflet-popup-tip {
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(96, 165, 246, 0.3);
            }
            
            .travel-popup-content {
                padding: 8px;
            }
            
            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .popup-header h3 {
                margin: 0;
                color: #60a5fa;
                font-size: 16px;
            }
            
            .age-badge {
                background: rgba(96, 165, 250, 0.2);
                color: #60a5fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                border: 1px solid rgba(96, 165, 250, 0.3);
            }
            
            .popup-year {
                color: #94a3b8;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .popup-description {
                color: #cbd5e1;
                font-size: 13px;
                line-height: 1.4;
                margin-bottom: 8px;
            }
            
            .popup-coordinates {
                color: #64748b;
                font-size: 11px;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.2); opacity: 0.4; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            
            @keyframes glow {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.4; }
            }
            
            /* 注释掉不再使用的dash动画
            @keyframes dash {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -15; }
            }
            */
            
            /* 确保标记点可见 */
            .leaflet-marker-icon {
                z-index: 1000 !important;
            }
            
            .tech-travel-marker {
                z-index: 1000 !important;
            }
            
            /* 注释掉不再使用的旅行路线样式
            .tech-travel-route {
                stroke-dasharray: 10, 5;
                animation: dash 20s linear infinite;
            }
            */
            
            /* 常住地图标样式 */
            .residence-marker {
                background: transparent !important;
                border: none !important;
                z-index: 1001 !important;
            }
            
            .residence-container {
                position: relative;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .residence-core {
                width: 16px;
                height: 16px;
                background: #10b981;
                border-radius: 50%;
                box-shadow: 0 0 25px #10b981;
                z-index: 3;
                position: relative;
            }
            
            .residence-pulse {
                position: absolute;
                width: 50px;
                height: 50px;
                background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: residencePulse 3s infinite;
                z-index: 1;
            }
            
            .residence-glow {
                position: absolute;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
                border-radius: 50%;
                animation: residenceGlow 4s infinite;
                z-index: 2;
            }
            
            .residence-label {
                position: absolute;
                top: -30px;
                background: rgba(15, 23, 42, 0.9);
                color: #10b981;
                padding: 3px 8px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: bold;
                white-space: nowrap;
                border: 1px solid rgba(16, 185, 129, 0.3);
                backdrop-filter: blur(10px);
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .residence-hover .residence-label {
                opacity: 1;
                transform: translateY(0);
            }
            
            .residence-popup .leaflet-popup-content-wrapper {
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 12px;
                backdrop-filter: blur(15px);
                color: #e2e8f0;
            }
            
            .residence-popup .leaflet-popup-tip {
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid rgba(16, 185, 129, 0.3);
            }
            
            .residence-popup-content {
                padding: 8px;
            }
            
            .residence-badge {
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                border: 1px solid rgba(16, 185, 129, 0.3);
            }
            
            @keyframes residencePulse {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.3); opacity: 0.4; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            
            @keyframes residenceGlow {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.5; }
            }
            
            /* 深色主题地图样式 */
            .leaflet-container {
                background: #0f172a !important;
                height: 800px !important; /* 从600px增加到800px */
                width: 100% !important;
                border-radius: 16px !important;
                overflow: hidden !important;
            }
            
            /* 地图容器样式 */
            #interactiveGlobe {
                height: 800px !important; /* 确保容器高度一致 */
                width: 100% !important;
                border-radius: 16px !important;
                overflow: hidden !important;
            }
            
            .leaflet-control-zoom {
                background: rgba(15, 23, 42, 0.95) !important;
                border: 1px solid rgba(96, 165, 250, 0.3) !important;
                border-radius: 8px !important;
                backdrop-filter: blur(10px) !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
            }
            
            .leaflet-control-zoom a {
                background: rgba(30, 41, 59, 0.9) !important;
                color: #60a5fa !important;
                border: 1px solid rgba(96, 165, 250, 0.2) !important;
                border-radius: 4px !important;
                margin: 2px !important;
                font-weight: bold !important;
                transition: all 0.2s ease !important;
            }
            
            .leaflet-control-zoom a:hover {
                background: rgba(96, 165, 250, 0.2) !important;
                color: #ffffff !important;
                transform: scale(1.05) !important;
            }
            
            .leaflet-control-layers {
                background: rgba(15, 23, 42, 0.95) !important;
                border: 1px solid rgba(96, 165, 250, 0.3) !important;
                border-radius: 8px !important;
                backdrop-filter: blur(10px) !important;
                color: #e2e8f0 !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
            }
            
            .leaflet-control-layers label {
                color: #e2e8f0 !important;
                font-weight: 500 !important;
            }
            
            .leaflet-control-layers input[type="radio"] {
                accent-color: #60a5fa !important;
            }
            
            /* 红色测试标记点样式 */
            .test-marker {
                background: transparent !important;
                border: none !important;
                z-index: 1002 !important;
            }
            
            .test-marker div {
                animation: testPulse 2s infinite;
            }
            
            @keyframes testPulse {
                0%, 100% { 
                    transform: scale(1);
                    box-shadow: 0 0 10px red;
                }
                50% { 
                    transform: scale(1.2);
                    box-shadow: 0 0 20px red, 0 0 30px red;
                }
            }
            
            /* 荧光路线样式 */
            .residence-route {
                filter: drop-shadow(0 0 8px #60a5fa) drop-shadow(0 0 16px #60a5fa);
                stroke-linecap: round;
                stroke-linejoin: round;
            }
            
            .residence-route:hover {
                filter: drop-shadow(0 0 12px #60a5fa) drop-shadow(0 0 24px #60a5fa);
                opacity: 1 !important;
            }
            
            @keyframes residenceDash {
                0% {
                    stroke-dashoffset: 30;
                }
                100% {
                    stroke-dashoffset: -30;
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ 科技特效添加完成');
    }
    
    showFallback() {
        this.container.innerHTML = `
            <div style="
                width: 100%;
                height: 600px;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #60a5fa;
                text-align: center;
                position: relative;
                overflow: hidden;
            ">
                <div style="position: relative; z-index: 2;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🗺️</div>
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">科技感旅行地图</div>
                    <div style="font-size: 16px; opacity: 0.8; margin-bottom: 8px;">Leaflet库加载失败</div>
                    <div style="font-size: 14px; opacity: 0.6;">请检查网络连接</div>
                </div>
                
                <div style="
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.1), transparent);
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
        console.log('🔄 备用方案已显示');
    }
    
    destroy() {
        if (this.map) {
            this.map.remove();
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// 导出组件
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechTravelMap;
}

// 全局可用
window.TechTravelMap = TechTravelMap;

console.log('📦 TechTravelMap 科技感旅行地图组件已加载');
