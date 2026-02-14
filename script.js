// THE WURZ FILES - JAVASCRIPT
// Interactive features and functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // SIDEBAR TOGGLE (Mobile)
    // ==========================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar && sidebarOverlay) {
        // Toggle sidebar on button click
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });

        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        // Close sidebar when clicking a nav link (mobile)
        const navLinks = sidebar.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                }
            });
        });

        // Close sidebar on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================
    // TIMESTAMP UPDATE
    // ==========================================
    function updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        if (timestampElement) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            timestampElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }

    // Update timestamp immediately and then every second
    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    // ==========================================
    // SUBJECTS PAGE - SEARCH AND FILTER
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const subjectsGrid = document.getElementById('subjectsGrid');
    const noResults = document.getElementById('noResults');
    const displayCount = document.getElementById('displayCount');
    const totalCount = document.getElementById('totalCount');

    if (searchInput && subjectsGrid) {
        let currentFilter = 'all';
        let searchTerm = '';

        // Get all subject cards
        const subjectCards = subjectsGrid.querySelectorAll('.subject-card');
        
        // Set total count
        if (totalCount) {
            totalCount.textContent = subjectCards.length;
        }

        // Filter function
        function filterSubjects() {
            let visibleCount = 0;

            subjectCards.forEach(card => {
                const cardClassification = card.getAttribute('data-classification');
                const cardName = card.querySelector('.card-name').textContent.toLowerCase();
                const cardId = card.querySelector('.card-id').textContent.toLowerCase();
                const cardKnownFor = card.querySelector('.card-known-for').textContent.toLowerCase();

                // Check if card matches current filter
                const matchesFilter = currentFilter === 'all' || cardClassification === currentFilter;

                // Check if card matches search term
                const matchesSearch = searchTerm === '' || 
                    cardName.includes(searchTerm) || 
                    cardId.includes(searchTerm) ||
                    cardKnownFor.includes(searchTerm);

                // Show or hide card based on both conditions
                if (matchesFilter && matchesSearch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update display count
            if (displayCount) {
                displayCount.textContent = visibleCount;
            }

            // Show/hide no results message
            if (noResults) {
                if (visibleCount === 0) {
                    subjectsGrid.style.display = 'none';
                    noResults.style.display = 'block';
                } else {
                    subjectsGrid.style.display = 'grid';
                    noResults.style.display = 'none';
                }
            }
        }

        // Search input event listener
        searchInput.addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase();
            filterSubjects();
        });

        // Filter button event listeners
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update current filter
                currentFilter = this.getAttribute('data-filter');
                
                // Apply filter
                filterSubjects();
            });
        });

        // Initial filter application
        filterSubjects();
    }

    // ==========================================
    // SCROLL TO TOP ON PAGE LOAD
    // ==========================================
    window.scrollTo(0, 0);

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // PREVENT DISABLED LINKS
    // ==========================================
    document.querySelectorAll('.db-section-link.disabled, a.disabled').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ==========================================
    // ADD HOVER EFFECT TO SUBJECT CARDS
    // ==========================================
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape to clear search and close sidebar
        if (e.key === 'Escape') {
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                searchInput.blur();
                searchTerm = '';
                filterSubjects();
            }
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        }
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c█ THE WURZ FILES', 'font-size: 20px; font-weight: bold; font-family: monospace;');
    console.log('%cCLASSIFIED DATABASE SYSTEM v1.0', 'font-family: monospace; color: #666;');
    console.log('%cACCESS LEVEL: PUBLIC', 'font-family: monospace; color: #999;');
    console.log('%c---', 'color: #333;');
    console.log('%cAll information is satirical and for entertainment purposes only.', 'font-family: monospace; font-size: 11px; color: #666;');
});
