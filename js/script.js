// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing all components...');
    
    // Initialize time distribution chart
    initTimeChart();
    
    // Initialize age activity chart
    initAgeChart();
    
    // Initialize other features
    initMapInteractions();
    initMiniCharts();
    initActivityCards();
    initTimelineInteraction();
    
    // Initialize world map
    initWorldMap();
});

/**
 * Initialize time distribution chart
 * Use Chart.js to create grouped bar chart, clearly showing time allocation for each age group
 */
function initTimeChart() {
    const ctx = document.getElementById('timeChart');
    if (!ctx) {
        console.log('Time chart canvas not found');
        return;
    }

    console.log('Initializing time chart...');

    // Time distribution data (ages 2-16, based on user-provided schedule)
    const timeData = {
        labels: ['2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10 years', '11 years', '12 years', '13 years', '14 years', '15 years', '16 years'],
        datasets: [{
            label: 'Learning',
            data: [90, 90, 90, 90, 90, 85, 85, 80, 80, 75, 75, 75, 80, 70, 70],
            backgroundColor: 'rgba(74, 144, 226, 0.8)',
            borderColor: '#4A90E2',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Go Strategy',
            data: [0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(126, 211, 33, 0.8)',
            borderColor: '#7ED321',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Mineral Research',
            data: [0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10],
            backgroundColor: 'rgba(80, 227, 194, 0.8)',
            borderColor: '#50E3C2',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Swimming',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10],
            backgroundColor: 'rgba(245, 166, 35, 0.8)',
            borderColor: '#F5A623',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Guitar',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10],
            backgroundColor: 'rgba(189, 16, 224, 0.8)',
            borderColor: '#BD10E0',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Robotics & 3D',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
            backgroundColor: 'rgba(255, 107, 107, 0.8)',
            borderColor: '#FF6B6B',
            borderWidth: 1,
            fill: true
        }, {
            label: 'UI/UX Design',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
            backgroundColor: 'rgba(78, 205, 196, 0.8)',
            borderColor: '#4ECDC4',
            borderWidth: 1,
            fill: true
        }, {
            label: 'Coding',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10],
            backgroundColor: 'rgba(150, 206, 180, 0.8)',
            borderColor: '#96CEB4',
            borderWidth: 1,
            fill: true
        }]
    };

    // Create chart
    const timeChart = new Chart(ctx, {
        type: 'bar',
        data: timeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            return `Age: ${context[0].label}`;
                        },
                        label: function(context) {
                            if (context.parsed.y > 0) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                            return null;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Age (Years)',
                        color: '#1e293b',
                        font: {
                            size: 14,
                            weight: '700'
                        },
                        padding: {
                            top: 10
                        }
                    }
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(102, 126, 234, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 10,
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time Share (%)',
                        color: '#1e293b',
                        font: {
                            size: 14,
                            weight: '700'
                        },
                        padding: {
                            bottom: 10
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });

    console.log('Time chart initialized successfully');
}

/**
 * Initialize map interaction functionality
 */
function initMapInteractions() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        // Add click event
        marker.addEventListener('click', function() {
            // Remove active state from other markers
            mapMarkers.forEach(m => m.classList.remove('active'));
            
            // Add active state to current marker
            this.classList.add('active');
            
            // Display location information
            showLocationInfo(this);
        });
        
        // Add hover effect
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.3)';
        });
        
        marker.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
    
    // Add statistics button click event
    const statsButton = document.querySelector('.stats-button');
    if (statsButton) {
        statsButton.addEventListener('click', function() {
            showTravelStatistics();
        });
    }
}

/**
 * Display location information
 */
function showLocationInfo(marker) {
    // Create or update location information display
    let infoBox = document.querySelector('.location-info-box');
    
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.className = 'location-info-box';
        document.querySelector('.map-container').appendChild(infoBox);
    }
    
    // Set information content based on marker position
    const locations = {
        'current-location': {
            name: 'Suzhou, China',
            description: 'Currently living here',
            details: 'Beautiful city with rich culture and modern technology'
        }
    };
    
    const markerClass = Array.from(marker.classList).find(cls => 
        cls !== 'map-marker' && cls !== 'active'
    );
    
    if (markerClass && locations[markerClass]) {
        const location = locations[markerClass];
        infoBox.innerHTML = `
            <h4>${location.name}</h4>
            <p>${location.description}</p>
            <p>${location.details}</p>
        `;
        infoBox.style.display = 'block';
    }
}

