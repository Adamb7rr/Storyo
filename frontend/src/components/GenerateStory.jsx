import { useState, useRef, useEffect } from "react";
import { FiRefreshCw, FiChevronDown } from "react-icons/fi";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";


const GenerateStory = () => {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("fantasy");
  const [length, setLength] = useState(300);
  const [creativity, setCreativity] = useState(0.7);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const genres = [
    { value: "general", label: "General Fiction", icon: "📝" },
    { value: "fantasy", label: "Epic Fantasy", icon: "🧙‍♂️" },
    { value: "sci-fi", label: "Sci-Fi Universe", icon: "🚀" },
    { value: "mystery", label: "Noir Mystery", icon: "🔍" },
  ];

  const currentGenre = genres.find(g => g.value === mode) || genres[1];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const magicPrompts = [
    "A cyberpunk detective investigates a murder in a city of neon lights.",
    "The last dragon forms an unlikely bond with a young inventor.",
    "A hidden society of time travelers tries to prevent a global disaster.",
    "A lost spaceship discovers a planet made entirely of crystalline structures."
  ];

  const generateMagicPrompt = () => {
    const randomPrompt = magicPrompts[Math.floor(Math.random() * magicPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a valid prompt!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/generate_story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          mode: mode,
          max_length: length,
          temperature: creativity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate story");
      }

      const cleanTitle = data.title.replace(/\*\*/g, "").trim();

      setGeneratedStory({
        title: cleanTitle,
        story: data.story,
      });

      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to generate story");
      setGeneratedStory(null);
    } finally {
      setLoading(false);
    }
  };


  const handleSave = async () => {
    if (!generatedStory) {
      setError("No story to save!");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/save_story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: generatedStory.title,
          prompt: prompt,
          story: generatedStory.story,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save story");
      }

      alert("Story saved successfully!");
    } catch (error) {
      console.error("Error saving story:", error);
      setError(error.message || "Failed to save story");
    }
  };

  return (
    <div className="min-h-0 w-full relative flex flex-col items-center py-0 sm:py-6 px-2 sm:px-6 lg:px-8 transition-colors duration-300">

      <div className="w-full max-w-5xl relative z-10 flex-1 flex flex-col justify-center">

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 backdrop-blur-md text-red-600 dark:text-red-400 flex items-center shadow-sm">
            <span className="text-xl mr-3">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/50 dark:border-gray-700/50 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-3 sm:p-8 lg:p-10 overflow-visible relative">

          <div className="mb-2 sm:mb-6 text-center">
            <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight mb-1 drop-shadow-sm">
              Bring Your Next Amazing Story to Life
            </h2>
            <p className="hidden sm:block text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Harness the power of advanced AI to instantly forge captivating narratives, intricate worlds, and unforgettable characters.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 rounded-[1.5rem] p-2 shadow-inner">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the world, characters, or plot you want to explore..."
                  className="w-full h-20 sm:h-40 p-3 sm:p-6 pb-12 text-gray-800 dark:text-gray-100 bg-transparent border-none focus:ring-0 resize-none text-base sm:text-lg outline-none placeholder-gray-400/80 dark:placeholder-gray-500 leading-relaxed font-medium"
                />
                <div className="absolute bottom-4 left-4 sm:top-6 sm:right-8 sm:bottom-auto sm:left-auto text-gray-400 dark:text-gray-500 text-[10px] sm:text-sm font-bold tracking-wide">
                  {prompt.length} characters
                </div>
                <button
                  onClick={generateMagicPrompt}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50/80 hover:bg-indigo-100 dark:bg-gray-700/80 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-300 rounded-xl transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow active:scale-95 border border-indigo-100/50 dark:border-gray-600/50"
                  title="Generate Magic Prompt"
                >
                  <FiRefreshCw size={18} className={`transition-transform duration-700 ${prompt ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-bold tracking-wide">Inspire Me</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-6 relative">
              <div className="group space-y-1 sm:space-y-2 bg-white/40 dark:bg-gray-800/40 p-3 sm:p-4 rounded-xl border border-white/60 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md backdrop-blur-md relative ${isDropdownOpen ? 'z-[110]' : 'z-20'}" ref={dropdownRef}>
                <label className="block text-[10px] sm:text-xs font-black sm:font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Story Genre
                </label>
                <div
                  className="relative cursor-pointer select-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center justify-between text-gray-800 dark:text-gray-200 text-base font-bold">
                    <span className="flex items-center gap-2">
                      <span>{currentGenre.icon}</span>
                      <span>{currentGenre.label}</span>
                    </span>
                    <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full mt-2 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-[100] backdrop-blur-xl"
                      >
                        {genres.map((genre) => (
                          <div
                            key={genre.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              setMode(genre.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-4 py-2 flex items-center gap-2 text-sm font-semibold transition-colors
                              ${mode === genre.value
                                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                              }`}
                          >
                            <span>{genre.icon}</span>
                            <span>{genre.label}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="group space-y-1 sm:space-y-2 bg-white/40 dark:bg-gray-800/40 p-3 sm:p-4 rounded-xl border border-white/60 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400 font-black sm:font-bold text-[10px] sm:text-xs uppercase tracking-widest">Length</span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">{length} words</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200/80 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500 hover:accent-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="group space-y-1 sm:space-y-2 bg-white/40 dark:bg-gray-800/40 p-3 sm:p-4 rounded-xl border border-white/60 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400 font-black sm:font-bold text-[10px] sm:text-xs uppercase tracking-widest">Creativity</span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">{creativity}</span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={creativity}
                    onChange={(e) => setCreativity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200/80 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500 hover:accent-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="relative group mt-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[1.2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <motion.button
                onClick={handleGenerate}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg sm:text-xl font-black rounded-[1.2rem] transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(102,51,238,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative flex items-center justify-center gap-3 tracking-wide">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
                      Weaving your story...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]">✨</span> Generate Story
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {generatedStory && (
              <div className="mt-8 sm:mt-10 animate-fade-in-up">
                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl border border-white/60 dark:border-gray-700/60 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-[60px] -mr-24 -mt-24 pointer-events-none"></div>

                  <h3 className="relative z-10 text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 dark:from-indigo-300 dark:to-purple-300 mb-4 pb-4 border-b border-indigo-100 dark:border-gray-700/70 leading-tight">
                    {generatedStory.title}
                  </h3>

                  <div className="relative z-10 prose prose-base md:prose-lg dark:prose-invert max-w-none mb-6 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-500/30 dark:scrollbar-thumb-gray-600">
                    <p className="text-gray-800 dark:text-gray-200 leading-[1.6] font-serif whitespace-pre-line text-base md:text-lg">
                      {generatedStory.story}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-4 border-t border-indigo-100 dark:border-gray-700/70 mt-auto">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${generatedStory.title}\n\n${generatedStory.story}`
                        );
                        alert("Story copied to clipboard!");
                      }}
                      className="flex-1 py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-indigo-700 dark:text-indigo-300 font-bold text-base rounded-xl border border-indigo-100 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>📋</span> Copy
                    </button>
                    <button
                      onClick={() => setGeneratedStory(null)}
                      className="flex-1 py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold text-base rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>🔄</span> Reset
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>💾</span> Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStory;
