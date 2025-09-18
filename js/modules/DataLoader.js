/**
 * DataLoader - Handles loading service data and details
 */
class DataLoader {
    constructor(serviceId) {
        this.serviceId = serviceId;
        this.basePath = this.getBasePath();
    }

    getBasePath() {
        if (window.router && typeof window.router.isGitHubPages === 'function' && window.router.isGitHubPages()) {
            const repo = window.router.getRepoName ? window.router.getRepoName() : '';
            return repo ? `/${repo}` : '';
        }
        return '';
    }

    async loadServicesData() {
        const res = await fetch(`${this.basePath}/data/services.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load services data');
        
        const raw = await res.text();
        let json;
        try {
            json = JSON.parse(raw);
        } catch (e) {
            console.error('services.json is not valid JSON. First 200 chars:', raw.slice(0, 200));
            throw e;
        }
        
        return json;
    }

    async findServiceById(servicesData) {
        for (const cat of servicesData.categories || []) {
            const found = (cat.services || []).find(s => s.id === this.serviceId);
            if (found) {
                return { ...found, categoryName: cat.name, categoryId: cat.id };
            }
        }
        throw new Error('Service not found');
    }

    async loadServiceDetail(serviceData) {
        if (!serviceData) return null;
        
        const candidates = [serviceData.id, serviceData.slug].filter(Boolean);
        for (const name of candidates) {
            try {
                const res = await fetch(`${this.basePath}/data/service-details/${name}.json`, { cache: 'no-store' });
                if (!res.ok) continue;
                return await res.json();
            } catch (_) {
                // try next
            }
        }
        return null;
    }

    async loadAllData() {
        const servicesData = await this.loadServicesData();
        const serviceData = await this.findServiceById(servicesData);
        const detailData = await this.loadServiceDetail(serviceData);
        
        return {
            service: serviceData,
            detail: detailData
        };
    }
}
