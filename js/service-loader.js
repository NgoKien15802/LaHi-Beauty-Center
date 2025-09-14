// Service Loader - Dynamic content loader for spa services
class ServiceLoader {
    constructor() {
        this.servicesData = null;
        this.currentService = null;
        this.init();
    }

    async init() {
        try {
            await this.loadServicesData();
            this.getServiceFromURL();
            this.renderService();
            this.updatePageMeta();
        } catch (error) {
            console.error('Error loading service:', error);
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

    getServiceFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('id') || urlParams.get('service');
        
        if (!serviceId) {
            this.showError('Không tìm thấy dịch vụ');
            return;
        }

        this.currentService = this.servicesData.services.find(service => 
            service.id === serviceId || service.slug === serviceId
        );

        if (!this.currentService) {
            this.showError('Dịch vụ không tồn tại');
            return;
        }
    }

    renderService() {
        if (!this.currentService) return;

        const service = this.currentService;
        
        // Update page title
        document.getElementById('service-title').textContent = service.title;
        document.getElementById('breadcrumb-service').textContent = service.title;
        
        // Render service content
        const content = this.generateServiceContent(service);
        document.getElementById('service-content').innerHTML = content;
    }

    generateServiceContent(service) {
        return `
            <div class="service-detail">
                <!-- Service Header -->
                <div class="service-header mb-4">
                    <div class="row">
                        <div class="col-md-8">
                            <h1 class="service-title mb-3">${service.title}</h1>
                            <p class="service-description lead">${service.description}</p>
                            <div class="service-meta">
                                <span class="badge bg-primary me-2">${service.category}</span>
                                <span class="badge bg-success me-2">${service.price}</span>
                                <span class="badge bg-info">${service.duration}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <img src="${service.image}" alt="${service.title}" class="img-fluid rounded shadow">
                        </div>
                    </div>
                </div>

                <!-- Service Benefits -->
                <div class="service-benefits mb-4">
                    <h3 class="mb-3">Lợi ích của dịch vụ</h3>
                    <div class="row">
                        ${service.benefits.map(benefit => `
                            <div class="col-md-6 mb-2">
                                <div class="benefit-item">
                                    <i class="fas fa-check-circle text-success me-2"></i>
                                    ${benefit}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Service Process -->
                <div class="service-process mb-4">
                    <h3 class="mb-3">Quy trình thực hiện</h3>
                    <div class="process-steps">
                        ${service.process.map((step, index) => `
                            <div class="process-step mb-3">
                                <div class="row">
                                    <div class="col-md-1">
                                        <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                                            ${index + 1}
                                        </div>
                                    </div>
                                    <div class="col-md-11">
                                        <div class="step-content">
                                            <h5>Bước ${index + 1}</h5>
                                            <p>${step}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Service Info -->
                <div class="service-info mb-4">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="info-card">
                                <h4 class="text-success">Phù hợp với</h4>
                                <p>${service.suitable_for}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="info-card">
                                <h4 class="text-warning">Không phù hợp với</h4>
                                <p>${service.not_suitable_for}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Aftercare -->
                <div class="service-aftercare mb-4">
                    <h3 class="mb-3">Chăm sóc sau điều trị</h3>
                    <div class="aftercare-content">
                        <p>${service.aftercare}</p>
                    </div>
                </div>

                <!-- Call to Action -->
                <div class="service-cta text-center">
                    <div class="cta-content">
                        <h3 class="mb-3">Đặt lịch ngay hôm nay</h3>
                        <p class="mb-4">Liên hệ với chúng tôi để được tư vấn miễn phí và đặt lịch</p>
                        <div class="cta-buttons">
                            <a href="tel:0949774973" class="btn btn-primary btn-lg me-3">
                                <i class="fas fa-phone me-2"></i>
                                Gọi ngay: 0949 774 973
                            </a>
                            <a href="lien-he.html" class="btn btn-outline-primary btn-lg">
                                <i class="fas fa-calendar me-2"></i>
                                Đặt lịch online
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updatePageMeta() {
        if (!this.currentService) return;

        const service = this.currentService;
        const baseUrl = 'http://herskinlab.com.vn';
        
        // Update page title
        document.title = `${service.title} - Her Skinlab`;
        document.getElementById('page-title').textContent = `${service.title} - Her Skinlab`;
        document.getElementById('main-title').textContent = `${service.title} - Her Skinlab`;
        
        // Update meta description
        const description = `${service.description} - ${service.category} tại Her Skinlab. Giá: ${service.price}. Thời gian: ${service.duration}`;
        document.getElementById('page-description').setAttribute('content', description);
        document.getElementById('og-description').setAttribute('content', description);
        
        // Update meta keywords
        const keywords = `${service.title}, ${service.category}, spa, làm đẹp, Her Skinlab, Quận 3`;
        document.getElementById('page-keywords').setAttribute('content', keywords);
        
        // Update Open Graph
        document.getElementById('og-title').setAttribute('content', `${service.title} - Her Skinlab`);
        document.getElementById('og-url').setAttribute('content', `${baseUrl}/service-detail.html?id=${service.id}`);
        document.getElementById('og-image').setAttribute('content', `${baseUrl}/${service.image}`);
        document.getElementById('og-image-alt').setAttribute('content', service.title);
        
        // Update canonical URL
        document.getElementById('canonical-url').setAttribute('href', `${baseUrl}/service-detail.html?id=${service.id}`);
    }

    showError(message = 'Có lỗi xảy ra khi tải trang') {
        document.getElementById('service-content').innerHTML = `
            <div class="error-message text-center py-5">
                <div class="error-icon mb-3">
                    <i class="fas fa-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
                </div>
                <h3 class="text-danger">${message}</h3>
                <p class="text-muted">Vui lòng thử lại sau hoặc liên hệ với chúng tôi</p>
                <a href="dich-vu.html" class="btn btn-primary">Quay lại danh sách dịch vụ</a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ServiceLoader();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    if (window.serviceLoader) {
        window.serviceLoader.getServiceFromURL();
        window.serviceLoader.renderService();
        window.serviceLoader.updatePageMeta();
    }
});

// Export for global access
window.ServiceLoader = ServiceLoader;
