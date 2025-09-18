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
            await this.loadDetail();
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

    async loadDetail() {
        if (!this.data) return;
        const candidates = [this.data.id, this.data.slug].filter(Boolean);
        for (const name of candidates) {
            try {
                const base = this.getBasePath();
                const res = await fetch(`${base}/data/service-details/${name}.json`, { cache: 'no-store' });
                if (!res.ok) continue;
                const detail = await res.json();
                this.data.detail = detail;
                break;
            } catch (_) {
                // try next
            }
        }
    }

    render() {
        const container = document.getElementById('service-content');
        const title = document.getElementById('service-title');
        if (!container) return;

        if (title && this.data?.name) {
            title.textContent = this.data.name;
        }

        if (this.data.detail) {
            // Build TOC first so user sees it immediately
            this.renderTOC(this.data.detail);
            container.innerHTML = this.renderFromDetail(this.data.detail, this.data);
            return;
        }

        this.showError();
    }

    renderFromDetail(detail, fallback) {
        const title = detail.title || fallback.title || fallback.name;
        const price = detail.price || fallback.price || '';
        const duration = detail.duration || fallback.duration || '';
        const image = detail.hero?.image || fallback.image || '';

        const renderSubsection = (sub) => {
            const h = sub.heading ? `<h3 id="${sub.id || ''}" class="mb-2">${sub.heading}</h3>` : '';
            const content = sub.content ? `<p>${sub.content}</p>` : '';
            const bullets = Array.isArray(sub.bullets) && sub.bullets.length
                ? `<ul>` + sub.bullets.map(b => `<li>${b}</li>`).join('') + `</ul>`
                : '';
            const steps = Array.isArray(sub.steps) && sub.steps.length
                ? `<ol>` + sub.steps.map(s => `<li>${s}</li>`).join('') + `</ol>`
                : '';
            const img = sub.image ? `<div class="text-center my-3"><img class="img-fluid rounded" src="${sub.image}" alt="${sub.heading || ''}"></div>` : '';
            return `<div class="mb-3">${h}${content}${bullets}${steps}${img}</div>`;
        };

        const renderSection = (section) => {
            const heading = section.heading ? `<h2 id="${section.id}" class="mb-3">${section.heading}</h2>` : '';
            const content = section.content ? `<p>${section.content}</p>` : '';
            const bullets = Array.isArray(section.bullets) && section.bullets.length
                ? `<ul>` + section.bullets.map(b => `<li>${b}</li>`).join('') + `</ul>`
                : '';
            const steps = Array.isArray(section.steps) && section.steps.length
                ? `<ol>` + section.steps.map(s => `<li>${s}</li>`).join('') + `</ol>`
                : '';
            const img = section.image ? `<div class="text-center my-3"><img class="img-fluid rounded" src="${section.image}" alt="${section.heading || ''}"></div>` : '';
            const gallery = Array.isArray(section.gallery) && section.gallery.length
                ? `<div class="row g-3">` + section.gallery.map(src => `
                        <div class="col-md-4"><img class="img-fluid rounded" src="${src}" alt=""></div>`).join('') + `</div>`
                : '';
            const subs = Array.isArray(section.subsections) && section.subsections.length
                ? section.subsections.map(renderSubsection).join('')
                : '';
            return `<section class="mb-4">${heading}${content}${bullets}${steps}${img}${gallery}${subs}</section>`;
        };

        const bodySections = Array.isArray(detail.sections) ? detail.sections.map(renderSection).join('') : '';

        // Build content block following the static template style (h1/h2/h3, images, lists)
        const introSection = (detail.sections || []).find(s => s.id === 'gioi-thieu') || {};
        const introParagraph = introSection.content ? `<p style=\"text-align: justify;\">${introSection.content}</p>` : '';
        const introImage = introSection.image ? `
            <p style=\"text-align:center\"><img alt=\"${title}\" src=\"${introSection.image}\" class=\"img-fluid\" /></p>
        ` : '';

        return `
            <div id=\"toc-content\" class=\"content-main w-clear markdownEditor\">\n\n                <h1 style=\"text-align: center;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\"><strong><span style=\"color:#9b856d;\">${title.toUpperCase()}</span></strong></span></span></h1>
                ${detail.subtitle ? `<h1 style=\"text-align: center;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\"><strong><span style=\"color:#9b856d;\">${detail.subtitle}</span></strong></span></span></h1>` : ''}
                ${introParagraph}
                ${introImage}

                ${bodySections}
            </div>
        `;
    }

    renderTOC(detail) {
        if (!detail || !Array.isArray(detail.toc)) return;
        let tocContainer = document.querySelector('.meta-toc .toc-list');
        if (!tocContainer) {
            const metaToc = document.createElement('div');
            metaToc.className = 'meta-toc';
            metaToc.innerHTML = '<div class="box-readmore"><ul class="toc-list"></ul></div>';

            // Prefer to insert before the service content if available
            const serviceContent = document.getElementById('service-content');
            if (serviceContent && serviceContent.parentNode) {
                serviceContent.parentNode.insertBefore(metaToc, serviceContent);
            } else {
                // Fallback: insert at the top of .wrap-main or body
                const wrapMain = document.querySelector('.wrap-main') || document.body;
                wrapMain.insertBefore(metaToc, wrapMain.firstChild);
            }

            tocContainer = metaToc.querySelector('.toc-list');
        }
        const build = (items) => `<ul>` + items.map(item => {
            const anchor = `#${item.id}`;
            const children = Array.isArray(item.children) && item.children.length ? build(item.children) : '';
            return `<li><a href="${anchor}" data-rel="${anchor}">${item.label}</a>${children}</li>`;
        }).join('') + `</ul>`;
        tocContainer.innerHTML = build(detail.toc);
        this.attachTOCScroll();
    }

    attachTOCScroll() {
        const container = document.querySelector('.meta-toc .toc-list');
        if (!container) return;
        container.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
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

