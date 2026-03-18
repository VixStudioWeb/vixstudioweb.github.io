import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import Contact from '../scenes/Contact/Contact';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Preloader from '../components/Preloader';
import PageTransition from '../components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      <PageTransition locationKey={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default function Router() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <BrowserRouter>
      {!isLoaded && <Preloader onComplete={handleLoadComplete} />}
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
