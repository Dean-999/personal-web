// Snowflake background generator
class SnowfallBackground {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            color: options.color || '#ADD8E6',
            quantity: options.quantity || 200,
            speed: options.speed || 0.5,
            maxRadius: options.maxRadius || 5,
            minRadius: options.minRadius || 0.2,
            ...options
        };
        
        this.snowflakes = [];
        this.maxSnowflakes = this.options.quantity;
        this.init();
    }

    init() {
        this.createInitialSnowflakes();
        this.startContinuousGeneration();
    }

    createInitialSnowflakes() {
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.createSnowflake();
        }
    }

    startContinuousGeneration() {
        setInterval(() => {
            if (this.snowflakes.length < this.maxSnowflakes) {
                this.createSnowflake();
            }
        }, 100);
    }

    createSnowflake() {
        const snowflake = document.createElement('div');
        const radius = Math.random() * (this.options.maxRadius - this.options.minRadius) + this.options.minRadius;
        
        if (radius <= 1.5) {
            snowflake.className = 'snowflake small';
        } else if (radius >= 3.5) {
            snowflake.className = 'snowflake large';
        } else {
            snowflake.className = 'snowflake';
        }
        
        const left = Math.random() * 120 - 10;
        const animationDuration = (Math.random() * 6 + 4) / this.options.speed;
        const delay = Math.random() * 3;
        
        snowflake.style.width = `${radius * 2}px`;
        snowflake.style.height = `${radius * 2}px`;
        snowflake.style.left = `${left}%`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        this.container.appendChild(snowflake);
        this.snowflakes.push(snowflake);
        
        snowflake.addEventListener('animationend', () => {
            this.removeSnowflake(snowflake);
        });
    }

    removeSnowflake(snowflake) {
        const index = this.snowflakes.indexOf(snowflake);
        if (index > -1) {
            this.snowflakes.splice(index, 1);
            this.container.removeChild(snowflake);
        }
    }
}

// Decrypted text effect
function createDecryptedText(element, options = {}) {
    const text = element.textContent;
    const speed = options.speed || 50;
    const characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    let isAnimating = false;
    let interval = null;
    
    const chars = text.split('');
    const charElements = [];
    
    element.innerHTML = '';
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'decrypted-char';
        
        if (char === ' ') {
            span.style.width = '0.25em';
            span.style.display = 'inline-block';
        }
        
        charElements.push(span);
        element.appendChild(span);
    });
    
    function scrambleText() {
        if (isAnimating) return;
        isAnimating = true;
        
        let iteration = 0;
        const maxIterations = options.maxIterations || 10;
        
        interval = setInterval(() => {
            charElements.forEach((span, index) => {
                if (iteration < maxIterations) {
                    if (chars[index] === ' ') {
                        span.textContent = ' ';
                        span.style.color = '';
                        span.style.fontWeight = '';
                    } else {
                        const randomChar = characters[Math.floor(Math.random() * characters.length)];
                        span.textContent = randomChar;
                        span.style.color = '#48ACC7';
                        span.style.fontWeight = '600';
                    }
                } else {
                    span.textContent = chars[index];
                    span.style.color = '';
                    span.style.fontWeight = '';
                }
            });
            
            iteration++;
            if (iteration > maxIterations) {
                clearInterval(interval);
                isAnimating = false;
            }
        }, speed);
    }
    
    function resetText() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        isAnimating = false;
        
        charElements.forEach((span, index) => {
            span.textContent = chars[index];
            span.style.color = '';
            span.style.fontWeight = '';
        });
    }
    
    element.addEventListener('mouseenter', scrambleText);
    element.addEventListener('mouseleave', resetText);
    
    element.style.cursor = 'pointer';
    element.style.display = 'inline-block';
}

// Profile Card 3D Tilt Effect
class ProfileCardTilt {
    constructor() {
        this.cardWrapper = document.querySelector('.pc-card-wrapper');
        this.card = document.querySelector('.pc-card');
        this.isActive = false;
        this.rafId = null;
        
        if (this.cardWrapper && this.card) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.setInitialPosition();
    }

