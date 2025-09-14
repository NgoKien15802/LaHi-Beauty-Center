// Services List Loader - Dynamic services list from JSON
class ServicesListLoader {
    constructor() {
        this.servicesData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadServicesData();
            this.renderServicesList();
        } catch (error) {
            console.error('Error loading services list:', error);
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

    renderServicesList() {
        if (!this.servicesData || !this.servicesData.services) return;

        const servicesContainer = document.getElementById('services-grid');
        if (!servicesContainer) return;

        const servicesHTML = this.servicesData.services.map(service => `
            <div class="dvnb_item">
                <a href="service-detail.html?id=${service.id}" class="dvnb_box position-relative d-block">
                    <div class="dvnb_pic scale-img hover-glass">
                        <picture>
                            <source srcset="http://herskinlab.com.vn/${service.image}" media="(min-width: 0px)">
                            <img class="d-inline-block lazy w-100" 
                                 data-src="http://herskinlab.com.vn/${service.image}" 
                                 alt="${service.title}" 
                                 width="300" height="345" 
                                 onerror="this.src='http://herskinlab.com.vn/thumbs/300x345x1/assets/images/noimage.png.webp';" 
                                 src="thumbs/300x345x2/assets/images/noimage.png.webp">
                        </picture>
                    </div>
                    <div class="dvnb_bottom"></div>
                    <div class="dvnb_info">
                        <h3 class="dvnb__name text-split">${service.title}</h3>
                        <div class="service-meta mt-2">
                            <span class="badge bg-primary me-1">${service.price}</span>
                            <span class="badge bg-success">${service.duration}</span>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');

        servicesContainer.innerHTML = servicesHTML;
    }

    showError() {
        const servicesContainer = document.getElementById('services-grid');
        if (servicesContainer) {
            servicesContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 3rem;"></i>
                        <h3 class="text-danger">Không thể tải danh sách dịch vụ</h3>
                        <p class="text-muted">Vui lòng thử lại sau</p>
                        <button onclick="location.reload()" class="btn btn-primary">Tải lại trang</button>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ServicesListLoader();
});

// Export for global access
window.ServicesListLoader = ServicesListLoader;
