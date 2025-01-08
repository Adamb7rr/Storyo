import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";

const ViewStories = ({ theme }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  // Function to fetch stories from the Flask API
  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.stories) {
        // Remove asterisks from titles
        const processedStories = data.stories.map((story) => ({
          ...story,
          title: story.title.replace(/\*/g, ""),
        }));
        setStories(processedStories);
      } else {
        setError("No stories found");
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      setError("Failed to fetch stories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch stories when component mounts
  useEffect(() => {
    fetchStories();
  }, []);

  // Modal for full story details
  const StoryModal = ({ story, onClose }) => {
    return (
      <div className={`${ theme === "dark" ? "bg-gray-800" : "bg-black" } fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50`}>
        <div className={`${ theme === "dark" ? "bg-gray-800" : "bg-white" } rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`${ theme === "dark" ? "text-indigo-300" : "text-indigo-900" } text-2xl font-bold`}>
              {story.title}
            </h3>
            <button
              onClick={onClose}
              className={`${ theme === "dark" ? "text-gray-200 hover:text-gray-100" : "text-gray-500 hover:text-gray-700" } `}
            >
              ✕
            </button>
          </div>


          <div className={`${ theme === "dark" ? "bg-gray-700" : "bg-indigo-50" } p-4 rounded-lg mb-4`}>
            <p className={`${ theme === "dark" ? "text-white" : "text-gray-600" }`}>
              <span className="font-semibold">Prompt:</span> {story.prompt}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className={`${ theme === "dark" ? "text-white" : "text-gray-700" } leading-relaxed whitespace-pre-wrap`}>
              {story.story}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900">
          <span className="mr-2">📚</span>Story Collection
        </h2>
        <button
          onClick={fetchStories}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                   transition-all transform hover:scale-105 disabled:bg-gray-400 
                   flex items-center space-x-2 shadow-md"
        >
          {loading ? (
            <>
              <span className="animate-spin">⌛</span>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>🔄</span>
              <span>Refresh Stories</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${ theme === "dark" ? "bg-gray-800" : "bg-white" }  p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow `}
          >
            <div className=" flex justify-between items-start mb-4">
              <h3 className={`${ theme === "dark" ? "text-indigo-200" : "text-indigo-900" } text-xl font-bold `}>
                {story.title}
              </h3>
              {story.created_at && (
                <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                  {new Date(story.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className={`${ theme === "dark" ? "bg-gray-700" : "bg-indigo-50" } p-3 rounded-lg mb-4`}>
              <p className={`${ theme === "dark" ? "text-white" : "text-gray-600" } text-sm`}>

                <span className="font-semibold">Prompt:</span> {story.prompt}
              </p>
            </div>

            <div className="relative">
              <p className={`${ theme === "dark" ? "text-white" : "text-gray-700" } leading-relaxed line-clamp-3`}>
                {story.story}
              </p>
              <button
                onClick={() => setSelectedStory(story)}
                className={`${ theme === "dark" ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-800" } text-sm mt-2`}
              >
                Read more
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Empty State */}
      {stories.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">
            No stories found. Create some!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ViewStories;
