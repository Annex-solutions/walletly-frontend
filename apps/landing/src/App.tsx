import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BareLayout, Layout } from './components/Layout';
import Home from './pages/Home';

const Platform = lazy(() => import('./pages/Platform'));
const Developers = lazy(() => import('./pages/Developers'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="platform" element={<Platform />} />
          <Route path="developers" element={<Developers />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<BareLayout />}>
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
