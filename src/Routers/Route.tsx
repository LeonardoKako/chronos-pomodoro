import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AboutPomodoro from '../pages/AboutPomodoro';
import { useEffect } from 'react';
import History from '../pages/History';
import Settings from '../pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<NotFound />} path='*' />
        <Route element={<AboutPomodoro />} path='/about-pomodoro' />
        <Route element={<Settings />} path='/settings' />
        <Route element={<History />} path='/history' />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default MainRoute;