/**
 * Display travel statistics information
 */
function showTravelStatistics() {
    // Create statistics popup
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Travel Statistics</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="stat-item">
                    <span class="stat-number">15</span>
                    <span class="stat-label">Countries Visited</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">8</span>
                    <span class="stat-label">Years Traveling</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">3</span>
                    <span class="stat-label">Continents</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">Suzhou</span>
                    <span class="stat-label">Current Location</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close event
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add CSS styles
    if (!document.querySelector('#stats-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'stats-modal-styles';
        style.textContent = `
            .stats-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #333;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .close-btn:hover {
                background-color: #f0f0f0;
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .stat-item {
                text-align: center;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 15px;
            }
            
            .stat-number {
                display: block;
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
                margin-bottom: 5px;
            }
            
            .stat-label {
                font-size: 14px;
                color: #666;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize small chart animations
 */
function initMiniCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    // Add entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'barGrow 1s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Add CSS animation
    if (!document.querySelector('#mini-chart-styles')) {
        const style = document.createElement('style');
        style.id = 'mini-chart-styles';
        style.textContent = `
            .chart-bar {
                transform: scaleY(0);
                transform-origin: bottom;
            }
            
            @keyframes barGrow {
                from { transform: scaleY(0); }
                to { transform: scaleY(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize activity card interactions
 */
function initActivityCards() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        // Add click event
        card.addEventListener('click', function(e) {
            // Check if clicked element is inside 3D container
            const target = e.target;
            if (target.closest('.card-3d-container')) {
                // Remove active state from other cards
                activityCards.forEach(c => c.classList.remove('active'));
                
                // Add active state to current card
                this.classList.add('active');
                
                // Display detailed information
                showActivityDetails(this);
            }
        });
        
        // Add hover effect (works with 3D effect)
        card.addEventListener('mouseenter', function() {
            // 3D effect handled by 3d-card.js
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.zIndex = '1';
            }
            // Reset card's 3D tilt effect
            this.style.transform = '';
        });
        
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse x coordinate within card
            const y = e.clientY - rect.top;  // Mouse y coordinate within card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation angle (-15 to 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Apply 3D transform
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px) 
                scale(1.03)
            `;
        });
    });
}

/**
 * Display activity detailed information
 */
function showActivityDetails(card) {
    const category = card.dataset.category;
    const title = card.querySelector('.activity-title').textContent;
    
    // Create detailed information popup
    let detailModal = document.querySelector('.activity-detail-modal');
    
    if (!detailModal) {
        detailModal = document.createElement('div');
        detailModal.className = 'activity-detail-modal';
        document.body.appendChild(detailModal);
    }
    
    // Set detailed information based on category
    const details = getActivityDetails(category);
    
    detailModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>📅 Timeline</h4>
                    <p>${details.timeline}</p>
                </div>
                <div class="detail-section">
                    <h4>📊 Statistics</h4>
                    <p>${details.stats}</p>
                </div>
                <div class="detail-section">
                    <h4>💡 Description</h4>
                    <p>${details.description}</p>
                </div>
            </div>
        </div>
    `;
    
    detailModal.style.display = 'flex';
    
    // Add close event
    const closeBtn = detailModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        detailModal.style.display = 'none';
        // Remove card's active state
        card.classList.remove('active');
    });
    
    // Close when clicking outside modal
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.style.display = 'none';
            card.classList.remove('active');
        }
    });
}

/**
 * Get activity detailed information
 */
