import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import GenerateStory from './components/GenerateStory';
import ViewStories from './components/ViewStories';
import HowToUse from './components/HowToUse';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

function App() {
  const [activeSection, setActiveSection] = useState('generate');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Theme toggler
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white md:hidden hover:bg-indigo-700 transition-colors"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Sidebar with Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed md:relative z-40"
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
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-transparent'}
        ${!isSidebarOpen ? 'ml-0' : 'md:ml-0 ml-[320px]'}`}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl font-bold mb-3 py-3 text-center
            ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}
            bg-clip-text text-transparent bg-gradient-to-r 
            ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-indigo-600 to-purple-600'}`}>
            Storyo - AI Storytelling
          </h1>

          {/* Content Sections with Animation */}
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;