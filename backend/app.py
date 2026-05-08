import datetime
from math import ceil
import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import g4f
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = app.logger

# MongoDB connection
DATABASE_URI = os.getenv("DATABASE_URI")
try:
    mongo_client = MongoClient(DATABASE_URI)
    db = mongo_client["storydb"]
    stories_collection = db["stories"]
    mongo_client.server_info()
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")

@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Story Generator API!",
        "status": "running"
    }), 200

# Story generation endpoint
@app.route("/api/generate_story", methods=["POST"])
@app.route("/generate_story", methods=["POST"])
def generate_story():
    logger.info("Received request for story generation")
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    prompt = data.get("prompt", "").strip()
    max_length = data.get("max_length", 500)
    temperature = data.get("temperature", 0.7)
    mode = data.get("mode", "general")

    if not prompt:
        return jsonify({"error": "Prompt cannot be empty!"}), 400

    try:
        if mode == "fantasy":
            prompt = f"Fantasy: {prompt}"
        elif mode == "sci-fi":
            prompt = f"Sci-Fi: {prompt}"
        elif mode == "mystery":
            prompt = f"Mystery: {prompt}"

        structured_prompt = (
            f"{prompt}\n\n"
            "Please provide a creative story. "
            "Start with a title on the first line, then write the story on the following lines."
        )

        logger.info("Generating story...")

        # Verified working providers from tests
        providers_to_try = [
            ("Yqcloud", "gpt-4"),
            ("PollinationsAI", "gpt-4"), # Note: tested with gpt-4 in direct test and it was OK sometimes, or use default
            ("Blackbox", "gpt-4"),
        ]
        
        content = None
        for p_name, model_name in providers_to_try:
            provider = getattr(g4f.Provider, p_name, None)
            if provider is None:
                logger.warning(f"Provider {p_name} not found in g4f.Provider")
                continue
            try:
                logger.info(f"Attempting {p_name} with model {model_name}...")
                response = g4f.ChatCompletion.create(
                    model=model_name,
                    messages=[{"role": "user", "content": structured_prompt}],
                    provider=provider
                )
                raw = str(response).strip()
                logger.info(f"Provider {p_name} returned {len(raw)} characters")
                
                # Check for error indicators in the response text
                if (not raw or 
                    raw.startswith("data:") or 
                    "Authentication Error" in raw or 
                    "API key" in raw or 
                    "rate limit" in raw.lower()):
                    logger.warning(f"Provider {p_name} returned error or invalid content indicator.")
                    continue
                
                content = raw
                logger.info(f"Successfully obtained content from {p_name}")
                break
            except Exception as e:
                logger.error(f"Provider {p_name} raised exception: {str(e)}")
                continue

        if not content:
            return jsonify({"error": "All AI providers are currently unavailable. Please try again in a few seconds."}), 503

        # Parse title and story
        lines = [l for l in content.split("\n") if l.strip()]
        if not lines:
            return jsonify({"error": "AI returned empty lines"}), 500
            
        title = lines[0].strip().replace("**", "").replace("#", "").strip()
        story = "\n".join(lines[1:]).strip() if len(lines) > 1 else content

        return jsonify({
            "title": title,
            "story": story
        })
    except Exception as e:
        logger.error(f"Story generation failed: {str(e)}")
        return jsonify({"error": f"Story generation failed: {str(e)}"}), 500

# Save story endpoint
@app.route("/api/save_story", methods=["POST"])
@app.route("/save_story", methods=["POST"])
def save_story():
    data = request.json
    title = data.get("title", "").strip()
    prompt = data.get("prompt", "").strip()
    story = data.get("story", "").strip()
    user_id = data.get("userId", "").strip()

    if not prompt or not story:
        return jsonify({"error": "Both prompt and story are required!"}), 400

    try:
        stories_collection.insert_one({
            "title": title, 
            "prompt": prompt, 
            "story": story,
            "userId": user_id,
            "timestamp": datetime.datetime.utcnow()
        })
        return jsonify({"message": "Story saved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Saving story failed: {str(e)}"}), 500

# Get stories endpoint
@app.route("/api/stories", methods=["GET"])
@app.route("/stories", methods=["GET"])
def get_stories():
    user_id = request.args.get("userId", "").strip()
    try:
        query = {}
        if user_id:
            query["userId"] = user_id
            
        stories = list(stories_collection.find(query, {"_id": 0}))
        return jsonify({"stories": stories})
    except Exception as e:
        logger.error(f"Error in get_stories: {str(e)}")
        return jsonify({"error": f"Failed to fetch stories: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)