function getActivityDetails(category) {
    // Activity detail data
    const activityDetails = {
        'go-card': {
            title: 'Go Strategy',
            description: 'Learning is my greatest passion. I\'m curious about almost everything in the world. From kindergarten to high school, learning has always occupied most of my time.',
            details: [
                {
                    timeline: 'Age 7-11, 4 years of strategic thinking',
                    description: 'Learned Go during elementary school, developing strategic thinking and concentration skills.'
                }
            ]
        },
        'minerals-card': {
            title: 'Mineral Research',
            description: 'My lifelong passion for learning has driven me to explore various fields. I believe knowledge is the key to understanding the world.',
            details: [
                {
                    timeline: 'Age 9-16+, 7+ years of exploration',
                    description: 'Started exploring robotics design and 3D modeling, diving into the world of technology.'
                }
            ]
        },
        'swimming-card': {
            title: 'Swimming',
            description: 'Physical activities are essential for a balanced life. Swimming has taught me discipline and perseverance.',
            details: [
                {
                    timeline: 'Age 10-16+, 6+ years of aquatic skills',
                    description: 'Started learning swimming, building physical strength and perseverance.'
                }
            ]
        },
        'guitar-card': {
            title: 'Guitar',
            description: 'Music is the universal language that connects people across cultures and generations.',
            details: [
                {
                    timeline: 'Age 11-16+, 5+ years of musical expression',
                    description: 'Started learning guitar to express creativity through music.'
                }
            ]
        },
        'robotics-card': {
            title: 'Robotics & 3D Design',
            description: 'Technology is the future, and I want to be part of creating innovative solutions.',
            details: [
                {
                    timeline: 'Age 15-16+, 1+ year of technical innovation',
                    description: 'Started exploring robotics design and 3D modeling, diving into the world of technology.'
                }
            ]
        },
        'uiux-card': {
            title: 'UI/UX Design',
            description: 'Good design makes technology accessible and enjoyable for everyone.',
            details: [
                {
                    timeline: 'Age 15-16+, 1+ year of design thinking',
                    description: 'Learning UI/UX design to develop user interface design thinking.'
                }
            ]
        },
        'code-card': {
            title: 'Coding',
            description: 'Programming is like learning a new language that can create anything you can imagine.',
            details: [
                {
                    timeline: 'Age 15-16+, 1+ year of digital skills',
                    description: 'Started learning coding. Though not very proficient yet, I\'m working hard to improve.'
                }
            ]
        },
        'vr': {
            title: 'VR Gaming',
            description: 'Virtual reality opens up new dimensions of experiences and possibilities. It represents the future of immersive entertainment and interaction.',
            details: [
                {
                    timeline: 'Age 15-16+, 1+ year of virtual exploration',
                    description: 'Exploring virtual reality gaming and immersive experiences, discovering new ways to interact with digital worlds.'
                }
            ]
        }
    };
    
    return activityDetails[category] || activityDetails['study-card']; // Default return study's detailed information
}

/**
 * Initialize timeline interaction
 */
function initTimelineInteraction() {
    const milestones = document.querySelectorAll('.timeline-milestone');
    
    milestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            const age = this.dataset.age;
            const label = this.querySelector('.milestone-label').textContent;
            
            // Highlight current milestone
            milestones.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Display detailed information for that age group
            showAgeDetails(age, label);
        });
    });
}

/**
 * Display age group detailed information
 */
function showAgeDetails(age, label) {
    // Create age group information popup
    let ageModal = document.querySelector('.age-detail-modal');
    
    if (!ageModal) {
        ageModal = document.createElement('div');
        ageModal.className = 'age-detail-modal';
        document.body.appendChild(ageModal);
    }
    
    const ageInfo = getAgeDetails(age, label);
    
    ageModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${age} years - ${label}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="age-timeline">
                    <div class="age-marker">${age} years</div>
                    <div class="age-info">
                        <h4>🎯 Main Activities</h4>
                        <p>${ageInfo.activities}</p>
                        <h4>📚 Learning Content</h4>
                        <p>${ageInfo.learning}</p>
                        <h4>🌟 Important Events</h4>
                        <p>${ageInfo.events}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    ageModal.style.display = 'flex';
    
    // Add close event
    const closeBtn = ageModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        ageModal.style.display = 'none';
        // Remove milestone's active state
        document.querySelectorAll('.timeline-milestone').forEach(m => m.classList.remove('active'));
    });
    
    // Close when clicking outside modal
    ageModal.addEventListener('click', (e) => {
        if (e.target === ageModal) {
            ageModal.style.display = 'none';
            document.querySelectorAll('.timeline-milestone').forEach(m => m.classList.remove('active'));
        }
    });
}

/**
 * Get age group detailed information
 */
function getAgeDetails(age, label) {
    // Age detail data
    const ageDetails = {
        2: {
            learning: 'Basic subjects and social skills',
            events: 'Transition from home to kindergarten, major change in learning environment'
        },
        6: {
            learning: 'Core subjects: Math, English, Science and other fundamental knowledge',
            events: 'Started formal education, developing independent thinking and study habits'
        },
        12: {
            learning: 'Advanced subjects and critical thinking',
            events: 'Middle school transition, increased academic challenges and responsibilities'
        },
        14: {
            learning: 'High school preparation and exam skills',
            events: 'High school entrance exam, preparing for the future'
        },
        15: {
            learning: 'International education and cultural adaptation',
            events: 'Moved to the United States, adapting to new educational system'
        }
    };
    
    return ageDetails[age] || {
        activities: 'Continue learning and exploring',
        learning: 'Deepen professional knowledge, develop comprehensive abilities',
        events: 'Preparing for the future'
    };
}

