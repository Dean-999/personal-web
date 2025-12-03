// Circular orbit Logo initialization
document.addEventListener('DOMContentLoaded', function() {
    const logoLoopContainer = document.getElementById('logo-loop-container');
    
    if (!logoLoopContainer) {
        console.error('Logo loop container not found!');
        return;
    }

    // Skill icon data - using Simple Icons CDN
    const techIcons = [
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            title: 'GitHub'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
            title: 'TypeScript'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
            title: 'React'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg',
            title: 'JavaScript'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg',
            title: 'Python'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg',
            title: 'Docker'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg',
            title: 'Figma'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/unity.svg',
            title: 'Unity'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/blender.svg',
            title: 'Blender'
        },
        { 
            iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg',
            title: 'VSCode'
        }
    ];

    // Create icons and add to container
    const icons = [];
    techIcons.forEach((icon, index) => {
        const iconEl = document.createElement('div');
        iconEl.className = 'orbit-icon';
        
        const img = document.createElement('img');
        img.src = icon.iconUrl;
        img.alt = icon.title;
        img.style.width = '70%';
        img.style.height = '70%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none';
        img.style.filter = 'brightness(0) saturate(100%) invert(0%)';
        iconEl.appendChild(img);
        
        iconEl.title = icon.title;
        iconEl.dataset.index = index;
        iconEl.dataset.startAngle = (360 / techIcons.length) * index;
        logoLoopContainer.appendChild(iconEl);
        icons.push(iconEl);
    });

    // LogoLoop animation configuration
    const ANIMATION_CONFIG = {
        SMOOTH_TAU: 0.25,
        MIN_COPIES: 2,
        COPY_HEADROOM: 2
    };

    const radius = 51.5;
    const baseSpeed = 12;
    const hoverSpeed = 3;
    
    let rafId = null;
    let lastTimestamp = null;
    let currentAngle = 0;
    let velocity = baseSpeed;
    let isHovered = false;

    logoLoopContainer.addEventListener('mouseenter', () => {
        isHovered = true;
    });
    
    logoLoopContainer.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    function animateIcons(timestamp) {
        if (lastTimestamp === null) {
            lastTimestamp = timestamp;
        }

        const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        const targetVelocity = isHovered ? hoverSpeed : baseSpeed;
        const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
        velocity += (targetVelocity - velocity) * easingFactor;

        currentAngle += velocity * deltaTime;
        if (currentAngle >= 360) currentAngle -= 360;
        if (currentAngle < 0) currentAngle += 360;

        icons.forEach((iconEl, index) => {
            const startAngle = parseFloat(iconEl.dataset.startAngle);
            const angle = (currentAngle + startAngle) % 360;
            const radian = (angle * Math.PI) / 180;
            
            const x = 50 + radius * Math.cos(radian);
            const y = 50 + radius * Math.sin(radian);
            
            iconEl.style.left = `${x}%`;
            iconEl.style.top = `${y}%`;
            iconEl.style.transform = `translate(-50%, -50%)`;
            
            const normalizedAngle = angle / 360;
            const fadeIntensity = (Math.sin(normalizedAngle * Math.PI * 2) + 1) / 2;
            const minOpacity = 0.3;
            const maxOpacity = 1.0;
            const opacity = minOpacity + (maxOpacity - minOpacity) * fadeIntensity;
            
            if (opacity < 0.5) {
                iconEl.setAttribute('data-visibility', 'fade-out');
            } else if (opacity < 0.8) {
                iconEl.setAttribute('data-visibility', 'fade-in');
            } else {
                iconEl.setAttribute('data-visibility', 'visible');
            }
            
            iconEl.style.opacity = opacity;
        });

        rafId = requestAnimationFrame(animateIcons);
    }

    rafId = requestAnimationFrame(animateIcons);
});

// 3D Infinite Menu initialization
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('infinite-grid-menu-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    if (typeof InfiniteGridMenu === 'undefined') {
        console.error('InfiniteGridMenu class not found! Make sure infinite-menu.js is loaded.');
        return;
    }

    const menuItems = [
        {
            title: 'Personal',
            description: 'Discover my passions, hobbies, favorite music, movies, and the things that make me who I am',
            link: 'personal.html',
            colors: ['#667eea', '#764ba2']
        },
        {
            title: 'Academic',
            description: 'Explore my educational background, achievements, coursework, and academic pursuits in mathematics and technology',
            link: 'academic.html',
            colors: ['#f093fb', '#f5576c']
        },
        {
            title: 'Sports',
            description: 'View my athletic journey, swimming competitions, team leadership, and dedication to physical excellence',
            link: 'sport.html',
            colors: ['#DDA0DD', '#BA55D3']
        },
        {
            title: 'Activities',
            description: 'Browse my extracurricular involvement, creative projects, robotics design, and community engagement',
            link: 'extracurricular.html',
            colors: ['#87CEEB', '#4facfe']
        }
    ];

    function updateButtonColor(itemIndex) {
        const button = document.getElementById('menuButton');
        if (button && menuItems[itemIndex]) {
            const colors = menuItems[itemIndex].colors;
            button.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
            const shadowColor = colors[0] + '80';
            button.style.boxShadow = `0 4px 20px ${shadowColor}`;
        }
    }

    try {
        const menu = new InfiniteGridMenu(
            canvas,
            menuItems,
            function(itemIndex) {
                const item = menuItems[itemIndex];
                const title = document.getElementById('menuTitle');
                const description = document.getElementById('menuDescription');
                if (title) title.textContent = item.title;
                if (description) description.textContent = item.description;
                
                updateButtonColor(itemIndex);
            },
            function(isMoving) {
                const title = document.getElementById('menuTitle');
                const description = document.getElementById('menuDescription');
                const button = document.getElementById('menuButton');
                
                if (isMoving) {
                    title?.classList.remove('active');
                    title?.classList.add('inactive');
                    description?.classList.remove('active');
                    description?.classList.add('inactive');
                    button?.classList.remove('active');
                    button?.classList.add('inactive');
                } else {
                    title?.classList.remove('inactive');
                    title?.classList.add('active');
                    description?.classList.remove('inactive');
                    description?.classList.add('active');
                    button?.classList.remove('inactive');
                    button?.classList.add('active');
                }
            },
            function(menuInstance) {
                menuInstance.run();
                updateButtonColor(0);
            }
        );

        const button = document.getElementById('menuButton');
        button?.addEventListener('click', function() {
            const title = document.getElementById('menuTitle')?.textContent;
            const item = menuItems.find(i => i.title === title);
            if (item?.link) {
                window.location.href = item.link;
            }
        });

    } catch(e) {
        console.error('3D Menu initialization failed:', e);
        canvas.style.display = 'none';
        
        const container = document.querySelector('.infinite-menu-container');
        if (container) {
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #666; font-size: 18px;';
            errorMsg.innerHTML = '<p>⚠️ Unable to load 3D menu</p><p style="font-size: 14px; margin-top: 10px;">Your browser may not support WebGL 2.0</p>';
            container.appendChild(errorMsg);
        }
    }
});

