// Vanilla SPA Router - Based on https://github.com/mitchwadair/vanilla-spa-router
class Router {
    constructor() {
        this.routes = [];
        this.currentRoute = null;
        this.init();
    }

    // Add a route
    addRoute(path, handler) {
        this.routes.push({
            path: path,
            handler: handler
        });
    }

    // Initialize router
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRoute();
        });

        // Handle link clicks (support clicks on children inside [data-route])
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (!link) return;
            // Respect modifier keys and non-left clicks
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            const route = link.getAttribute('data-route');
            this.navigate(route);
        });
    }
    
    // Start routing after routes are added
    start() {
        this.handleRoute();
    }

    // Navigate to a route
    navigate(path) {
        
        // Check if we're on GitHub Pages (has repository name in URL)
        const isGitHubPages = this.isGitHubPages();
        let fullPath = path;
        
        if (isGitHubPages) {
            const repoName = this.getRepoName();
            if (repoName && !path.includes(repoName)) {
                fullPath = '/' + repoName + path;
            }
        }
        
        window.history.pushState({}, '', fullPath);
        this.handleRoute();
    }

    // Navigate with query parameters
    navigateWithParams(path, params = {}) {
        const url = new URL(path, window.location.origin);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            }
        });
        
        // Check if we're on GitHub Pages
        const isGitHubPages = this.isGitHubPages();
        let fullPath = url.pathname + url.search;
        
        if (isGitHubPages) {
            const repoName = this.getRepoName();
            if (repoName && !fullPath.includes(repoName)) {
                fullPath = '/' + repoName + fullPath;
            }
        }
        
        window.history.pushState({}, '', fullPath);
        this.handleRoute();
    }

    // Handle route matching and execution
    handleRoute() {
        let currentPath = window.location.pathname;
        
        // Remove repository name from GitHub Pages URL if needed
        if (this.isGitHubPages()) {
            const repoName = this.getRepoName();
            if (repoName) {
                currentPath = currentPath.replace('/' + repoName, '');
            }
        }
        
        // Ensure path starts with /
        if (!currentPath.startsWith('/')) {
            currentPath = '/' + currentPath;
        }

        // Find matching route
        const route = this.routes.find(r => {
            if (r.path === '*') return true; // catch-all route
            if (r.path === currentPath) return true; // exact match
            if (r.path.includes(':')) return this.matchDynamicRoute(r.path, currentPath); // dynamic route
            return false;
        });

        if (route) {
            this.currentRoute = route;
            
            // Extract params for dynamic routes
            const params = this.extractParams(route.path, currentPath);
            
            // Add query parameters to params
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.forEach((value, key) => {
                params[key] = value;
            });
            
            // Execute route handler
            route.handler(params);
        } else {
            this.handle404();
        }
    }

    // Match dynamic route (e.g., /user/:id)
    matchDynamicRoute(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const currentParts = currentPath.split('/');
        
        if (routeParts.length !== currentParts.length) return false;
        
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) continue; // skip params
            if (routeParts[i] !== currentParts[i]) return false;
        }
        
        return true;
    }

    // Extract parameters from dynamic route
    extractParams(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const currentParts = currentPath.split('/');
        const params = {};
        
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                const paramName = routeParts[i].substring(1);
                params[paramName] = currentParts[i];
            }
        }
        
        return params;
    }

    // Check if we're running on GitHub Pages
    isGitHubPages() {
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;
        
        // GitHub Pages domains
        const isGitHubPagesDomain = hostname.includes('github.io') || 
                                   hostname.includes('github.com');
        
        // Check if URL has repository name pattern
        const hasRepoName = pathname.split('/')[1] && 
                           pathname.split('/')[1] !== '' &&
                           !pathname.split('/')[1].includes('.');
        
        return isGitHubPagesDomain && hasRepoName;
    }
    
    // Get repository name from URL
    getRepoName() {
        const pathParts = window.location.pathname.split('/');
        return pathParts[1] || null;
    }

    // Handle 404 - route not found
    handle404() {
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h2>404 - Trang không tìm thấy</h2>
                    <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
                    <a href="/" data-route="/">← Về trang chủ</a>
                </div>
            `;
        }
    }
}

// Create router instance
const router = new Router();

// Export for use in other files
window.router = router;
