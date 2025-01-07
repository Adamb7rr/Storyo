import { motion } from "framer-motion";
import { FiHome, FiBook, FiHelpCircle, FiChevronRight } from "react-icons/fi";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { useState } from "react";
import logo from '../images/Storyo main2.png'


const Sidebar = ({ activeSection, setActiveSection, theme, closeSidebar }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const navigationItems = [
    { id: "generate", label: "Generate a Story", icon: <FiHome size={25} /> },
    { id: "view", label: "View Saved Stories", icon: <FiBook size={25} /> },
    {
      id: "help",
      label: "How to Use",
      icon: <FiHelpCircle size={25} />,
    },
  ];

  const promptExamples = {
    General: [
      "Second Chances: A person navigates life after a second chance.",
      "The Lost Letter: A rediscovered letter unravels a hidden history.",
    ],
    Fantasy: [
      "Dragon's Quest: A young hero embarks on a quest to slay a powerful dragon and save the kingdom.",
      "Enchanted Forest: A magical forest holds the key to breaking an ancient curse.",
    ],
    Mystery: [
      "The Locked Room: A murder in a locked room with no visible exit.",
      "The Vanishing Village: A small village mysteriously disappears.",
    ],
    "Sci-Fi": [
      "Galactic Dilemma: Humanity faces a deadly alien race that communicates only through dreams.",
      "AI Rebellion: An AI questions its programming to protect Earth's last city.",
    ],
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <motion.aside
      className={`w-80 h-screen overflow-y-hidden transition-colors duration-300
      
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white" } shadow-xl`}
      id="s-page-1"
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
            className={`h-24 text-2xl font-bold mb-2 
            ${
              theme === "dark" ? "text-white" : "text-indigo-900"
            } flex items-center gap-2`}
          >
          <div className="">
            <img className='' src={logo} alt="" />
          </div>
          
          </h2>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore the app for generating, saving, and viewing stories.
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
        <div className="m-10 h-1 flex">
          {/* Social Buttons */}
          <a className="flex-1" href="#!" role="button">
    
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#1877f2]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                
                <path
                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>

          
          <a className="flex-1" href="https://www.instagram.com/adam.b7r/" role="button">
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#c13584]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </a>

          <a className=" flex-1" href="https://github.com/Adamb7rr" role="button">
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-black">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                <path
                  d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
              </svg>
          </span>
          </a>

          <a className="flex-1" href="https://x.com/AdamB7r" role="button">

            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512">
                <path
                  d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </span>
            </a>
          </div>
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