    bindEvents() {
        this.cardWrapper.addEventListener('pointerenter', this.handlePointerEnter.bind(this));
        this.cardWrapper.addEventListener('pointermove', this.handlePointerMove.bind(this));
        this.cardWrapper.addEventListener('pointerleave', this.handlePointerLeave.bind(this));
    }

    handlePointerEnter() {
        this.isActive = true;
        this.cardWrapper.classList.add('active');
        this.card.classList.add('active');
    }

    handlePointerMove(event) {
        if (!this.isActive) return;
        
        const rect = this.card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        this.updateCardTransform(x, y);
    }

    handlePointerLeave(event) {
        this.isActive = false;
        this.cardWrapper.classList.remove('active');
        this.card.classList.remove('active');
        
        this.smoothReturnToCenter();
    }

    updateCardTransform(x, y) {
        const width = this.card.clientWidth;
        const height = this.card.clientHeight;
        
        const percentX = Math.min(Math.max((100 / width) * x, 0), 100);
        const percentY = Math.min(Math.max((100 / height) * y, 0), 100);
        
        const centerX = percentX - 50;
        const centerY = percentY - 50;
        
        const rotateX = -(centerX / 5);
        const rotateY = centerY / 4;
        
        document.documentElement.style.setProperty('--pointer-x', `${percentX}%`);
        document.documentElement.style.setProperty('--pointer-y', `${percentY}%`);
        document.documentElement.style.setProperty('--background-x', `${this.adjust(percentX, 0, 100, 35, 65)}%`);
        document.documentElement.style.setProperty('--background-y', `${this.adjust(percentY, 0, 100, 35, 65)}%`);
        document.documentElement.style.setProperty('--pointer-from-center', `${Math.min(Math.hypot(percentY - 50, percentX - 50) / 50, 1)}`);
        document.documentElement.style.setProperty('--pointer-from-top', `${percentY / 100}`);
        document.documentElement.style.setProperty('--pointer-from-left', `${percentX / 100}`);
        document.documentElement.style.setProperty('--rotate-x', `${this.round(rotateX)}deg`);
        document.documentElement.style.setProperty('--rotate-y', `${this.round(rotateY)}deg`);
    }

    smoothReturnToCenter() {
        const startTime = performance.now();
        const duration = 600;
        const startX = this.card.clientWidth / 2;
        const startY = this.card.clientHeight / 2;
        const targetX = this.card.clientWidth / 2;
        const targetY = this.card.clientHeight / 2;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = this.easeInOutCubic(progress);

            const currentX = this.adjust(easedProgress, 0, 1, startX, targetX);
            const currentY = this.adjust(easedProgress, 0, 1, startY, targetY);

            this.updateCardTransform(currentX, currentY);

            if (progress < 1) {
                this.rafId = requestAnimationFrame(animate);
            }
        };

        this.rafId = requestAnimationFrame(animate);
    }

    setInitialPosition() {
        const initialX = this.cardWrapper.clientWidth - 70;
        const initialY = 60;
        this.updateCardTransform(initialX, initialY);
    }

    adjust(value, fromMin, fromMax, toMin, toMax) {
        return this.round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    }

    round(value, precision = 3) {
        return parseFloat(value.toFixed(precision));
    }

    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize snowflake background
    const snowfallContainer = document.getElementById('snowfall-bg');
    if (snowfallContainer) {
        new SnowfallBackground(snowfallContainer, {
            color: '#48ACC7',
            quantity: 300,
            speed: 0.5,
            maxRadius: 5,
            minRadius: 0.2
        });
    }

    // Initialize DecryptedText effect
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        createDecryptedText(nameElement, {
            speed: 80,
            maxIterations: 15,
            characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
        });
    }

    // Add decryption effect for role text
    const roleElements = document.querySelectorAll('.role');
    roleElements.forEach((roleElement) => {
        createDecryptedText(roleElement, {
            speed: 60,
            maxIterations: 12,
            characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
        });
    });

    // Add scroll parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Initialize Profile Card effect
    new ProfileCardTilt();
    
    // Contact button functionality
    const contactBtn = document.querySelector('.pc-contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.location.href = 'tel:+17064093286';
        });
    }
});

