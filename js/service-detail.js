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
        const title = (detail.title || fallback.title || fallback.name || '').toUpperCase();
        const subtitle = detail.subtitle || '';

        // helpers to mimic the static template styles
        const h1 = (text) => `\n<h1 style=\"text-align: center;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\"><strong><span style=\"color:#9b856d;\">${text}</span></strong></span></span></h1>`;
        const h2 = (id, text) => `\n<h2 id=\"${id}\" style=\"text-align: justify;\"><strong><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${text}</span></span></strong></h2>`;
        const h3 = (id, text) => `\n<h3 id=\"${id || ''}\" style=\"text-align: justify;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${text}</span></span></h3>`;
        const p = (html) => `\n<p style=\"text-align: justify;\">${html}</p>`;
        const ul = (items) => `\n<ul>\n${items.map(i => `\t<li style=\"text-align: justify;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${i}</span></span></li>`).join('\n')}\n</ul>`;
        const ol = (items) => `\n<ol>\n${items.map(i => `\t<li style=\"text-align: justify;\"><span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${i}</span></span></li>`).join('\n')}\n</ol>`;
        const img = (src, alt, w, h) => `\n<p style=\"text-align:center\"><img alt=\"${alt || ''}\" ${h ? `height=\"${h}\"` : ''} ${w ? `width=\"${w}\"` : ''} src=\"${src}\" /></p>`;

        // Build numbering map from TOC (e.g., 1, 1.1)
        const numberingMap = (() => {
            const map = {};
            if (Array.isArray(detail.toc)) {
                detail.toc.forEach((item, idx) => {
                    const level1 = `${idx + 1}`;
                    if (item.id) map[item.id] = level1;
                    if (Array.isArray(item.children)) {
                        item.children.forEach((child, cIdx) => {
                            const level2 = `${level1}.${cIdx + 1}`;
                            if (child.id) map[child.id] = level2;
                        });
                    }
                });
            }
            return map;
        })();

        // Intro (gioi-thieu)
        const intro = (detail.sections || []).find(s => s.id === 'gioi-thieu') || {};
        const introHtml = [
            h1(title),
            subtitle ? h1(subtitle) : '',
            intro.content ? p(`<span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${intro.content}</span></span>`) : '',
            intro.image ? img(intro.image, title) : ''
        ].join('');

        // Other sections rendered to match the static frame
        // Build quick lookup: sectionId -> children from TOC with numbering
        const tocChildrenMap = (() => {
            const map = {};
            if (Array.isArray(detail.toc)) {
                detail.toc.forEach((item, idx) => {
                    const level1 = `${idx + 1}`;
                    if (item && Array.isArray(item.children)) {
                        map[item.id] = item.children.map((child, cIdx) => ({
                            ...child,
                            number: `${level1}.${cIdx + 1}`
                        }));
                    }
                });
            }
            return map;
        })();

        const sectionHtml = (detail.sections || [])
            .filter(s => s.id !== 'gioi-thieu')
            .map(section => {
                const blocks = [];
                if (section.heading) {
                    const num = numberingMap[section.id] ? numberingMap[section.id] + '. ' : '';
                    blocks.push(h2(section.id, `${num}${section.heading}`));
                }
                if (section.subsections && section.subsections.length) {
                    section.subsections.forEach((sub, idx) => {
                        if (sub.heading) {
                            const num = numberingMap[sub.id] ? numberingMap[sub.id] + ' ' : '';
                            blocks.push(h3(sub.id, `${num}${sub.heading}`));
                        }
                        if (sub.content) blocks.push(p(`<span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${sub.content}</span></span>`));
                        if (Array.isArray(sub.bullets) && sub.bullets.length) blocks.push(ul(sub.bullets));
                        if (Array.isArray(sub.steps) && sub.steps.length) blocks.push(ol(sub.steps));
                        if (sub.image) blocks.push(img(sub.image, sub.heading));
                    });
                } else {
                    if (section.content) blocks.push(p(`<span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${section.content}</span></span>`));

                    // If TOC has children for this section, render H3 per child and pair with bullets/steps content when possible
                    const tocChildren = tocChildrenMap[section.id] || [];
                    if (tocChildren.length) {
                        const maxLen = Math.max(
                            tocChildren.length,
                            Array.isArray(section.bullets) ? section.bullets.length : 0,
                            Array.isArray(section.steps) ? section.steps.length : 0
                        );
                        for (let i = 0; i < maxLen; i++) {
                            const child = tocChildren[i];
                            if (child) {
                                blocks.push(h3(child.id, `${child.number} ${child.label}`));
                            }
                            if (Array.isArray(section.bullets) && section.bullets[i]) {
                                blocks.push(p(`<span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${section.bullets[i]}</span></span>`));
                            }
                            if (Array.isArray(section.steps) && section.steps[i]) {
                                blocks.push(p(`<span style=\"font-size:18px;\"><span style=\"font-family:Times New Roman,Times,serif;\">${section.steps[i]}</span></span>`));
                            }
                        }
                    } else {
                        if (Array.isArray(section.bullets) && section.bullets.length) blocks.push(ul(section.bullets));
                        if (Array.isArray(section.steps) && section.steps.length) blocks.push(ol(section.steps));
                    }
                    if (section.image) blocks.push(img(section.image, section.heading, 500));
                    if (Array.isArray(section.gallery) && section.gallery.length) {
                        blocks.push(section.gallery.map(src => img(src, '')).join(''));
                    }
                }
                return blocks.join('\n');
            }).join('\n');

        return `\n<div id=\"toc-content\" class=\"content-main w-clear markdownEditor\">${introHtml}${sectionHtml}</div>`;
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

