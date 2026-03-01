import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import GenerateStory from './components/GenerateStory';
import ViewStories from './components/ViewStories';
import HowToUse from './components/HowToUse';
import VantaFog from './components/VantaFog';
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
      <div className=" flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }


  return (
    <div className={`h-screen overflow-hidden flex transition-colors duration-300 bg-black text-white`}>
      <VantaFog theme={theme} />


      {/* Sidebar Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg"
        aria-label="Toggle Sidebar"
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
      <motion.div
        initial={false}
        animate={{
          width: isSidebarOpen ? 320 : 80, // w-80 = 320px, w-20 = 80px
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 h-full md:sticky md:h-screen z-40 ${!isSidebarOpen ? 'hidden md:block' : 'block'}`}
      >
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          theme={theme}
          isCollapsed={!isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </motion.div>

      {/* Main Content */}
      <main className={` flex-1 h-screen overflow-y-auto w-full min-w-0 p-4 sm:p-8 pt-12 sm:pt-20 md:pt-8 transition-all duration-300 relative z-10
        ${!isSidebarOpen ? 'ml-0' : ''}`}>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}

        >


          <div className="text-center mb-4 sm:mb-10 py-2 sm:py-4">
            <h1 className={`text-4xl sm:text-6xl font-black mb-2 sm:mb-4 tracking-tight
              ${theme === 'dark' ? 'text-white' : 'text-indigo-950'}`}>
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Storyo</span>
            </h1>
            <p className={`text-base sm:text-xl font-semibold max-w-2xl mx-auto
              ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-900/70'}`}>
              An AI-driven platform for generating creative stories.
            </p>
          </div>
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
          className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;