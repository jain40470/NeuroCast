from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URL"))
print("Mongo URL from env:")  # to check env is loaded

db = client["NeuroCast"]

users_collection = db["users"]

print("Connected to DB:", db.name)  # Just to verify connection
