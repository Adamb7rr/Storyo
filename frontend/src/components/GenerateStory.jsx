import { useState, useEffect } from "react";
import { FiRefreshCw, FiZap } from "react-icons/fi";
import { BACKEND_URL } from "../config";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const GenerateStory = () => {
  const { currentUser } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("fantasy");
  const [length, setLength] = useState(300);
  const [creativity, setCreativity] = useState(0.7);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pendingPrompt = localStorage.getItem('pendingPrompt');
    if (pendingPrompt) {
      setPrompt(pendingPrompt);
      localStorage.removeItem('pendingPrompt');
    }

    const checkPendingSave = async () => {
      const pendingSave = localStorage.getItem('pendingSave');
      if (pendingSave && currentUser) {
        const storyData = JSON.parse(pendingSave);
        try {
          const response = await fetch(`${BACKEND_URL}/save_story`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...storyData, userId: currentUser.uid }),
          });
          if (response.ok) {
            toast.success("Guest story saved to your account!");
            localStorage.removeItem('pendingSave');
            setGeneratedStory({ title: storyData.title, story: storyData.story });
            setPrompt(storyData.prompt);
          }
        } catch (err) {
          console.error("Failed to auto-save guest story", err);
        }
      }
    };
    checkPendingSave();
  }, [currentUser]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a valid prompt!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/generate_story`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode, max_length: length, temperature: creativity }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate story");
      const cleanTitle = data.title.replace(/\*\*/g, "").trim();
      setGeneratedStory({ title: cleanTitle, story: data.story });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedStory) return;
    if (!currentUser) {
      localStorage.setItem('pendingSave', JSON.stringify({ title: generatedStory.title, prompt, story: generatedStory.story }));
      toast.success("Log in to save your story!");
      window.location.href = '/signup';
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/save_story`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: generatedStory.title, prompt, story: generatedStory.story, userId: currentUser.uid }),
      });
      if (!response.ok) throw new Error("Failed to save story");
      toast.success("Story saved successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="prompt-card bg-[#1a1c2e] border-white/5 shadow-2xl p-8">
        <div className="space-y-8">
          {/* Prompt Area */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your story prompt here..."
              className="w-full h-56 bg-black/20 border border-white/10 rounded-2xl p-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none text-lg leading-relaxed shadow-inner"
            />
            <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">
              {prompt.length} characters
            </div>
            <button className="absolute bottom-4 right-6 text-purple-400 hover:text-white transition-colors">
              <FiRefreshCw size={20} />
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Story Genre</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 appearance-none cursor-pointer"
              >
                <option value="fantasy">🧙‍♂️ Fantasy</option>
                <option value="sci-fi">🚀 Sci-Fi</option>
                <option value="mystery">🔍 Mystery</option>
                <option value="general">📝 General</option>
              </select>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50">
                  <span>Story Length</span>
                  <span className="text-purple-400">{length} words</span>
               </div>
               <input
                 type="range"
                 min="50"
                 max="2000"
                 value={length}
                 onChange={(e) => setLength(Number(e.target.value))}
                 className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
               />
               <div className="flex justify-between text-[10px] text-white/20 uppercase font-black">
                  <span>Min</span>
                  <span>Max 2000</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50">
               <span>Creativity Level</span>
               <span className="text-purple-400">{creativity}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={creativity}
              onChange={(e) => setCreativity(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-generate flex items-center justify-center gap-3 text-lg py-5"
          >
            {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" /> : <><FiZap /> Generate Story</>}
          </button>

          {/* Generated Result */}
          {generatedStory && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-8 bg-black/30 rounded-2xl border border-white/5 shadow-2xl"
            >
              <h3 className="text-3xl font-bold serif mb-6 text-purple-200">{generatedStory.title}</h3>
              <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg font-light">{generatedStory.story}</p>
              <div className="mt-10 flex gap-4">
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-teal-600/20 text-teal-400 border border-teal-500/30 rounded-xl font-bold hover:bg-teal-600 hover:text-white transition-all"
                >
                  Save to Library
                </button>
                <button 
                  onClick={() => setGeneratedStory(null)}
                  className="px-8 py-3 bg-white/5 text-white/60 border border-white/10 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-all"
                >
                  New Draft
                </button>
              </div>
            </motion.div>
          )}
          
          {error && <div className="text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default GenerateStory;
