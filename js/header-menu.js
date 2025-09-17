// Header Menu Services Loader
class HeaderMenuLoader {
    constructor() {
        this.servicesData = [];
        this.init();
    }

    async init() {
        await this.fetchServices();
        this.renderMenuItems();
    }

    async fetchServices() {
        try {
            const response = await fetch('data/services.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.servicesData = await response.json();
        } catch (error) {
            console.error('Error fetching services for header menu:', error);
            this.showError();
        }
    }

    renderMenuItems() {
        // Render for desktop menu
        this.renderMenuList('services-menu-list');
        // Render for mobile menu
        this.renderMenuList('services-menu-mobile-list');
    }

    renderMenuList(containerId) {
        const container = document.getElementById(containerId);
        
        if (!container || !this.servicesData || !this.servicesData.categories) {
            return;
        }

        container.innerHTML = '';

        this.servicesData.categories.forEach(category => {
            const menuItem = document.createElement('li');
            menuItem.className = 'level-0';
            
            menuItem.innerHTML = `
                <a class="transition" 
                   href="/services?category=${category.id}" 
                   data-route="/services?category=${category.id}" 
                   data-category="${category.id}"
                   title="${category.name}">
                    ${category.name}
                </a>
            `;
            
            container.appendChild(menuItem);
        });

        // Add event listeners for category clicks
        this.addCategoryClickListeners(containerId);
    }

    addCategoryClickListeners(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-category]');
            if (link) {
                e.preventDefault();
                const categoryId = link.getAttribute('data-category');
                this.navigateToCategory(categoryId);
            }
        });
    }

    navigateToCategory(categoryId) {
        // Navigate to services page with category parameter
        if (window.router) {
            window.router.navigateWithParams('/services', { category: categoryId });
        } else {
            window.location.href = `/services?category=${categoryId}`;
        }
    }

    showError() {
        const containers = ['services-menu-list', 'services-menu-mobile-list'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<li class="level-0"><a href="/services" data-route="/services">Dịch vụ</a></li>';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.headerMenuLoader = new HeaderMenuLoader();
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    window.headerMenuLoader = new HeaderMenuLoader();
}
