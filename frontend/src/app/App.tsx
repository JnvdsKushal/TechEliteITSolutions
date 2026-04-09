// ── src/app/App.tsx ───────────────────────────────────────────────────────
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ScrollToTop }          from './components/ScrollToTop';   // ← ADD
import { AnnouncementBar }      from './pages/Announcementbar';
import { Navigation }           from './components/Navigation';
import { Footer }               from './components/Footer';
import { AdminLayout }          from './pages/admin/Adminlayout';
import { AdminDashboard }       from './pages/admin/AdminDashboard';
import { AdminCourses }         from './pages/admin/AdminCourses';
import { AdminBookings }        from './pages/admin/AdminBookings';
import { AdminEnrollments }     from './pages/admin/AdminEnrollments';
import { AdminAnnouncements }   from './pages/admin/Adminannouncements';

import { Home }           from './pages/Home';
import { Services }       from './pages/Services';
import { OnlineCourses }  from './pages/OnlineCourses';
import { OfflineCourses } from './pages/OfflineCourses';
import { Placements }     from './pages/Placements';
import { CourseDetail }   from './pages/CourseDetail';
import { About }          from './pages/About';
import { Contact }        from './pages/Contact';
import { Booking }        from './pages/Booking';
import { Login }          from './pages/Login';
import { Register }       from './pages/Register';
import { Profile }        from './pages/Profile';

function PublicLayout() {
  const location = useLocation();
  const hideFooter = ['/login', '/register'].includes(location.pathname);

return (
  <>
    {/* Fixed top section */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <Navigation />
    </div>

    {/* Push content down properly */}
    <main className="mt-[112px]">
      <Outlet />
      {!hideFooter && <Footer />}
    </main>
  </>
);
}

export default function App() {
  return (
    <>
      {/* ← ScrollToTop must be INSIDE BrowserRouter (which wraps App in main.tsx) */}
      <ScrollToTop />

      <Routes>
        {/* ── Admin ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                element={<AdminDashboard />} />
          <Route path="courses"       element={<AdminCourses />} />
          <Route path="bookings"      element={<AdminBookings />} />
          <Route path="enrollments"   element={<AdminEnrollments />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>

        {/* ── Public ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"                   element={<Home />} />
          <Route path="/services"           element={<Services />} />
          <Route path="/courses/online"     element={<OnlineCourses />} />
          <Route path="/courses/offline"    element={<OfflineCourses />} />
          <Route path="/courses/placements" element={<Placements />} />
          <Route path="/course/:slug"       element={<CourseDetail />} />
          <Route path="/about"              element={<About />} />
          <Route path="/contact"            element={<Contact />} />
          <Route path="/booking"            element={<Booking />} />
          <Route path="/login"              element={<Login />} />
          <Route path="/register"           element={<Register />} />
          <Route path="/profile"            element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}