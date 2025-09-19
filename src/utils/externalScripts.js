// External scripts initialization for React app
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Initialize external libraries when DOM is ready
export const initializeExternalScripts = () => {
  try {
    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }

    // Initialize jQuery plugins if jQuery is available
    if (window.$) {
      try {
        // Show hotline and social buttons
        const hotlineEl = document.getElementById('hotline');
        const socialEl = document.getElementById('social');
        if (hotlineEl) hotlineEl.style.display = 'block';
        if (socialEl) socialEl.style.display = 'block';
        
        // Initialize lazy loading
        if (window.$().lazy) {
          window.$('.lazy').lazy();
        }
        
        // Initialize vanilla lazy loading if available
        if (window.LazyLoad) {
          new window.LazyLoad({
            elements_selector: ".lazy"
          });
        }
        
        // Initialize carousel if needed
        if (window.$().owlCarousel) {
          window.$('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 }
            }
          });
        }
      } catch (jqueryError) {
        console.warn('jQuery initialization failed:', jqueryError);
      }
    }

    // Initialize Facebook SDK
    if (window.FB) {
      try {
        window.FB.XFBML.parse();
      } catch (fbError) {
        console.warn('Facebook SDK initialization failed:', fbError);
      }
    }

    // Initialize Google Analytics
    if (window.gtag) {
      try {
        window.gtag('config', 'G-1XG2FE1PPB');
      } catch (gaError) {
        console.warn('Google Analytics initialization failed:', gaError);
      }
    }

    // Initialize scroll rotation effect
    try {
      window.onscroll = function() {
        scrollRotate();
      };

      function scrollRotate() {
        let el = document.getElementsByClassName("svg_circle");
        if (el.length > 0) {
          el = el[0];
          el.style.transform = "rotate(" + window.pageYOffset / 2 + "deg)";
        }
      }
    } catch (scrollError) {
      console.warn('Scroll effect initialization failed:', scrollError);
    }
  } catch (error) {
    console.warn('External scripts initialization failed:', error);
  }
};

// Load external scripts dynamically
export const loadExternalScripts = () => {
  // Temporarily disable all external scripts to avoid errors
  console.log('External scripts loading disabled to prevent errors');
  
  // const scripts = [
  //   '/assets/js/lazyload.min.js',
  //   'https://unpkg.com/aos@next/dist/aos.js',
  //   'https://static.addtoany.com/menu/page.js',
  //   'https://sp.zalo.me/plugins/sdk.js',
  // ];

  // scripts.forEach(src => {
  //   const script = document.createElement('script');
  //   script.src = src;
  //   script.async = true;
  //   script.onerror = (e) => {
  //     console.warn(`Failed to load script: ${src}`, e);
  //   };
  //   document.head.appendChild(script);
  // });
};
