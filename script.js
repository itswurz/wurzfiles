/* ============================================================================
   THE WURZ FILES - JAVASCRIPT FUNCTIONALITY
   ============================================================================ */

// ----------------------------------------------------------------------------
// MOBILE NAVIGATION
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Toggle sidebar on menu icon click
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    // Close sidebar when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------------
    // SEARCH AND FILTER FUNCTIONALITY (Subject Registry Page)
    // ----------------------------------------------------------------------------

    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const subjectCards = document.querySelectorAll('.subject-card');
    const noResults = document.getElementById('noResults');

    let currentFilter = 'all';
    let currentSearch = '';

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase().trim();
            filterSubjects();
        });
    }

    // Filter button functionality
    if (filterButtons.length > 0) {
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
    }

    // Main filter function
    function filterSubjects() {
        if (!subjectCards || subjectCards.length === 0) return;

        let visibleCount = 0;

        subjectCards.forEach(card => {
            const classification = card.getAttribute('data-classification');
            const name = card.getAttribute('data-name').toLowerCase();
            const designation = card.getAttribute('data-designation').toLowerCase();

            // Check if card matches filter
            const matchesFilter = currentFilter === 'all' || classification === currentFilter;

            // Check if card matches search
            const matchesSearch = currentSearch === '' || 
                                 name.includes(currentSearch) || 
                                 designation.includes(currentSearch);

            // Show or hide card
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show or hide "no results" message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    // ----------------------------------------------------------------------------
    // CLOSE SIDEBAR ON NAVIGATION (Mobile)
    // ----------------------------------------------------------------------------

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // ----------------------------------------------------------------------------
    // WINDOW RESIZE HANDLER
    // ----------------------------------------------------------------------------

    window.addEventListener('resize', function() {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});
