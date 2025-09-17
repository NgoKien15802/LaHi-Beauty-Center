class ServiceDetailPage {
    constructor(serviceId) {
        this.serviceId = serviceId;
        this.data = null;
        this.init();
    }

    getBasePath() {
        if (window.router && typeof window.router.isGitHubPages === 'function' && window.router.isGitHubPages()) {
            const repo = window.router.getRepoName ? window.router.getRepoName() : '';
            return repo ? `/${repo}` : '';
        }
        return '';
    }

    async init() {
        try {
            await this.loadData();
            this.render();
        } catch (e) {
            this.showError();
        }
    }

    async loadData() {
        const base = this.getBasePath();
        const res = await fetch(`${base}/data/services.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load data');
        // Read as text once to avoid "body stream already read" from any prior consumers
        const raw = await res.text();
        let json;
        try {
            json = JSON.parse(raw);
        } catch (e) {
            console.error('services.json is not valid JSON. First 200 chars:', raw.slice(0, 200));
            throw e;
        }
        // find service by id across all categories
        for (const cat of json.categories || []) {
            const found = (cat.services || []).find(s => s.id === this.serviceId);
            if (found) {
                this.data = { ...found, categoryName: cat.name, categoryId: cat.id };
                return;
            }
        }
        throw new Error('Service not found');
    }

    render() {
        const container = document.getElementById('service-content');
        const title = document.getElementById('service-title');
        if (!container) return;

        if (title && this.data?.name) {
            title.textContent = this.data.name;
        }

        container.innerHTML = `
            <div class="service-detail">
                <div class="row">
                    <div class="col-md-6">
                        <picture>
                            <source srcset="${this.data.image}" media="(min-width: 0px)" />
                            <img class="d-inline-block w-100" src="${this.data.image}" alt="${this.data.name}" onerror="this.src='assets/images/noimage.png';" />
                        </picture>
                    </div>
                    <div class="col-md-6">
                        <h3>${this.data.name}</h3>
                        ${this.data.description ? `<p>${this.data.description}</p>` : ''}
                        <ul class="list-unstyled">
                            ${this.data.price ? `<li><strong>Giá:</strong> ${this.data.price}</li>` : ''}
                            ${this.data.duration ? `<li><strong>Thời lượng:</strong> ${this.data.duration}</li>` : ''}
                            ${this.data.categoryName ? `<li><strong>Danh mục:</strong> ${this.data.categoryName}</li>` : ''}
                        </ul>
                        <div class="mt-3">
                            <a class="btn btn-primary" href="/contact" data-route="/contact">Đặt lịch tư vấn</a>
                            <a class="btn btn-outline-secondary ms-2" href="/services" data-route="/services">← Quay lại danh sách</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
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