/**
 * Add page scroll effects
 */
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initial animation on page load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize World Map Component
function initWorldMap() {
    console.log('Initializing World Map...');
    
    // Travel data based on the timeline
    const travelData = [
        {
            start: { lat: 13.7563, lng: 100.5018, label: "Thailand" }, // Thailand
            end: { lat: 23.6978, lng: 120.9605, label: "Taiwan" }       // Taiwan
        },
        {
            start: { lat: 23.6978, lng: 120.9605, label: "Taiwan" },    // Taiwan
            end: { lat: 34.3416, lng: 108.9398, label: "Xi'an" }        // Xi'an
        },
        {
            start: { lat: 34.3416, lng: 108.9398, label: "Xi'an" },     // Xi'an
            end: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" }    // Hong Kong
        },
        {
            start: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" }, // Hong Kong
            end: { lat: 1.3521, lng: 103.8198, label: "Singapore" }      // Singapore
        },
        {
            start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },  // Singapore
            end: { lat: 25.2048, lng: 55.2708, label: "Dubai" }          // Dubai
        },
        {
            start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },      // Dubai
            end: { lat: 25.0330, lng: 102.7004, label: "Yunnan" }        // Yunnan
        },
        {
            start: { lat: 25.0330, lng: 102.7004, label: "Yunnan" },    // Yunnan
            end: { lat: 39.8283, lng: -98.5795, label: "United States" } // United States
        }
    ];

    // Create SVG elements
    createTravelPaths(travelData);
    createTravelPoints(travelData);
    
    console.log('World Map initialized successfully');
}

