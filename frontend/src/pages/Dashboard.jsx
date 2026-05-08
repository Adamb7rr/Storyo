import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import GenerateStory from '../components/GenerateStory';
import ViewStories from '../components/ViewStories';
import HowToUse from '../components/HowToUse';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('generate');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden flex min-h-screen transition-colors duration-300 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Top Action Buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg"
          title="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: -50 }}
            animate={{ width: "auto", opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed md:relative z-40 overflow-hidden"
          >
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              theme={theme}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 p-8 pt-20 md:pt-8 transition-all duration-300 
        ${theme === 'dark' ? '[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]' : '[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'}
        ${!isSidebarOpen ? 'ml-0' : ''}`}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-3 py-3
              ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}
              bg-clip-text text-transparent bg-gradient-to-r 
              ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-indigo-600 to-purple-600'}`}>
              Storyo Dashboard
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-indigo-500">{currentUser?.email}</span>
            </p>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto max-w-6xl"
            >
              {activeSection === 'generate' && <GenerateStory theme={theme} />}
              {activeSection === 'view' && <ViewStories theme={theme} />}
              {activeSection === 'help' && <HowToUse theme={theme} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
