/**
 * ContentRenderer - Handles rendering of service detail content
 */
class ContentRenderer {
    constructor() {
        this.htmlHelpers = this.createHTMLHelpers();
    }

    createHTMLHelpers() {
        return {
            h1: (text) => `\n<h1 style="text-align: center;"><span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;"><strong><span style="color:#9b856d;">${text}</span></strong></span></span></h1>`,
            h2: (id, text) => `\n<h2 id="${id}" style="text-align: justify;"><strong><span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${text}</span></span></strong></h2>`,
            h3: (id, text) => `\n<h3 id="${id || ''}" style="text-align: justify;"><span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${text}</span></span></h3>`,
            p: (html) => `\n<p style="text-align: justify;">${html}</p>`,
            ul: (items) => `\n<ul>\n${items.map(i => `\t<li style="text-align: justify;"><span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${i}</span></span></li>`).join('\n')}\n</ul>`,
            ol: (items) => `\n<ol>\n${items.map(i => `\t<li style="text-align: justify;"><span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${i}</span></span></li>`).join('\n')}\n</ol>`,
            img: (src, alt, w, h) => `\n<p style="text-align:center"><img alt="${alt || ''}" ${h ? `height="${h}"` : ''} ${w ? `width="${w}"` : ''} src="${src}" /></p>`
        };
    }

    renderIntro(detail, fallback) {
        const title = (detail.title || fallback.title || fallback.name || '').toUpperCase();
        const subtitle = detail.subtitle || '';
        const intro = (detail.sections || []).find(s => s.id === 'gioi-thieu') || {};

        return [
            this.htmlHelpers.h1(title),
            subtitle ? this.htmlHelpers.h1(subtitle) : '',
            intro.content ? this.htmlHelpers.p(`<span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${intro.content}</span></span>`) : '',
            intro.image ? this.htmlHelpers.img(intro.image, title) : ''
        ].join('');
    }

    renderSection(section, numberingMap, tocChildrenMap) {
        const blocks = [];
        
        // Main heading
        if (section.heading) {
            const num = numberingMap[section.id] ? numberingMap[section.id] + '. ' : '';
            blocks.push(this.htmlHelpers.h2(section.id, `${num}${section.heading}`));
        }

        // Handle subsections
        if (section.subsections && section.subsections.length) {
            section.subsections.forEach((sub) => {
                if (sub.heading) {
                    const num = numberingMap[sub.id] ? numberingMap[sub.id] + ' ' : '';
                    blocks.push(this.htmlHelpers.h3(sub.id, `${num}${sub.heading}`));
                }
                if (sub.content) {
                    blocks.push(this.htmlHelpers.p(`<span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${sub.content}</span></span>`));
                }
                if (Array.isArray(sub.bullets) && sub.bullets.length) {
                    blocks.push(this.htmlHelpers.ul(sub.bullets));
                }
                if (Array.isArray(sub.steps) && sub.steps.length) {
                    blocks.push(this.htmlHelpers.ol(sub.steps));
                }
                if (sub.image) {
                    blocks.push(this.htmlHelpers.img(sub.image, sub.heading));
                }
            });
        } else {
            // Handle regular content
            if (section.content) {
                blocks.push(this.htmlHelpers.p(`<span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${section.content}</span></span>`));
            }

            // Handle TOC children mapping
            const tocChildren = tocChildrenMap[section.id] || [];
            if (tocChildren.length) {
                this.renderTOCChildren(blocks, tocChildren, section);
            } else {
                if (Array.isArray(section.bullets) && section.bullets.length) {
                    blocks.push(this.htmlHelpers.ul(section.bullets));
                }
                if (Array.isArray(section.steps) && section.steps.length) {
                    blocks.push(this.htmlHelpers.ol(section.steps));
                }
            }

            // Images and galleries
            if (section.image) {
                blocks.push(this.htmlHelpers.img(section.image, section.heading, 500));
            }
            if (Array.isArray(section.gallery) && section.gallery.length) {
                blocks.push(section.gallery.map(src => this.htmlHelpers.img(src, '')).join(''));
            }
        }

        return blocks.join('\n');
    }

    renderTOCChildren(blocks, tocChildren, section) {
        const maxLen = Math.max(
            tocChildren.length,
            Array.isArray(section.bullets) ? section.bullets.length : 0,
            Array.isArray(section.steps) ? section.steps.length : 0
        );

        for (let i = 0; i < maxLen; i++) {
            const child = tocChildren[i];
            if (child) {
                blocks.push(this.htmlHelpers.h3(child.id, `${child.number} ${child.label}`));
            }
            if (Array.isArray(section.bullets) && section.bullets[i]) {
                blocks.push(this.htmlHelpers.p(`<span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${section.bullets[i]}</span></span>`));
            }
            if (Array.isArray(section.steps) && section.steps[i]) {
                blocks.push(this.htmlHelpers.p(`<span style="font-size:18px;"><span style="font-family:Times New Roman,Times,serif;">${section.steps[i]}</span></span>`));
            }
        }
    }

    renderAllSections(detail, numberingMap, tocChildrenMap) {
        return (detail.sections || [])
            .filter(s => s.id !== 'gioi-thieu')
            .map(section => this.renderSection(section, numberingMap, tocChildrenMap))
            .join('\n');
    }

    render(detail, fallback, numberingMap, tocChildrenMap) {
        const introHtml = this.renderIntro(detail, fallback);
        const sectionHtml = this.renderAllSections(detail, numberingMap, tocChildrenMap);
        
        return `\n<div id="toc-content" class="content-main w-clear markdownEditor">${introHtml}${sectionHtml}</div>`;
    }
}
