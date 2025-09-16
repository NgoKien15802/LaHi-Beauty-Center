// --- Tự động redirect nếu không phải index.html ---
let currentPage = window.location.pathname;
currentPage = currentPage.substring(currentPage.lastIndexOf("/") + 1);

// Nếu currentPage rỗng, mặc định là index.html
if (!currentPage) currentPage = "index.html";

if (currentPage !== "index.html") {
    window.location.href = `index.html?page=${currentPage}`;
}


// --- Định nghĩa SiteLayout ---
class SiteLayout extends HTMLElement {
    async connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("page") || "trangchu.html";

        const [header, footer, main] = await Promise.all([
            fetch("header.html").then(r => r.text()),
            fetch("footer.html").then(r => r.text()),
            fetch(page).then(r => r.text())
        ]);

        this.innerHTML = `
            <header>${header}</header>
            <main>${main}</main>
            <footer>${footer}</footer>
        `;
    }
}

customElements.define("site-layout", SiteLayout);
