import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApartmentSpaces from './pages/ApartmentSpaces';
import Experiences from './pages/Experiences';
import Gallery from './pages/Gallery';
import HouseRules from './pages/HouseRules';
import Partners from './pages/Partners';
import Booking from './pages/Booking';
import CancelBooking from './pages/CancelBooking';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 md:pt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartman-terei" element={<ApartmentSpaces />} />
            <Route path="/elmenyek" element={<Experiences />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/hazirend" element={<HouseRules />} />
            <Route path="/partnereink" element={<Partners />} />
            <Route path="/ajanlatkeres" element={<Booking />} />
            <Route path="/cancel-booking" element={<CancelBooking />} />
            <Route path="/altalanos-szerzodesi-feltetelek" element={<TermsOfService />} />
            <Route path="/adatvedelmi-nyilatkozat" element={<PrivacyPolicy />} />
            <Route path="/jogi-nyilatkozat" element={<LegalNotice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
