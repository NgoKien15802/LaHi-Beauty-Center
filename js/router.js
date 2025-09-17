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

        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigate(route);
            }
        });
    }
    
    // Start routing after routes are added
    start() {
        this.handleRoute();
    }

    // Navigate to a route
    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    // Handle route matching and execution
    handleRoute() {
        const currentPath = window.location.pathname;

        // Find matching route
        const route = this.routes.find(r => {
            if (r.path === '*') return true; // catch-all route
            if (r.path === currentPath) return true; // exact match
            if (r.path.includes(':')) return this.matchDynamicRoute(r.path, currentPath); // dynamic route
            return false;
        });

        if (route) {
            console.log('Route found:', route.path);
            this.currentRoute = route;
            
            // Extract params for dynamic routes
            const params = this.extractParams(route.path, currentPath);
            
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
