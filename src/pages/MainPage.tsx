import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const MainPage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;