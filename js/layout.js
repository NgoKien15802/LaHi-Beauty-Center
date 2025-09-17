// Layout and route handlers for LaHi Beauty Center
// Using vanilla-spa-router pattern

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer first
    loadHeaderAndFooter();
    
    // Define routes
    setupRoutes();
    
    // Initialize any other functionality
    initializeApp();
});

// Load header and footer
function loadHeaderAndFooter() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = html;
            }
        })
        .catch(error => {
            // Error loading header
        });
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        })
        .catch(error => {
            // Error loading footer
        });
}

// Setup all routes
function setupRoutes() {
    
    // Home page
    router.addRoute('/', function() {
        loadPage('pages/home.html', 'Trang chủ');
    });
    
    // About page
    router.addRoute('/about', function() {
        loadPage('pages/about.html', 'Về chúng tôi');
    });
    
    // Services page
    router.addRoute('/services', function() {
        loadPage('pages/services.html', 'Dịch vụ');
    });
    
    // Products page
    router.addRoute('/products', function() {
        loadPage('pages/products.html', 'Sản phẩm');
    });
    
    // Feedback page
    router.addRoute('/feedback', function() {
        loadPage('pages/feedback.html', 'Feedback');
    });
    
    // News page
    router.addRoute('/news', function() {
        loadPage('pages/news.html', 'Tin tức');
    });
    
    // Contact page
    router.addRoute('/contact', function() {
        loadPage('pages/contact.html', 'Liên hệ');
    });
    
    // Service detail pages
    router.addRoute('/service/:serviceId', function(params) {
        loadServicePage(params.serviceId);
    });
    
    // Catch-all route for 404
    router.addRoute('*', function() {
        router.handle404();
    });
    
    router.start();
}

// Load page content
function loadPage(pageName, pageTitle) {
    const content = document.getElementById('content');
    if (!content) {
        return;
    }
    
    // Show loading state
    content.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2>Đang tải ${pageTitle}...</h2>
            <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 20px auto;"></div>
            <p>Vui lòng chờ trong giây lát...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    // Fetch page content
    fetch(pageName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Parse HTML and extract main content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Try to find main content area
            let mainContent = doc.querySelector('.main-content') || 
                            doc.querySelector('main') || 
                            doc.querySelector('.content') ||
                            doc.body;
            
            if (mainContent) {
                content.innerHTML = mainContent.innerHTML;
                
                // Update page title
                document.title = pageTitle + ' - LaHi Beauty Center';
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Re-initialize any scripts that might be needed
                initializePageScripts();
                
                // Re-initialize AOS if it exists
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            } else {
                content.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <h2>${pageTitle}</h2>
                        <p>Nội dung trang đã được tải thành công!</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            content.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #e74c3c;">
                    <h2>Lỗi tải trang</h2>
                    <p>Không thể tải trang: ${pageName}</p>
                    <a href="/" data-route="/" style="color: #3498db;">← Về trang chủ</a>
                </div>
            `;
        });
}

// Load service detail page
function loadServicePage(serviceId) {
    
    const serviceMap = {
        'triet-long-diode-laser': 'triet-long-diode-laser.html',
        'phun-moi-phun-may': 'phun-moi-phun-may.html',
        'hifu-new-double': 'hifu-new-double.html',
        'glass-skin-da-tang': 'glass-skin-da-tang.html',
        'giam-dau-mun-lo-chan-long': 'giam-dau-mun-lo-chan-long.html',
        'duong-trang': 'duong-trang.html',
        'chemical-peeling': 'chemical-peeling.html',
        'cham-soc-da-chuyen-sau': 'cham-soc-da-chuyen-sau.html'
    };
    
    const pageName = serviceMap[serviceId];
    if (pageName) {
        loadPage(pageName, 'Chi tiết dịch vụ');
    } else {
        router.handle404();
    }
}

function initializePageScripts() {
    // Re-initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Initialize app
function initializeApp() {
    // Add any global event listeners here
    // For example, handle form submissions, etc.
}

// Export functions for global use
window.loadPage = loadPage;
window.loadServicePage = loadServicePage;