// Create curved travel paths
function createTravelPaths(travelData) {
    const pathsGroup = document.getElementById('travelPaths');
    if (!pathsGroup) return;

    travelData.forEach((dot, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const start = projectPoint(dot.start.lat, dot.start.lng);
        const end = projectPoint(dot.end.lat, dot.end.lng);
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        
        path.setAttribute('d', `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'url(#path-gradient)');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-dasharray', '1000');
        path.setAttribute('stroke-dashoffset', '1000');
        path.classList.add('travel-path');
        path.style.animationDelay = `${0.5 * index}s`;
        
        pathsGroup.appendChild(path);
    });
}

// Create travel points with pulsing animation
function createTravelPoints(travelData) {
    const pointsGroup = document.getElementById('travelPoints');
    if (!pointsGroup) return;

    // Create start and end points for each travel segment
    travelData.forEach((dot, index) => {
        // Start point
        createPoint(pointsGroup, dot.start, index, 'start');
        // End point
        createPoint(pointsGroup, dot.end, index, 'end');
    });
}

// Create individual point with pulsing animation
function createPoint(container, point, index, type) {
    const pointGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Main point
    const mainCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const coords = projectPoint(point.lat, point.lng);
    
    mainCircle.setAttribute('cx', coords.x);
    mainCircle.setAttribute('cy', coords.y);
    mainCircle.setAttribute('r', '2');
    mainCircle.setAttribute('fill', '#0EA5E9');
    mainCircle.classList.add('travel-point');
    mainCircle.style.setProperty('--delay', index);
    
    // Pulsing circle
    const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulseCircle.setAttribute('cx', coords.x);
    pulseCircle.setAttribute('cy', coords.y);
    pulseCircle.setAttribute('r', '2');
    pulseCircle.setAttribute('fill', '#0EA5E9');
    pulseCircle.setAttribute('opacity', '0.5');
    
    // Add pulsing animation
    const animateR = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateR.setAttribute('attributeName', 'r');
    animateR.setAttribute('from', '2');
    animateR.setAttribute('to', '8');
    animateR.setAttribute('dur', '1.5s');
    animateR.setAttribute('begin', '0s');
    animateR.setAttribute('repeatCount', 'indefinite');
    
    const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateOpacity.setAttribute('attributeName', 'opacity');
    animateOpacity.setAttribute('from', '0.5');
    animateOpacity.setAttribute('to', '0');
    animateOpacity.setAttribute('dur', '1.5s');
    animateOpacity.setAttribute('begin', '0s');
    animateOpacity.setAttribute('repeatCount', 'indefinite');
    
    pulseCircle.appendChild(animateR);
    pulseCircle.appendChild(animateOpacity);
    
    pointGroup.appendChild(mainCircle);
    pointGroup.appendChild(pulseCircle);
    
    // Add click event for location details
    mainCircle.addEventListener('click', () => {
        showLocationDetails(point.label, getAgeFromLocation(point.label));
    });
    
    container.appendChild(pointGroup);
}

// Project lat/lng to SVG coordinates
function projectPoint(lat, lng) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
}

// Get age from location for display
function getAgeFromLocation(location) {
    const ageMap = {
        'Thailand': 'Age 3',
        'Taiwan': 'Age 6',
        'Xi\'an': 'Age 8',
        'Hong Kong': 'Age 9',
        'Singapore': 'Age 10',
        'Dubai': 'Age 12',
        'Yunnan': 'Age 14',
        'United States': 'Age 15'
    };
    return ageMap[location] || 'Unknown Age';
}

/**
 * Initialize age activity distribution chart
 * Create horizontal stacked bar chart showing activity proportions for each age group
 */
function initAgeChart() {
    const ctx = document.getElementById('ageChart');
    if (!ctx) {
        console.log('Age chart canvas not found');
        return;
    }

    console.log('Initializing age chart...');

    // Age activity data - horizontal stacked bar chart (grouped by age, other activities reduced by 3%)
    const ageData = {
        labels: ['Age 0-2', 'Age 3-5', 'Age 6-8', 'Age 10-12', 'Age 12-14', 'Age 15', 'Age 15-16'],
        datasets: [
            {
                label: 'Family & Learning',
                data: [100, 100, 80, 60, 80, 92, 50],
                backgroundColor: '#4A90E2',
                borderColor: '#4A90E2',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Go Strategy',
                data: [0, 0, 18, 0, 0, 0, 0],
                backgroundColor: '#7ED321',
                borderColor: '#7ED321',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Mineral Interest',
                data: [0, 0, 2, 5, 2, 0, 5],
                backgroundColor: '#50E3C2',
                borderColor: '#50E3C2',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Swimming',
                data: [0, 0, 0, 20, 10, 8, 15],
                backgroundColor: '#F5A623',
                borderColor: '#F5A623',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Guitar',
                data: [0, 0, 0, 15, 8, 0, 10],
                backgroundColor: '#BD10E0',
                borderColor: '#BD10E0',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Robotics & 3D',
                data: [0, 0, 0, 0, 0, 0, 10],
                backgroundColor: '#FF6B6B',
                borderColor: '#FF6B6B',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'UI/UX Design',
                data: [0, 0, 0, 0, 0, 0, 5],
                backgroundColor: '#4ECDC4',
                borderColor: '#4ECDC4',
                borderWidth: 0,
                borderSkipped: false
            },
            {
                label: 'Coding',
                data: [0, 0, 0, 0, 0, 0, 5],
                backgroundColor: '#96CEB4',
                borderColor: '#96CEB4',
                borderWidth: 0,
                borderSkipped: false
            }
        ]
    };

    // Create horizontal stacked bar chart
    const ageChart = new Chart(ctx, {
        type: 'bar',
        data: ageData,
        options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#0EA5E9',
                    borderWidth: 2,
                    cornerRadius: 12,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            if (context.parsed.x > 0) {
                                return `${context.dataset.label}: ${context.parsed.x}%`;
                            }
                            return null;
                        },
                        afterBody: function(context) {
                            return `Total: 100% Activities`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 20,
                        color: '#64748b',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time Share (%)',
                        color: '#1e293b',
                        font: {
                            size: 14,
                            weight: '700'
                        },
                        padding: {
                            top: 10
                        }
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#1e293b',
                        font: {
                            size: 14,
                            weight: '700'
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'y',
                intersect: false
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            },
            layout: {
                padding: {
                    right: 20
                }
            },
            // Set bar width
            barThickness: 35,
            maxBarThickness: 45
        }
    });

    console.log('Age chart initialized successfully');
}

// Function to show age details
function showAgeDetails(age, ageIndex, datasets) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    // Get activities for this age
    const ageActivities = [];
    datasets.forEach((dataset, datasetIndex) => {
        const value = dataset.data[ageIndex];
        if (value > 0) {
            ageActivities.push({
                name: dataset.label,
                percentage: value,
                color: dataset.backgroundColor
            });
        }
    });
    
    modal.innerHTML = `
        <div class="modal-content age-details-modal">
            <div class="modal-header">
                <h3>Age ${age} - Activity Breakdown</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="age-summary">
                    <div class="age-info">
                        <div class="age-number">${age}</div>
                        <div class="age-description">Total Activities: ${ageActivities.length}</div>
                    </div>
                </div>
                <div class="activities-breakdown">
                    ${ageActivities.map(activity => `
                        <div class="activity-item">
                            <div class="activity-color" style="background: ${activity.color}"></div>
                            <div class="activity-info">
                                <div class="activity-name">${activity.name}</div>
                                <div class="activity-percentage">${activity.percentage}%</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="age-context">
                    <h4>Age ${age} Development Context</h4>
                    <p>${getAgeDevelopmentContext(age)}</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Helper function to get age development context
function getAgeDevelopmentContext(age) {
    const contexts = {
        '2 years': 'Early childhood development, starting kindergarten, learning basic social skills and fundamental knowledge.',
        '3 years': 'Building on early learning, developing language skills and basic cognitive abilities.',
        '4 years': 'Expanding interests beyond basic learning, starting to explore hobbies and activities.',
        '5 years': 'Pre-school preparation, developing more complex skills and interests.',
        '6 years': 'Elementary school begins, systematic learning approach, developing reading, writing, and math skills.',
        '7 years': 'Building on elementary foundation, exploring new interests and hobbies while maintaining academic focus.',
        '8 years': 'Middle childhood, expanding interests beyond academics, developing personal hobbies and skills.',
        '9 years': 'Pre-adolescence, balancing academics with growing extracurricular activities and personal interests.',
        '10 years': 'Early adolescence, developing more complex skills and interests, preparing for middle school transition.',
        '11 years': 'Middle school preparation, developing independent thinking and study habits.',
        '12 years': 'Middle school begins, increased academic challenges, developing critical thinking skills.',
        '13 years': 'Advanced middle school, exploring career interests and developing specialized knowledge.',
        '14 years': 'High school preparation, developing expertise in chosen areas and preparing for future education.',
        '15 years': 'High school years, exploring career interests, developing specialized skills and knowledge.',
        '16 years': 'Advanced high school, preparing for future education and career paths, developing expertise in chosen areas.'
    };
    return contexts[age] || 'Age development context information not available.';
}

// Show location details modal
function showLocationDetails(locationName, age) {
    // Create modal content based on location
    let description = '';
    let highlights = '';
    
    switch(locationName) {
        case 'Thailand':
            description = 'My first international trip at age 3. Experienced tropical beaches and Thai culture.';
            highlights = 'Beaches, Culture, First Flight';
            break;
        case 'Taiwan':
            description = 'Explored the beautiful island at age 6. Visited Taipei and experienced local cuisine.';
            highlights = 'Taipei, Food, Island Life';
            break;
        case 'Xi\'an':
            description = 'Discovered ancient Chinese history at age 8. Visited the Terracotta Warriors.';
            highlights = 'History, Terracotta Warriors, Ancient City';
            break;
        case 'Hong Kong':
            description = 'Experienced the vibrant city life at age 9. Explored both Hong Kong and Macau.';
            highlights = 'City Life, Shopping, Macau';
            break;
        case 'Singapore':
            description = 'Visited the modern city-state at age 10. Also explored Malaysia\'s diverse culture.';
            highlights = 'Modern City, Malaysia, Diversity';
            break;
        case 'Dubai':
            description = 'Discovered the Middle East at age 12. Experienced desert and modern architecture.';
            highlights = 'Desert, Architecture, Middle East';
            break;
        case 'Yunnan':
            description = 'Explored China\'s southwest at age 14. Visited both Yunnan and Guizhou provinces.';
            highlights = 'Mountains, Ethnic Culture, Nature';
            break;
        case 'United States':
            description = 'Major international experience at age 15. Currently studying and living in the US.';
            highlights = 'Education, New Culture, Independence';
            break;
        default:
            description = 'A wonderful travel experience that shaped my perspective.';
            highlights = 'Culture, Experience, Growth';
    }
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${locationName}</h3>
                <span class="modal-age">${age}</span>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p class="location-description">${description}</p>
                <div class="location-highlights">
                    <h4>Highlights:</h4>
                    <p>${highlights}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}
