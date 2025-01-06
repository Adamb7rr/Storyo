import { motion } from "framer-motion";
import { FiHome, FiBook, FiHelpCircle, FiChevronRight } from "react-icons/fi";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useState } from "react";

const Sidebar = ({ activeSection, setActiveSection, theme, closeSidebar }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const navigationItems = [
    { id: "generate", label: "Generate a Story", icon: <FiHome size={20} /> },
    { id: "view", label: "View Saved Stories", icon: <FiBook size={20} /> },
    {
      id: "help",
      label: "How to Use the App",
      icon: <FiHelpCircle size={20} />,
    },
  ];

  const promptExamples = {
    "Sci-Fi": [
      "Galactic Dilemma: Humanity faces a deadly alien race that communicates only through dreams.",
      "AI Rebellion: An AI questions its programming to protect Earth's last city.",
    ],
    Mystery: [
      "The Locked Room: A murder in a locked room with no visible exit.",
      "The Vanishing Village: A small village mysteriously disappears.",
    ],
    General: [
      "Second Chances: A person navigates life after a second chance.",
      "The Lost Letter: A rediscovered letter unravels a hidden history.",
    ],
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <motion.aside
      className={`w-80 h-screen overflow-y-auto transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"} shadow-xl`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
    >
      {/* Logo Section */}
      <div
        className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`text-2xl font-bold mb-2 
            ${
              theme === "dark" ? "text-white" : "text-indigo-900"
            } flex items-center gap-2`}
          >
            📚 Navigation
          </h2>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore the app to generate, save, or view stories.
          </p>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200
              flex items-center gap-3 
              ${
                activeSection === item.id
                  ? theme === "dark"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-50"
              }`}
          >
            {item.icon}
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Prompt Examples Section */}
      <div className="p-6">
        <h3
          className={`text-xl font-semibold mb-4 flex items-center gap-2
          ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
        >
          <RiLightbulbFlashLine size={24} />
          Prompt Examples
        </h3>

        <div className="space-y-4">
          {Object.entries(promptExamples).map(([category, examples]) => (
            <motion.div key={category} initial={false}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full flex items-center justify-between p-3 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-indigo-50"
                  } transition-colors duration-200`}
              >
                <span
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-indigo-800"
                  }`}
                >
                  {category}
                </span>
                <motion.div
                  animate={{ rotate: expandedCategory === category ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronRight />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedCategory === category ? "auto" : 0,
                  opacity: expandedCategory === category ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 mt-2">
                  {examples.map((example, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-sm italic pl-4 border-l-2 
                        ${
                          theme === "dark"
                            ? "text-gray-400 border-gray-600"
                            : "text-gray-600 border-indigo-200"
                        } cursor-pointer hover:bg-opacity-10 hover:bg-indigo-600 p-2 rounded-r-lg
                        transition-colors duration-200`}
                      onClick={() => {
                        // You can add functionality to auto-fill the prompt
                        // when clicking on an example
                      }}
                    >
                      {example}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`p-6 border-t mt-2 
        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        {/* Footer */}
        <div
          className={`mt-2 text-center text-sm
            ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          <p>© 2025 ADAM BAHR. All rights reserved.</p>
        </div>
      </footer>
    </motion.aside>
  );
};

export default Sidebar;
