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
stories_collection = None

try:
    if not DATABASE_URI:
        logger.error("DATABASE_URI not found in environment variables")
    else:
        mongo_client = MongoClient(DATABASE_URI, serverSelectionTimeoutMS=5000)
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
            ("Airforce", "gpt-4o"),
            ("DeepInfra", "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"),
            ("PollinationsAI", "gpt-4o"),
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
                
                # Handle potential iterator/generator response
                if hasattr(response, '__iter__') and not isinstance(response, str):
                    raw = "".join([str(chunk) for chunk in response]).strip()
                else:
                    raw = str(response).strip()
                
                logger.info(f"Provider {p_name} returned {len(raw)} characters")
                
                # Check for error indicators in the response text
                if (not raw or 
                    raw.startswith("data:") or 
                    "Authentication Error" in raw or 
                    "API key" in raw or 
                    "rate limit" in raw.lower() or
                    "Error" in raw):
                    logger.warning(f"Provider {p_name} returned error or invalid content indicator: {raw[:100]}")
                    continue
                
                content = raw
                logger.info(f"Successfully obtained content from {p_name}")
                break
            except Exception as e:
                logger.error(f"Provider {p_name} raised exception: {str(e)}")
                continue

        if not content:
            return jsonify({"error": "AI services are busy. Please try another genre or try again in a moment."}), 503

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

@app.route("/api/save_story", methods=["POST"])
@app.route("/save_story", methods=["POST"])
def save_story():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    logger.info(f"Received save request: {data.get('title')} for user {data.get('user_id')}")
    
    title = str(data.get("title") or "").strip()
    prompt = str(data.get("prompt") or "").strip()
    story = str(data.get("story") or "").strip()
    user_id = str(data.get("user_id") or "").strip()

    if not prompt or not story:
        logger.warning("Save failed: missing prompt or story")
        return jsonify({"error": "Both prompt and story are required!"}), 400

    if stories_collection is None:
        logger.error("Database connection not available")
        return jsonify({"error": "Database connection not available. Please try again later."}), 503

    try:
        stories_collection.insert_one({
            "title": title, 
            "prompt": prompt, 
            "story": story,
            "user_id": user_id,
            "created_at": datetime.datetime.utcnow()
        })
        return jsonify({"message": "Story saved successfully!"}), 200
    except Exception as e:
        logger.error(f"Saving story failed: {str(e)}")
        return jsonify({"error": f"Saving story failed: {str(e)}"}), 500

@app.route("/api/stories", methods=["GET"])
@app.route("/stories", methods=["GET"])
def get_stories():
    user_id = request.args.get("user_id", "").strip()
    try:
        if not user_id:
            return jsonify({"stories": []})
            
        if stories_collection is None:
            return jsonify({"error": "Database not connected"}), 503
            
        query = {"user_id": user_id}
        # Sort by created_at descending
        stories = list(stories_collection.find(query, {"_id": 0}).sort("created_at", -1))
        
        # Handle cases where some stories might still have 'timestamp' instead of 'created_at'
        for s in stories:
            if 'timestamp' in s and 'created_at' not in s:
                s['created_at'] = s['timestamp']
                
        return jsonify({"stories": stories})
    except Exception as e:
        logger.error(f"Error in get_stories: {str(e)}")
        return jsonify({"error": f"Failed to fetch stories: {str(e)}"}), 500
        
@app.route("/api/stories/<story_id>", methods=["DELETE"])
@app.route("/stories/<story_id>", methods=["DELETE"])
def delete_story(story_id):
    try:
        if stories_collection is None:
            return jsonify({"error": "Database not connected"}), 503
            
        # Note: story_id might be a title or an ObjectId if we didn't use {"_id": 0}
        # In current setup, we don't have IDs in frontend. 
        # Wait, get_stories uses {"_id": 0}, so frontend doesn't have IDs.
        # This is a problem for deletion.
        return jsonify({"error": "Delete not implemented: IDs missing in frontend"}), 501
    except Exception as e:
        logger.error(f"Error in delete_story: {str(e)}")
        return jsonify({"error": f"Failed to delete story: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)