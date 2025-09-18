class ServiceDetailPage {
    constructor(serviceId) {
        this.serviceId = serviceId;
        this.data = null;
        this.dataLoader = new DataLoader(serviceId);
        this.tocRenderer = new TOCRenderer();
        this.contentRenderer = new ContentRenderer();
        this.init();
    }

    async init() {
        try {
            this.data = await this.dataLoader.loadAllData();
            this.render();
        } catch (e) {
            console.error('Failed to initialize service detail page:', e);
            this.showError();
        }
    }

    render() {
        const container = document.getElementById('service-content');
        const title = document.getElementById('service-title');
        if (!container) return;

        // Update page title
        if (title && this.data?.service?.name) {
            title.textContent = this.data.service.name;
        }

        if (this.data.detail) {
            // Build TOC first so user sees it immediately
            this.tocRenderer.render(this.data.detail.toc);
            
            // Create numbering maps for content rendering
            const numberingMap = this.tocRenderer.createNumberingMap(this.data.detail.toc);
            const tocChildrenMap = this.tocRenderer.createTOCChildrenMap(this.data.detail.toc);
            
            // Render main content
            container.innerHTML = this.contentRenderer.render(
                this.data.detail, 
                this.data.service, 
                numberingMap, 
                tocChildrenMap
            );
            return;
        }

        this.showError();
    }

    showError() {
        const container = document.getElementById('service-content');
        if (!container) return;
        container.innerHTML = `
            <div class="error-message text-center py-5">
                <h4>Không tìm thấy dịch vụ</h4>
                <a class="btn btn-outline-secondary" href="/services" data-route="/services">← Quay lại danh sách</a>
            </div>
        `;
    }
}

// Initialize from layout with explicit serviceId
window.initServiceDetailPage = function(serviceId) {
    window.serviceDetailPage = new ServiceDetailPage(serviceId);
}

