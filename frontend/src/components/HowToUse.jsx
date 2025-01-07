import { motion } from 'framer-motion';
import { FiBookOpen, FiSave, FiEye, FiInfo, FiStar } from 'react-icons/fi';
import { RiMagicLine, RiLightbulbFlashLine } from 'react-icons/ri';

const HowToUse = ({ theme }) => {
  const features = [
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: "Generate a Story",
      description: "Create unique stories with AI assistance",
      steps: [
        "Enter a creative prompt to guide the storytelling",
        "Choose from various storytelling modes (Sci-Fi, Mystery, Fantasy, etc.)",
        "Adjust story length and creativity levels to your preference",
        "Click 'Generate' to create your unique story"
      ],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FiSave className="w-6 h-6" />,
      title: "Save Your Stories",
      description: "Keep your favorite generated stories",
      steps: [
        "Review your generated story",
        "Click 'Save Story' to store it in your collection",
        "Access your saved stories anytime",
        "Build your personal story library"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "View & Manage Stories",
      description: "Access your story collection",
      steps: [
        "Browse through your saved stories",
        "Search and filter your story collection",
        "Share stories with others",
        "Organize your stories by categories"
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const tips = [
    {
      icon: <RiLightbulbFlashLine />,
      text: "Use the sidebar prompt examples for inspiration"
    },
    {
      icon: <RiMagicLine />,
      text: "Experiment with different creativity levels for varied results"
    },
    {
      icon: <FiStar />,
      text: "Save your favorite prompts for future use"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-6xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <h2 className={`text-4xl font-bold mb-4 
          ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          🔍 How to Use Storyo AI
        </h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Create, save, and manage your AI-generated stories with ease
        </p>
      </motion.div>

      {/* Scrollable Content Section */}
      <div className={` overflow-y-auto`}>
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}
            >
              {/* Feature Header */}
              <div className={`p-6 bg-gradient-to-r ${feature.color}`}>
                <div className="flex items-center gap-4 text-white">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-2 text-white/80">{feature.description}</p>
              </div>

              {/* Feature Steps */}
              <div className="p-6">
                <ul className="space-y-3">
                  {feature.steps.map((step, stepIndex) => (
                    <motion.li
                      key={stepIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (stepIndex * 0.1) }}
                      className={`flex items-center gap-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      {step}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-xl p-6 ${
            theme === 'dark'
              ? 'bg-indigo-900/50 border border-indigo-800'
              : 'bg-indigo-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiInfo className="w-5 h-5 text-indigo-500" />
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-indigo-900'
            }`}>
              Pro Tips
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800/50'
                    : 'bg-white'
                } shadow-sm`}
              >
                <div className="text-indigo-500 text-xl">
                  {tip.icon}
                </div>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {tip.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need more help? Read the documentation  <a  className='text-lg text-sky-600 dark:text-indigo-600' href="https://github.com/Adamb7rr/Storyo/blob/main/README.md">Here📄</a>.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowToUse;
