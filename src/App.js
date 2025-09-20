import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Products from './pages/Products';
import Feedback from './pages/Feedback';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Import external libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import { initializeExternalScripts, loadExternalScripts } from './utils/externalScripts';

function App() {
  useEffect(() => {
    try {
      // Load external scripts first
      loadExternalScripts();
      
      // Initialize external libraries after scripts are loaded
      const timer = setTimeout(() => {
        try {
          initializeExternalScripts();
        } catch (error) {
          console.warn('External scripts initialization failed:', error);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.warn('App initialization failed:', error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="service/:serviceId" element={<ServiceDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="news" element={<News />} />
          <Route path="news/:newsSlug" element={<NewsDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
