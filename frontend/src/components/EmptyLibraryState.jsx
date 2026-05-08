import { motion } from 'framer-motion';
import { FiBookOpen, FiUserPlus, FiLogIn } from 'react-icons/fi';

const EmptyLibraryState = ({ onSignIn, onSignUp }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-[2.5rem] p-12 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Magical Dust Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full blur-[1px]"
            animate={{
              y: [0, -100],
              x: [0, (i % 2 === 0 ? 20 : -20)],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: '10%',
            }}
          />
        ))}

        {/* Sad Bookshelf Illustration (Simplified with Icons/Shapes) */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-48 h-40 border-b-4 border-x-4 border-amber-900/40 dark:border-amber-700/30 rounded-b-xl relative">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-amber-900/40 dark:border-amber-700/30" />
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-900/20 dark:text-amber-700/10"
            >
              <FiBookOpen size={80} />
            </motion.div>
          </div>
          <div className="absolute -top-4 -right-2 text-purple-500/40 animate-pulse">✨</div>
          <div className="absolute top-10 -left-4 text-teal-500/40 animate-pulse delay-75">✨</div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-serif">
          Ooh, it’s a bit empty in here!
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          You need to Sign In or Sign Up to view and manage your saved stories.
          Don't worry, it's <span className="font-semibold text-teal-600 dark:text-teal-400">100% free!</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onSignIn}
            className="w-full sm:w-40 py-3.5 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-semibold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <FiLogIn className="group-hover:-translate-x-1 transition-transform" />
            Sign In
          </button>

          <button
            onClick={onSignUp}
            className="w-full sm:w-40 py-3.5 border-2 border-gray-300 dark:border-gray-600 hover:border-teal-500 dark:hover:border-teal-500 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 group"
          >
            <FiUserPlus className="group-hover:scale-110 transition-transform" />
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyLibraryState;
