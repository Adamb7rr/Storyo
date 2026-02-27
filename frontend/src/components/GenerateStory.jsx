import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { BACKEND_URL } from "../config";


const GenerateStory = () => {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("fantasy");
  const [length, setLength] = useState(300);
  const [creativity, setCreativity] = useState(0.7);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    // Validate prompt
    if (!prompt.trim()) {
      setError("Please enter a valid prompt!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Sending the request to the backend
      const response = await fetch(`${BACKEND_URL}/generate_story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          mode: mode,
          max_length: length, // Assuming `length` is your max_length
          temperature: creativity, // Assuming `creativity` is your temperature
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate story");
      }

      // Clean the title by removing unwanted characters (like `**`)
      const cleanTitle = data.title.replace(/\*\*/g, "").trim();

      // Set the generated story details
      setGeneratedStory({
        title: cleanTitle,
        story: data.story,
      });

      // Reset any previous errors
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
    <div className=" transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-0">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl backdrop-blur-lg backdrop-filter p-6 sm:p-8">

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Prompt Input */}
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your story prompt here..."
                className="w-full h-40 p-4 text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-indigo-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 resize-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner outline-none"
              />
              <div className="absolute bottom-4 left-4 text-gray-400 dark:text-gray-500 text-xs font-medium">
                {prompt.length} characters
              </div>
              <button
                onClick={generateMagicPrompt}
                className="absolute bottom-3 right-3 p-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow hover:shadow-md hover:scale-105 transition-all duration-300 group-hover:opacity-100"
                title="Magic Prompt"
              >
                <FiRefreshCw size={18} className="hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Story Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Genre Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Story Genre
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full p-3.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-2 border-indigo-100 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30 focus:border-indigo-500 transition-all duration-300 outline-none cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 appearance-none"
                >
                  <option value="general">📝 General</option>
                  <option value="fantasy">🧙‍♂️ Fantasy</option>
                  <option value="sci-fi">🚀 Sci-Fi</option>
                  <option value="mystery">🔍 Mystery</option>
                </select>
              </div>

              {/* Length Control */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <span>Story Length: <span className="text-indigo-600 dark:text-indigo-400">{length} words</span></span>
                  <span className="text-xs opacity-60">(Max: 2000)</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2.5 bg-indigo-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 hover:accent-indigo-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Creativity Control */}
            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>Creativity Level: <span className="text-indigo-600 dark:text-indigo-400">{creativity}</span></span>
                <span className="text-xs opacity-60">(Max: 1)</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full h-2.5 bg-indigo-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 hover:accent-indigo-500 transition-all duration-200"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-5 bg-gradient-to-l from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                "✨ Generate Story"
              )}
            </button>

            {/* Generated Story Display */}
            {generatedStory && (
              <div className="mt-8 space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg">
                  {/* Story Title */}
                  <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-6 pb-4 border-b border-indigo-200 dark:border-gray-600">
                    {generatedStory.title}
                  </h3>

                  {/* Story Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                      {generatedStory.story}
                    </p>
                  </div>

                  {/* Story Metadata */}
                  <div className=" mt-6 pt-4 border-t border-indigo-200 dark:border-gray-600">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Genre: {mode}</span>
                      <span>Length: {length} words</span>
                      <span>Creativity: {creativity}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      // Add copy to clipboard functionality
                      navigator.clipboard.writeText(
                        `${generatedStory.title}\n\n${generatedStory.story}`
                      );
                      alert("Story copied to clipboard!");
                    }}
                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => setGeneratedStory(null)}
                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    🔄 New Story
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 px-4 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 rounded-xl hover:bg-green-200 dark:hover:bg-green-600 transition-all duration-200"
                  >
                    💾 Save Story
                  </button>
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
