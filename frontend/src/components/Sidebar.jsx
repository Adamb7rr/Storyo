import { motion } from "framer-motion";
import { FiHome, FiBook, FiHelpCircle, FiChevronRight, FiX } from "react-icons/fi";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useState } from "react";

const Sidebar = ({ activeSection, setActiveSection, closeSidebar }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const navigationItems = [
    { id: "generate", label: "Generate a Story", icon: <FiHome size={22} /> },
    { id: "view", label: "View Saved Stories", icon: <FiBook size={22} /> },
    { id: "help", label: "How to Use", icon: <FiHelpCircle size={22} /> },
  ];

  const promptExamples = {
    General: [
      "Second Chances: A person navigates life after a second chance.",
      "The Lost Letter: A rediscovered letter unravels a hidden history.",
    ],
    Fantasy: [
      "Dragon's Quest: A young hero embarks on a quest to slay a powerful dragon.",
      "Enchanted Forest: A magical forest holds the key to breaking a curse.",
    ],
    Mystery: [
      "The Locked Room: A murder in a locked room with no visible exit.",
      "The Vanishing Village: A small village mysteriously disappears.",
    ],
    "Sci-Fi": [
      "Galactic Dilemma: Humanity faces a deadly alien race.",
      "AI Rebellion: An AI questions its programming.",
    ],
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <motion.aside
      className="w-80 h-screen bg-[#1a1c2e] text-white flex flex-col border-r border-white/5"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
    >
      {/* Close Button for Mobile */}
      <div className="md:hidden p-4 flex justify-end">
        <button onClick={closeSidebar}><FiX size={24} /></button>
      </div>

      {/* Logo Section */}
      <div className="p-8 pt-10">
        <div className="storyo-logo mb-4">STORYO</div>
        <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
          Explore the app for generating, saving, and viewing stories.
        </p>
      </div>

      {/* Navigation */}
      <div className="px-4 space-y-2 mt-4">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group
              ${activeSection === item.id 
                ? "bg-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
          >
            <span className={activeSection === item.id ? "text-white" : "group-hover:text-white"}>
              {item.icon}
            </span>
            <span className="text-sm font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Prompt Examples */}
      <div className="mt-10 px-8 flex-1 overflow-y-auto custom-scrollbar pb-10">
        <h3 className="text-sm font-bold text-white/80 flex items-center gap-2 mb-6 uppercase tracking-widest">
          <RiLightbulbFlashLine className="text-purple-400" size={18} />
          Prompt Examples
        </h3>

        <div className="space-y-3">
          {Object.entries(promptExamples).map(([category, examples]) => (
            <div key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group"
              >
                <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{category}</span>
                <FiChevronRight 
                  className={`transition-transform duration-300 text-purple-400 
                    ${expandedCategory === category ? "rotate-90" : ""}`} 
                />
              </button>

              {expandedCategory === category && (
                <div className="mt-2 space-y-2 px-1">
                  {examples.map((example, i) => (
                    <div 
                      key={i}
                      className="p-3 text-[11px] leading-relaxed text-white/40 bg-white/3 border-l-2 border-purple-500/30 rounded-r-lg hover:text-white/80 transition-colors cursor-pointer"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-white/20 tracking-widest">
          © 2025 ADAM. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </motion.aside>
  );
};

export default Sidebar;
