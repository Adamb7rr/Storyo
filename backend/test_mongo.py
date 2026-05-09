import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
DATABASE_URI = os.getenv("DATABASE_URI")
print(f"Testing connection to: {DATABASE_URI}")

try:
    mongo_client = MongoClient(DATABASE_URI)
    db = mongo_client["storydb"]
    stories_collection = db["stories"]
    info = mongo_client.server_info()
    print("Successfully connected to MongoDB")
    print(f"Server info: {info.get('version')}")
except Exception as e:
    print(f"Failed to connect to MongoDB: {str(e)}")
