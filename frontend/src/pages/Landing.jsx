import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import GenerateStory from '../components/GenerateStory';
import ViewStories from '../components/ViewStories';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [activeSection, setActiveSection] = useState('generate');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#0d0e1b] dashboard-gradient overflow-hidden">
      
      {/* Sidebar Section */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="fixed md:relative z-50 h-screen"
          >
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* Header Navigation */}
        <header className="p-6 flex justify-between items-center relative z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/70 hover:text-white"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <Link to="/dashboard" className="w-10 h-10 bg-[#6366f1] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20">
                <FiUser size={20} />
              </Link>
            ) : (
              <Link to="/login" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-all">
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Section Content */}
        <main className="flex-1 flex flex-col items-center px-6 pb-20 relative z-10">
          
          {/* Welcome Message from Screenshot */}
          <div className="text-center mb-12 mt-4">
            <h2 className="text-xl md:text-2xl font-medium text-white/90">
              Welcome to <span className="text-teal-400 font-bold">Storyo</span>, an AI-driven platform for generating creative stories.
            </h2>
          </div>

          <div className="w-full max-w-6xl">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === 'generate' && <GenerateStory />}
                {activeSection === 'view' && <ViewStories />}
                {activeSection === 'help' && (
                  <div className="prompt-card text-center py-20">
                    <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
                    <p className="text-white/40">Detailed tutorials are on their way.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Landing;
