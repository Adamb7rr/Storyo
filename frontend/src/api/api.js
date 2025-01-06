const API_BASE_URL = `${import.meta.env.VITE_API_URI}/api`;

export const generateStory = async (promptData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promptData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};

export const saveStory = async (storyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/save_story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving story:', error);
    throw error;
  }
};

export const getStories = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/stories?page=${page}&limit=${limit}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

export const deleteStory = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stories/${storyId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};