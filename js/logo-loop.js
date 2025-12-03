// Logo Loop Animation - Converted from React to Vanilla JS
(function() {
    'use strict';

    const ANIMATION_CONFIG = {
        SMOOTH_TAU: 0.25,
        MIN_COPIES: 2,
        COPY_HEADROOM: 2
    };

    class LogoLoop {
        constructor(container, options = {}) {
            this.container = container;
            this.options = {
                logos: options.logos || [],
                speed: options.speed || 120,
                direction: options.direction || 'left',
                logoHeight: options.logoHeight || 28,
                gap: options.gap || 32,
                pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
                fadeOut: options.fadeOut !== undefined ? options.fadeOut : true,
                scaleOnHover: options.scaleOnHover !== undefined ? options.scaleOnHover : true,
                fadeOutColor: options.fadeOutColor || null
            };

            this.trackElement = null;
            this.seqElement = null;
            this.seqWidth = 0;
            this.copyCount = ANIMATION_CONFIG.MIN_COPIES;
            this.isHovered = false;

            // Animation state
            this.rafId = null;
            this.lastTimestamp = null;
            this.offset = 0;
            this.velocity = 0;

            // Observers
            this.resizeObserver = null;
            this.imageLoadCount = 0;
            this.totalImages = 0;

            this.init();
        }

        init() {
            this.createDOM();
            this.setupEventListeners();
            this.setupResizeObserver();
            this.loadImages();
            this.startAnimation();
        }

        createDOM() {
            // Create track
            this.trackElement = document.createElement('div');
            this.trackElement.className = 'logoloop__track';

            // Set CSS variables
            this.container.style.setProperty('--logoloop-gap', `${this.options.gap}px`);
            this.container.style.setProperty('--logoloop-logoHeight', `${this.options.logoHeight}px`);
            if (this.options.fadeOutColor) {
                this.container.style.setProperty('--logoloop-fadeColor', this.options.fadeOutColor);
            }

            // Add classes
            const classes = ['logoloop'];
            if (this.options.fadeOut) classes.push('logoloop--fade');
            if (this.options.scaleOnHover) classes.push('logoloop--scale-hover');
            this.container.className = classes.join(' ');

            // Create initial sequence
            this.seqElement = this.createSequence(0);
            this.trackElement.appendChild(this.seqElement);
            
            this.container.appendChild(this.trackElement);
        }

        createSequence(copyIndex) {
            const list = document.createElement('ul');
            list.className = 'logoloop__list';
            list.setAttribute('role', 'list');
            if (copyIndex > 0) {
                list.setAttribute('aria-hidden', 'true');
            }

            this.options.logos.forEach((item, itemIndex) => {
                const listItem = this.createLogoItem(item, `${copyIndex}-${itemIndex}`);
                list.appendChild(listItem);
            });

            return list;
        }

        createLogoItem(item, key) {
            const li = document.createElement('li');
            li.className = 'logoloop__item';
            li.setAttribute('role', 'listitem');

            let content;

            if (item.node) {
                // Custom HTML node
                const span = document.createElement('span');
                span.className = 'logoloop__node';
                if (typeof item.node === 'string') {
                    span.innerHTML = item.node;
                } else {
                    span.appendChild(item.node);
                }
                if (item.href && !item.ariaLabel) {
                    span.setAttribute('aria-hidden', 'true');
                }
                content = span;
            } else {
                // Image
                const img = document.createElement('img');
                img.src = item.src;
                if (item.srcSet) img.srcSet = item.srcSet;
                if (item.sizes) img.sizes = item.sizes;
                if (item.width) img.width = item.width;
                if (item.height) img.height = item.height;
                img.alt = item.alt || '';
                if (item.title) img.title = item.title;
                img.loading = 'lazy';
                img.decoding = 'async';
                img.draggable = false;
                content = img;
                this.totalImages++;
            }

            if (item.href) {
                const link = document.createElement('a');
                link.className = 'logoloop__link';
                link.href = item.href;
                const ariaLabel = item.ariaLabel || item.title || item.alt || 'logo link';
                link.setAttribute('aria-label', ariaLabel);
                link.target = '_blank';
                link.rel = 'noreferrer noopener';
                link.appendChild(content);
                li.appendChild(link);
            } else {
                li.appendChild(content);
            }

            return li;
        }

        setupEventListeners() {
            if (this.options.pauseOnHover) {
                this.container.addEventListener('mouseenter', () => {
                    this.isHovered = true;
                });
                this.container.addEventListener('mouseleave', () => {
                    this.isHovered = false;
                });
            }
        }

        setupResizeObserver() {
            if (window.ResizeObserver) {
                this.resizeObserver = new ResizeObserver(() => {
                    this.updateDimensions();
                });
                this.resizeObserver.observe(this.container);
                if (this.seqElement) {
                    this.resizeObserver.observe(this.seqElement);
                }
            } else {
                window.addEventListener('resize', () => this.updateDimensions());
            }
            this.updateDimensions();
        }

        loadImages() {
            if (this.totalImages === 0) {
                this.updateDimensions();
                return;
            }

            const images = this.seqElement.querySelectorAll('img');
            images.forEach(img => {
                if (img.complete) {
                    this.handleImageLoad();
                } else {
                    img.addEventListener('load', () => this.handleImageLoad(), { once: true });
                    img.addEventListener('error', () => this.handleImageLoad(), { once: true });
                }
            });
        }

        handleImageLoad() {
            this.imageLoadCount++;
            if (this.imageLoadCount === this.totalImages) {
                this.updateDimensions();
            }
        }

        updateDimensions() {
            const containerWidth = this.container.clientWidth;
            const sequenceWidth = this.seqElement.getBoundingClientRect().width;

            if (sequenceWidth > 0) {
                this.seqWidth = Math.ceil(sequenceWidth);
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
                const newCopyCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);

                if (newCopyCount !== this.copyCount) {
                    this.copyCount = newCopyCount;
                    this.updateCopies();
                }
            }
        }

        updateCopies() {
            // Remove all but first sequence
            while (this.trackElement.children.length > 1) {
                this.trackElement.removeChild(this.trackElement.lastChild);
            }

            // Add copies
            for (let i = 1; i < this.copyCount; i++) {
                const copy = this.createSequence(i);
                this.trackElement.appendChild(copy);
            }
        }

        startAnimation() {
            const animate = (timestamp) => {
                if (this.lastTimestamp === null) {
                    this.lastTimestamp = timestamp;
                }

                const deltaTime = Math.max(0, timestamp - this.lastTimestamp) / 1000;
                this.lastTimestamp = timestamp;

                // Calculate target velocity
                const magnitude = Math.abs(this.options.speed);
                const directionMultiplier = this.options.direction === 'left' ? 1 : -1;
                const speedMultiplier = this.options.speed < 0 ? -1 : 1;
                const targetVelocity = magnitude * directionMultiplier * speedMultiplier;

                const target = (this.options.pauseOnHover && this.isHovered) ? 0 : targetVelocity;

                // Smooth velocity transition
                const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
                this.velocity += (target - this.velocity) * easingFactor;

                // Update position
                if (this.seqWidth > 0) {
                    let nextOffset = this.offset + this.velocity * deltaTime;
                    nextOffset = ((nextOffset % this.seqWidth) + this.seqWidth) % this.seqWidth;
                    this.offset = nextOffset;

                    const translateX = -this.offset;
                    this.trackElement.style.transform = `translate3d(${translateX}px, 0, 0)`;
                }

                this.rafId = requestAnimationFrame(animate);
            };

            this.rafId = requestAnimationFrame(animate);
        }

        destroy() {
            if (this.rafId !== null) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
            this.container.innerHTML = '';
        }
    }

    // Export to global scope
    window.LogoLoop = LogoLoop;

    console.log('✅ LogoLoop loaded successfully!');

})();

