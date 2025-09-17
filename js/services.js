class ServicesManager {
    constructor() {
        this.servicesData = null;
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadServicesData();
            this.setupEventListeners();
            this.renderServices();
        } catch (error) {
            console.error('Error initializing services:', error);
            this.showError();
        }
    }

    async loadServicesData() {
        try {
            const response = await fetch('data/services.json');
            if (!response.ok) {
                throw new Error('Failed to load services data');
            }
            this.servicesData = await response.json();
        } catch (error) {
            console.error('Error loading services data:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Category tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-tab')) {
                e.preventDefault();
                this.handleCategoryClick(e.target);
            }
        });
    }

    handleCategoryClick(tab) {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update current category
        this.currentCategory = tab.getAttribute('data-category');
        
        // Re-render services
        this.renderServices();
    }

    renderServices() {
        const grid = document.getElementById('services-grid');
        if (!grid) return;

        // Clear loading spinner
        grid.innerHTML = '';

        // Get services to display
        const servicesToShow = this.getServicesToShow();
        
        if (servicesToShow.length === 0) {
            this.showNoServices();
            return;
        }

        // Render services
        servicesToShow.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            grid.appendChild(serviceCard);
        });
        
        // Initialize lazy loading for new images
        this.initializeLazyLoading();
    }

    getServicesToShow() {
        if (!this.servicesData) return [];

        if (this.currentCategory === 'all') {
            // Show all services from all categories
            const allServices = [];
            this.servicesData.categories.forEach(category => {
                category.services.forEach(service => {
                    allServices.push({
                        ...service,
                        categoryName: category.name,
                        categoryId: category.id
                    });
                });
            });
            return allServices;
        } else {
            // Show services from specific category
            const category = this.servicesData.categories.find(cat => cat.id === this.currentCategory);
            if (category) {
                return category.services.map(service => ({
                    ...service,
                    categoryName: category.name,
                    categoryId: category.id
                }));
            }
            return [];
        }
    }

    createServiceCard(service) {
        const item = document.createElement('div');
        item.className = 'dvnb_item';

        item.innerHTML = `
            <a href="/service/${service.id}" class="dvnb_box position-relative d-block" data-route="/service/${service.id}">
                <div class="dvnb_pic scale-img hover-glass">
                    <picture>
                        <source srcset="${service.image}" media="(min-width: 0px)" />
                        <img class="d-inline-block lazy w-100"
                             data-src="${service.image}"
                             alt="${service.name}"
                             width="300"
                             height="345"
                             onerror="this.src='assets/images/noimage.png';"
                             src="assets/images/noimage.png" />
                    </picture>
                </div>
                <div class="dvnb_bottom"></div>
                <div class="dvnb_info">
                    <h3 class="dvnb__name text-split">${service.name}</h3>
                </div>
            </a>
        `;

        return item;
    }

    showNoServices() {
        const grid = document.getElementById('services-grid');
        grid.innerHTML = `
            <div class="error-message">
                <div class="error-icon">
                    <i class="fas fa-search fa-3x text-muted"></i>
                </div>
                <h4>Không tìm thấy dịch vụ</h4>
                <p>Không có dịch vụ nào trong danh mục này.</p>
            </div>
        `;
    }

    showError() {
        const grid = document.getElementById('services-grid');
        grid.innerHTML = `
            <div class="error-message">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle fa-3x text-danger"></i>
                </div>
                <h4>Lỗi tải dữ liệu</h4>
                <p>Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.</p>
                <button class="btn btn-primary" onclick="location.reload()">Tải Lại</button>
            </div>
        `;
    }

    initializeLazyLoading() {
        // Initialize lazy loading if the library is available
        if (typeof LazyLoad !== 'undefined') {
            const lazyLoadInstance = new LazyLoad({
                elements_selector: ".lazy",
                threshold: 0,
                callback_loaded: function(el) {
                    // Optional: Add loaded class for styling
                    el.classList.add('loaded');
                }
            });
        }
    }

    // Service detail and booking handled by router navigation
}

// Initialize services manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.servicesManager = new ServicesManager();
});
