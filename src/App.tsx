import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Menu, X, Instagram, Linkedin, Mail, Phone, MapPin, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

const Navbar = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Trajetória', path: '/about' },
  ];

  if (user) {
    navLinks.push({ name: 'Gestão', path: '/admin' });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="serif text-2xl font-light tracking-widest uppercase">
          Lobo Soares
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs uppercase tracking-widest transition-colors hover:text-accent",
                location.pathname === link.path ? "text-accent font-semibold" : "text-ink/60"
              )}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button onClick={() => auth.signOut()} className="text-ink/60 hover:text-accent transition-colors">
              <LogOut size={18} />
            </button>
          ) : (
            <Link to="/login" className="text-ink/60 hover:text-accent transition-colors">
              <UserIcon size={18} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-paper border-b border-ink/10 px-6 py-8 flex flex-col space-y-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-widest",
                  location.pathname === link.path ? "text-accent font-semibold" : "text-ink/60"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <button onClick={() => auth.signOut()} className="flex items-center space-x-2 text-ink/60">
                <LogOut size={18} />
                <span className="text-sm uppercase tracking-widest">Sair</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-ink text-paper py-20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="serif text-3xl font-light mb-6">Lobo Soares</h3>
        <p className="text-paper/60 text-sm leading-relaxed max-w-xs">
          Arquiteto PhD, Museólogo e Artista Plástico. Uma trajetória dedicada à cultura, ciência e preservação do patrimônio.
        </p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest mb-6 opacity-50">Contato</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-center space-x-3">
            <Mail size={16} className="opacity-50" />
            <a href="mailto:lobosoares@hotmail.com" className="hover:text-accent transition-colors">lobosoares@hotmail.com</a>
          </li>
          <li className="flex items-center space-x-3">
            <Phone size={16} className="opacity-50" />
            <a href="https://wa.me/5591993432027" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">+55 91 99343-2027</a>
          </li>
          <li className="flex items-center space-x-3">
            <MapPin size={16} className="opacity-50" />
            <span>Belém, Pará, Brasil</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest mb-6 opacity-50">Social</h4>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/aclobosoares/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/antonio-carlos-lobo-soares-02851048/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-paper/10 text-xs opacity-30 text-center">
      © {new Date().getFullYear()} Antonio Carlos Lobo Soares. Todos os direitos reservados.
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-paper">
        <div className="serif text-2xl animate-pulse tracking-widest uppercase">Lobo Soares</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={user ? <AdminDashboard /> : <Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
