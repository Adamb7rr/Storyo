import datetime
from math import ceil
import os
from flask import Flask, request, jsonify
from g4f.client import Client
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
from bson import ObjectId
from datetime import datetime

load_dotenv()
app = Flask(__name__)
CORS(app) 

client = Client()

# MongoDB connection
DATABASE_URI = os.getenv("DATABASE_URI")
try:
    mongo_client = MongoClient(DATABASE_URI)
    db = mongo_client["storydb"]
    stories_collection = db["stories"]
    mongo_client.server_info()
    print("Successfully connected to MongoDB")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")


# Home route
@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Story Generator API!",
        "status": "running"
    }), 200


# Story generation endpoint
@app.route("/generate_story", methods=["POST"])
def generate_story():
    data = request.json
    prompt = data.get("prompt", "").strip()
    max_length = data.get("max_length", 200)  # Default maximum token length
    num_return_sequences = data.get("num_return_sequences", 1)  # Number of stories to generate
    temperature = data.get("temperature", 0.7)  # Creativity level
    mode = data.get("mode", "general")  # Default mode

    if not prompt:
        return jsonify({"error": "Prompt cannot be empty!"}), 400

    try:
        if mode == "fantasy":
            prompt = f"Fantasy: {prompt}"
        elif mode == "sci-fi":
            prompt = f"Sci-Fi: {prompt}"
        elif mode == "mystery":
            prompt = f"Mystery: {prompt}"

        # Modified prompt for generating both title and story
        structured_prompt = (f"{prompt}\n\nPlease provide a story title followed by the story itself. The title should be on a separate line.")

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": structured_prompt}],
            max_tokens=max_length,
            temperature=temperature
        )

        generated_content = response.choices[0].message.content.split("\n", 1)
        title = generated_content[0].strip()
        story = generated_content[1].strip()

        return jsonify({
            "title": title,
            "story": story
        })
    except Exception as e:
        return jsonify({"error": f"Story generation failed: {str(e)}"}), 500
    
# Save story endpoint
@app.route("/save_story", methods=["POST"])
def save_story():
    data = request.json
    title = data.get("title", "").strip()
    prompt = data.get("prompt", "").strip()
    story = data.get("story", "").strip()

    if not prompt or not story:
        return jsonify({"error": "Both prompt and story are required!"}), 400

    try:
        # Save story to MongoDB
        stories_collection.insert_one({"title": title, "prompt": prompt, "story": story})
        return jsonify({"message": "Story saved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Saving story failed: {str(e)}"}), 500

# Get stories endpoint
@app.route("/api/stories", methods=["GET"])
def get_stories():
    try:
        # Retrieve all stories from MongoDB
        stories = list(stories_collection.find({}, {"_id": 0}))
        return jsonify({"stories": stories})
     
    except Exception as e:
        print(f"Error in get_stories: {str(e)}")
        return jsonify({
            "success": True,
            "error": f"Failed to fetch stories: {str(e)}"
        }), 500