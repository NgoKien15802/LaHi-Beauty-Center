/**
 * TOCRenderer - Handles Table of Contents rendering and interactions
 */
class TOCRenderer {
    constructor() {
        this.container = null;
    }

    createTOCContainer() {
        if (this.container) return this.container;

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

        this.container = metaToc.querySelector('.toc-list');
        return this.container;
    }

    buildTOCHTML(items) {
        return `<ul>` + items.map(item => {
            const anchor = `#${item.id}`;
            const children = Array.isArray(item.children) && item.children.length 
                ? this.buildTOCHTML(item.children) 
                : '';
            return `<li><a href="${anchor}" data-rel="${anchor}">${item.label}</a>${children}</li>`;
        }).join('') + `</ul>`;
    }

    render(tocData) {
        if (!tocData || !Array.isArray(tocData)) return;
        
        const tocContainer = this.createTOCContainer();
        tocContainer.innerHTML = this.buildTOCHTML(tocData);
        this.attachScrollBehavior();
    }

    attachScrollBehavior() {
        const container = this.container;
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

    createNumberingMap(tocData) {
        const map = {};
        if (!Array.isArray(tocData)) return map;

        tocData.forEach((item, idx) => {
            const level1 = `${idx + 1}`;
            if (item.id) map[item.id] = level1;
            
            if (Array.isArray(item.children)) {
                item.children.forEach((child, cIdx) => {
                    const level2 = `${level1}.${cIdx + 1}`;
                    if (child.id) map[child.id] = level2;
                });
            }
        });
        
        return map;
    }

    createTOCChildrenMap(tocData) {
        const map = {};
        if (!Array.isArray(tocData)) return map;

        tocData.forEach((item, idx) => {
            const level1 = `${idx + 1}`;
            if (item && Array.isArray(item.children)) {
                map[item.id] = item.children.map((child, cIdx) => ({
                    ...child,
                    number: `${level1}.${cIdx + 1}`
                }));
            }
        });
        
        return map;
    }
}
